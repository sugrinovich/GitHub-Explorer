import { useState, useEffect, useRef } from "react";
import type { GitHubRepository, GitHubSearchResponse } from "../types/types";
import { usePaginations } from "./usePaginations";
import { filterRepositories } from "./useFilterSort";

type SortFilters = {
    language: string;
    minStars: string;
    updated: string;
    sortBy: keyof GitHubRepository | "any";
};

const PER_PAGE = 100;
// Сколько страниц по 100 репозиториев загружаем за один поиск (лимит GitHub — 10 запросов в минуту)
const MAX_PAGES_TO_FETCH = 5;

function getErrorMessage(status: number): string {
    if (status === 403 || status === 429) return "GitHub API rate limit exceeded. Please wait and try again.";
    if (status === 422) return "GitHub could not process this search query. Try another one.";
    if (status >= 500) return "GitHub is temporarily unavailable. Please try again later.";
    return `GitHub API error: ${status}`;
}

export function useRepoExplorer() {

    const [isLoading, setIsLoading] = useState(false);
    const [resetAt, setReset] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [allItems, setAllItems] = useState<GitHubRepository[]>([]);
    const [items, setItems] = useState(allItems);
    // Меняется после каждого успешного поиска — по нему сбрасывается панель фильтров
    const [searchId, setSearchId] = useState(0);
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {

        if (resetAt <= 0) return;

        const id = setInterval(() => {
            setReset(prev => prev - 1);
        }, 1000);

        return () => clearInterval(id);

    }, [resetAt])

    useEffect(() => {
        return () => abortRef.current?.abort();
    }, [])

    async function fetchPage(query: string, page: number, signal: AbortSignal) {
        const params = new URLSearchParams({
            q: query,
            per_page: String(PER_PAGE),
            page: String(page),
        });

        const response = await fetch(`https://api.github.com/search/repositories?${params}`, { signal });

        // GitHub сообщает в заголовках, сколько запросов осталось и когда лимит сбросится
        const remaining = response.headers.get("x-ratelimit-remaining");
        const reset = response.headers.get("x-ratelimit-reset");
        const limitReached = remaining === "0" || response.status === 429;

        if (limitReached) {
            const secondsLeft = reset ? Math.ceil(Number(reset) - Date.now() / 1000) : 60;
            setReset(Math.max(secondsLeft, 1));
        }

        if (!response.ok) {
            throw new Error(getErrorMessage(response.status));
        }

        const data: GitHubSearchResponse = await response.json();
        return { data, limitReached };
    }

    async function searchRepos(query: string) {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;

        // Отменяем предыдущий поиск, чтобы его ответ не перезаписал новый
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setIsLoading(true);
        setError(null);
        try {

            const first = await fetchPage(trimmedQuery, 1, controller.signal);

            const totalPagesAvailable = Math.ceil(first.data.total_count / PER_PAGE);
            const pagesToFetch = Math.min(totalPagesAvailable, MAX_PAGES_TO_FETCH);

            let allResults: GitHubRepository[] = [...first.data.items];
            let limitReached = first.limitReached;

            for (let page = 2; page <= pagesToFetch && !limitReached; page++) {
                const next = await fetchPage(trimmedQuery, page, controller.signal);
                allResults = [...allResults, ...next.data.items];
                limitReached = next.limitReached;
            }

            setAllItems(allResults);
            setItems(allResults);
            setSearchId(id => id + 1);
            pagination.setPage(1);

        } catch(error){
            if (controller.signal.aborted) return;

            setError(error instanceof TypeError
                ? "Network error. Check your connection and try again."
                : error instanceof Error ? error.message : "Something went wrong.");

        } finally {
            if (abortRef.current === controller) setIsLoading(false);
        }
    }

    function handleSort(filters: SortFilters) {
        const result = filterRepositories(allItems, filters);

        setItems(result);
        pagination.setPage(1);
    }

    const pagination = usePaginations({items});

    return {
        isLoading, resetAt, error,
        searchRepos,
        items, allItems, searchId,
        handleSort,
        ...pagination
    };
}
