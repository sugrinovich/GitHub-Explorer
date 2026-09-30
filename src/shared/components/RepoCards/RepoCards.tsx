import type {GitHubRepository} from "../../types/types";
import { RepoCardsBody } from "./RepoCardsBody";
import { RepoCardsHeader } from "./RepoCardsHeader";

interface RepoCardsProps {

    items: GitHubRepository[];
    start: number;
    end: number;
    toggleFavorite: (repository: GitHubRepository) => void;
    storage: GitHubRepository[];
    firstPage: number;
}

export function RepoCards({items, start, end, toggleFavorite, storage, firstPage}: RepoCardsProps) {
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
                >
                    <RepoCardsHeader repository={repository} toggleFavorite={toggleFavorite} storage={storage}/>

                    <div className="repoCards__description">

                        <p className="repoCards__description--text">
                            {(repository.description) ? repository.description : "No description"}
                        </p>
                        <RepoCardsBody repository={repository}/>

                    </div>
                </div>
            ))
        }           
        </section>
    )
}


