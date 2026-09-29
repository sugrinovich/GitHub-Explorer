import type {GitHubRepository} from "../../types/types";
import { RepoCardsBody } from "./RepoCardsBody";
import { RepoCardsHeader } from "./RepoCardsHeader";

interface RepoCardsProps {

    items: GitHubRepository[];
    start: number;
    end: number;
    toggleFav: (id: number) => void;
    storage: number[];
}

export function RepoCards({items, start, end, toggleFav, storage}: RepoCardsProps) {
    return (
        <section style = {{
            display: "grid",
            gap: "1rem"

        }}>
        {items.slice(start, end).map(repository => (
            <div
                key={repository.id}
                className="repoCards"
            >
                <RepoCardsHeader repository={repository} toggleFav={toggleFav} storage={storage}/>

                <div className="repoCards__description">

                    <p className="repoCards__description--text">
                        {repository.description}
                    </p>
                    <RepoCardsBody repository={repository}/>

                </div>
            </div>
        ))}              
        </section>
    )
}


