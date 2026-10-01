import { useState, useEffect } from "react";
import type { GitHubRepository, GitHubSearchResponse } from "../types/types";
import { usePaginations } from "./usePaginations";
import { filterRepositories } from "./useFilterSort";

type SortFilters = {
    language: string;
    minStars: string;
    updated: string;
    sortBy: keyof GitHubRepository | "any";
};

export function useRepoExplorer() {

    const [isLoading, setIsLoading] = useState(false);
    const [resetAt, setReset] = useState(0);

    useEffect(() => {

        if (resetAt <= 0) return;

        const id = setInterval(() => {
            setReset(prev => prev - 1);
        }, 1000);

        return () => clearInterval(id);

    }, [resetAt])

    async function searchRepos(query: string) {
        setIsLoading(true);
        try {
            
            const firstResponse = await fetch(
                `https://api.github.com/search/repositories?q=${query}&per_page=100&page=1`
            );
            if (!firstResponse.ok) {
                throw new Error(`GitHub API вернул ошибку: ${firstResponse.status} \n Повторите свой запрос через пару минут!`);
            }
            const firstData: GitHubSearchResponse = await firstResponse.json();

            const totalPagesAvailable = Math.ceil(firstData.total_count / 100);
            const pagesToFetch = Math.min(totalPagesAvailable, 10);

            let allResults: GitHubRepository[] = [...firstData.items];
            for (let page = 2; page <= pagesToFetch / 2 ; page++) {
                const response = await fetch(
                    `https://api.github.com/search/repositories?q=${query}&per_page=100&page=${page}`
                );
                if (!response.ok) {
                    throw new Error(`GitHub API вернул ошибку: ${response.status} \n Повторите свой запрос через пару минут!`);
                }
                const data: GitHubSearchResponse = await response.json();
                allResults = [...allResults, ...data.items];
            }

            setAllItems(allResults);
            setItems(allResults);
            pagination.setPage(1); 

        } catch(error){
            alert(error);

        } finally {
            setIsLoading(false);
            setReset(60);
        }
    }

    const [allItems, setAllItems] = useState<GitHubRepository[]>([]);
    const [items, setItems] = useState(allItems);

    function handleSort(filters: SortFilters) {
        const result = filterRepositories(allItems, filters);

        setItems(result);
        pagination.setPage(1);
    }

    const pagination = usePaginations({items});

    return {
        isLoading, resetAt,
        searchRepos,
        items, allItems,
        handleSort,
        ...pagination
    };
}
