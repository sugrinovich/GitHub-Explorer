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
        isLoading, resetAt, items, allItems, page, totalPages, 
        firstPage, startIndex, endIndex, handleNext, 
        handlePrevious, setPage, searchRepos, handleSort
    } = useRepoExplorer();

    return (
        <section className="Body">
            <RepoSearch onSearch={searchRepos} isLoading={isLoading} secondsLeft={resetAt}/>
            <h3 className="Body__title">Explore repositories</h3>
            <div className="Body__data">
                <RepoSortPanel items={allItems} handleSort={handleSort} setPage={setPage}/>
                <div className="Body__list">
                    <RepoCards items={items} 
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
