import { usePaginations } from "../../../hooks/usePaginations";
import type { GitHubRepository } from "../../../types/types";
import { Pagination } from "../../Pagination/Pagination";
import { RepoCards } from "../../RepoCards/RepoCards";
import { RepoSortPanel } from "../../RepoSort/RepoSortPanel";
import { filterRepositories } from "../../../hooks/useFilterSort";
import { useEffect, useState } from "react";
import "./SavedPageBody.css"

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

const DEFAULT_FILTERS: SortFilters = {
    language: "any",
    minStars: "any",
    updated: "any",
    sortBy: "any",
};

export function SavedPageBody({favorites, toggleFavorite}: SavedPageBodyProps) {

    const [filters, setFilters] = useState<SortFilters>(DEFAULT_FILTERS);

    const filteredItems = filterRepositories(favorites, filters);

    const {
        page, totalPages,
        firstPage, startIndex, endIndex, handleNext,
        handlePrevious, setPage
    } = usePaginations({ items: filteredItems });

    function handleSort(newFilters: SortFilters) {
        setFilters(newFilters);
        setPage(1);
    }

    useEffect(() => {
        if (totalPages === 0) setPage(0);
    }, [totalPages])

    return (
        <section style={{
            width: "90%",
            margin: "auto"
        }}>
            <h3 className="Body__title">See your favorite repositories</h3>
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
        </section>
    )
}
