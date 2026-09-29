import { numberFormatter } from "../../utils/numbersFormatter";
import { dateFormatter} from "../../utils/dateFormatter";
import type { GitHubRepository } from "../../types/types";
import "./RepoCards.css";

interface RepoCardsBodyProps {
    repository: GitHubRepository;
}

export function RepoCardsBody({ repository }: RepoCardsBodyProps) {
    return (
        <div className="repoCards__body">
            <p className="repoCards__body--text">
                {repository.language}
            </p>

            <p className="repoCards__body--text">
                {numberFormatter(repository.stargazers_count)}
            </p>

            <p className="repoCards__body--text">
                {numberFormatter(repository.forks_count)}
            </p>

            <p className="repoCards__body--text">
                {numberFormatter(repository.open_issues_count)}
            </p>

            <p className="repoCards__body--text" style={{ margin: "0 0 0 auto" }}>
                {"Updated " + dateFormatter(repository.updated_at)}
            </p>
        </div>
    )
}