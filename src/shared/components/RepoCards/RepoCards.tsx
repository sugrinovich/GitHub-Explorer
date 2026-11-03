import type {GitHubRepository} from "../../types/types";
import { RepoCardsBody } from "./RepoCardsBody";
import { RepoCardsHeader } from "./RepoCardsHeader";
import "./RepoCards.css";

interface RepoCardsProps {

    items: GitHubRepository[];
    start: number;
    end: number;
    toggleFavorite: (repository: GitHubRepository) => void;
    favorites: GitHubRepository[];
    firstPage: number;
    emptyText: string;
}

export function RepoCards({items, start, end, toggleFavorite, favorites, firstPage, emptyText}: RepoCardsProps) {

    const getDescription = (text: string | null) => {
        if (!text) return "No description";
        return text.length > 128 ? text.slice(0, 128) + "..." : text;
    };
    return (
        <section className="repoCards__list">

        {
            firstPage === 0 ? <div className="Extra">
                                <p className="Extra__title">{emptyText}</p>
                            </div> : items.slice(start, end).map(repository => (
                <div
                    key={repository.id}
                    className="repoCards"
                >
                    <RepoCardsHeader repository={repository} toggleFavorite={toggleFavorite} favorites={favorites}/>

                    <div className="repoCards__description">

                        <p className="repoCards__description--text">
                            {getDescription(repository.description)}
                        </p>
                        <RepoCardsBody repository={repository}/>

                    </div>
                </div>
            ))
        }           
        </section>
    )
}


