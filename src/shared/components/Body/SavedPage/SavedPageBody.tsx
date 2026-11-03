import { usePaginations } from "../../../hooks/usePaginations";
import type { GitHubRepository, SortFilters } from "../../../types/types";
import { Pagination } from "../../Pagination/Pagination";
import { RepoCards } from "../../RepoCards/RepoCards";
import { RepoSortPanel } from "../../RepoSort/RepoSortPanel";
import { DEFAULT_FILTERS, filterRepositories } from "../../../utils/filterRepositories";
import { useState } from "react";
import "./SavedPageBody.css"

interface SavedPageBodyProps {
    favorites: GitHubRepository[];
    toggleFavorite: (repository: GitHubRepository) => void;
}

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

    return (
        <section className="Body">
            <h3 className="Body__title">See your favorite repositories</h3>
            <div className="Body__data">
                <RepoSortPanel items={favorites} handleSort={handleSort} setPage={setPage}/>
                <div className="Body__list">
                    <RepoCards items={filteredItems} 
                                start={startIndex} 
                                end={endIndex} 
                                firstPage={firstPage}
                                emptyText={favorites.length === 0
                                    ? "No saved repositories yet"
                                    : "No saved repositories match these filters"}
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
