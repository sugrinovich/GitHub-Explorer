import type { GitHubRepository } from "../../types/types";
import "./RepoCards.css";

interface RepoCardsHeaderProps {
    repository: GitHubRepository;
    toggleFav: (repository: GitHubRepository) => void;
    storage: GitHubRepository[];
}

export function RepoCardsHeader({ repository, toggleFav, storage}: RepoCardsHeaderProps) {
    const isFavorite = storage.some(el => el.id === repository.id);
    return (
        <div className="repoCards__header">
            <div className="repoCards__header--avatar">
                <img className="repoCards__avatar" src={repository.owner.avatar_url}/>
            </div>

            <h3 className="repoCards__header--title">
                {repository.full_name}
            </h3>

            <button className="repoCards__header--button"
                onClick={() => toggleFav(repository)}>
                {(isFavorite) ? "Delete" : "Save"}
            </button>
        </div>
    )
}