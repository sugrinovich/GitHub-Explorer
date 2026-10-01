import type { GitHubRepository } from "../../types/types";
import "./RepoCards.css";

interface RepoCardsHeaderProps {
    repository: GitHubRepository;
    toggleFavorite: (repository: GitHubRepository) => void;
    favorites: GitHubRepository[];
}

export function RepoCardsHeader({ repository, toggleFavorite, favorites}: RepoCardsHeaderProps) {
    const isFavorite = favorites.some(el => el.id === repository.id);
    return (
        <div className="repoCards__header">
            <div className="repoCards__header--avatar">
                <img className="repoCards__avatar" src={repository.owner.avatar_url}/>
            </div>

            <h3 className="repoCards__header--title">
                {repository.full_name}
            </h3>

            <button className="repoCards__header--button"
                onClick={() => toggleFavorite(repository)}>
                {(isFavorite) ? "Delete" : "Save"}
            </button>
        </div>
    )
}