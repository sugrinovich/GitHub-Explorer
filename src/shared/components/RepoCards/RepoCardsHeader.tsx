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
                <img className="repoCards__avatar" src={repository.owner.avatar_url} alt="" loading="lazy"/>
            </div>

            <h3 className="repoCards__header--title">
                {/* Ссылка растянута на всю карточку через ::after в CSS */}
                <a className="repoCards__link"
                    href={repository.html_url}
                    target="_blank"
                    rel="noopener noreferrer">
                    {repository.full_name}
                </a>
            </h3>

            <button className="repoCards__header--button"
                type="button"
                onClick={() => toggleFavorite(repository)}>
                {(isFavorite) ? "Delete" : "Save"}
            </button>
        </div>
    )
}
