import { usePaginations } from "../../../hooks/usePaginations";
import type { GitHubRepository } from "../../../types/types";
import { Pagination } from "../../Pagination/Pagination";
import { RepoCards } from "../../RepoCards/RepoCards";
import { RepoSortPanel } from "../../RepoSort/RepoSortPanel";
import { filterRepositories } from "../../../hooks/useFilterSort";
import { useState } from "react";

interface SavedPageBodyProps {
    favorites: GitHubRepository[];
    toggleFavorite: (repository: GitHubRepository) => void;
}

type SortFilters = {
    language: string;
    minStars: string;
    updated: string;
    sortBy: keyof GitHubRepository | "any";
};

export function SavedPageBody({favorites, toggleFavorite}: SavedPageBodyProps) {

    const [filteredItems, setFiltered] = useState<GitHubRepository[]>(favorites);

    const {
        page, totalPages, 
        firstPage, startIndex, endIndex, handleNext, 
        handlePrevious, setPage
    } = usePaginations({items: filteredItems});

    function handleSort(filters: SortFilters) {
        const result = filterRepositories(favorites, filters);

        setFiltered(result);
        setPage(1);
    }

    return (
        <div className="Body__data">
            <RepoSortPanel items={favorites} handleSort={handleSort} setPage={setPage}/>
            <div className="Body__list">
                <RepoCards items={filteredItems} 
                            start={startIndex} 
                            end={endIndex} 
                            firstPage={firstPage}
                            toggleFavorite={toggleFavorite} 
                            favorites={favorites}/>
                <Pagination page={page} 
                            totalPages={totalPages} 
                            handleNext={handleNext} 
                            handlePrev={handlePrevious}/>  
            </div>              
        </div>
    )
}
