import { href } from "react-router-dom";
import type {GitHubRepository} from "../../types/types";
import { RepoCardsBody } from "./RepoCardsBody";
import { RepoCardsHeader } from "./RepoCardsHeader";

interface RepoCardsProps {

    items: GitHubRepository[];
    start: number;
    end: number;
    toggleFavorite: (repository: GitHubRepository) => void;
    favorites: GitHubRepository[];
    firstPage: number;
}

export function RepoCards({items, start, end, toggleFavorite, favorites, firstPage}: RepoCardsProps) {

    const getDescription = (text: string | null) => {
        if (!text) return "No description";
        return text.length > 128 ? text.slice(0, 128) + "..." : text;
    };
    return (
        <section style = {{
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
            flex: "1"

        }}>

        {
            firstPage === 0 ? <div className="Extra">
                                <p className="Extra__title">Empty for now</p>
                            </div> : items.slice(start, end).map(repository => (
                <div
                    key={repository.id}
                    className="repoCards"
                    style={{
                        cursor: "pointer"
                    }}
                    onClick={() => open(repository.html_url)}
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


