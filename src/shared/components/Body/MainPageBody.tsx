import "./MainPageBody.css"
import { RepoSortPanel } from "../RepoSort/RepoSortPanel";
import { RepoCards } from "../RepoCards/RepoCards";
import { RepoSearch } from "../RepoSearch/RepoSearch";
import { Pagination } from "../Pagination/Pagination";
import { useState } from "react";
import { isWithinUpdateFilter } from "../../utils/getFilteredDate";
import type { GitHubRepository, GitHubSearchResponse } from "../../types/types";
import { useEffect } from "react";


type SortFilters = {
    language: string;
    minStars: string;
    updated: string;
    sortBy: keyof GitHubRepository | "any";
};

export function MainPageBody() {

    const [isLoading, setIsLoading] = useState(false);
    const [resetAt, setReset] = useState(0);
    const [favorites, setFavorites] = useState<GitHubRepository[]>(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    } 
    );

    useEffect(() => {
        if (resetAt <= 0) return;
        const id = setInterval(() => {
            setReset(prev => prev - 1);
        }, 1000);
        return () => clearInterval(id);
    }, [resetAt])

    function toggleFavorite(repository: GitHubRepository) {
        setFavorites(prev =>
            prev.some(fav => fav.id === repository.id)
                ? prev.filter(fav => fav.id !== repository.id)
                : [...prev, repository]
        );
    }

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

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
            setPage(1); 
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
        let result = allItems;

        if (filters.language !== "any") {
            result = result.filter(el => el.language?.toLowerCase() === filters.language.toLowerCase());
        }

        if (filters.minStars !== "any") {
            result = result.filter(el => el.stargazers_count > Number(filters.minStars));
        }

        if (filters.updated !== "any") {
            result = result.filter(el => isWithinUpdateFilter(el.updated_at, filters.updated));
        }

        if (filters.sortBy !== "any") {
            const key = filters.sortBy;
            result = [...result].sort((a, b) => Number(b[key]) - Number(a[key]));
        }

        setItems(result);
    }
    const itemsPerPage = 3;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const firstPage = (totalPages === 0) ? 0 : 1;
    const [page, setPage] = useState(firstPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    function Next () {
        try {
            if (page === 0 && totalPages === 0) throw new Error("Нет страниц для просмотра!!!")
            if (page + 1 <= totalPages) setPage(page + 1);
            else throw new Error("Вы находитесь на последней странице!!!")
        }
        catch(Error) {
            alert(Error)
        }
    }
    function Previous() {
        try {
            if (page - 1 > 0) setPage(page - 1);
            else throw new Error("Вы находитесь на первой странице!!!")
        }
        catch(Error) {
            alert(Error)
        }
    }
    return (
        <section className="Body">
            <RepoSearch onSearch={searchRepos} isLoading={isLoading} secondsLeft={resetAt}/>
            <h3 className="Body__title">Explore repositories</h3>
            <div className="Body__data">
                <RepoSortPanel items={items} onSort={handleSort} setPage={setPage}/>
                <div className="Body__list">
                    <RepoCards items={items} 
                               start={startIndex} 
                               end={endIndex} 
                               toggleFav={toggleFavorite} 
                               storage={favorites}
                               firstPage={firstPage}/>
                    <Pagination page={page} 
                                totalPages={totalPages} 
                                toNext={Next} 
                                toPrev={Previous}/>  
                </div>              
            </div>
        </section>
    )
}