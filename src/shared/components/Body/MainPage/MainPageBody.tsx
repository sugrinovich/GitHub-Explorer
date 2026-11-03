import "./MainPageBody.css"
import { RepoSortPanel } from "../../RepoSort/RepoSortPanel";
import { RepoCards } from "../../RepoCards/RepoCards";
import { RepoSearch } from "../../RepoSearch/RepoSearch";
import { Pagination } from "../../Pagination/Pagination";
import type { GitHubRepository } from "../../../types/types";
import { useRepoExplorer } from "../../../hooks/useRepoExplorer";

interface MainPageBodyProps {
    favorites: GitHubRepository[];
    toggleFavorite: (repository: GitHubRepository) => void;
}

export function MainPageBody({ favorites, toggleFavorite }: MainPageBodyProps) {

    const {
        isLoading, resetAt, error, items, allItems, searchId, page, totalPages,
        firstPage, startIndex, endIndex, handleNext,
        handlePrevious, setPage, searchRepos, handleSort
    } = useRepoExplorer();

    const emptyText = isLoading ? "Loading..."
        : searchId === 0 ? "Search for repositories to get started"
        : "Nothing found. Try another query or filters";

    return (
        <section className="Body">
            <RepoSearch onSearch={searchRepos} isLoading={isLoading} secondsLeft={resetAt}/>
            <h3 className="Body__title">Explore repositories</h3>
            {error && <p className="Body__error" role="alert">{error}</p>}
            <div className="Body__data">
                <RepoSortPanel key={searchId} items={allItems} handleSort={handleSort} setPage={setPage}/>
                <div className="Body__list">
                    <RepoCards items={items} 
                               start={startIndex} 
                               end={endIndex} 
                               firstPage={firstPage}
                               emptyText={emptyText}
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
