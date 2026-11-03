import { numberFormatter } from "../../utils/numbersFormatter";
import { dateFormatter} from "../../utils/dateFormatter";
import type { GitHubRepository } from "../../types/types";
import { getLanguageColor } from "../../utils/getLanguageColor";

interface RepoCardsBodyProps {
    repository: GitHubRepository;
}

export function RepoCardsBody({ repository }: RepoCardsBodyProps) {
    return (
        <div className="repoCards__body">
            <p className="repoCards__body--text" style={{ "--lang-color": getLanguageColor(repository.language) } as React.CSSProperties}>
                {(repository.language) ? repository.language : "None"}
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

            <p className="repoCards__body--text repoCards__body--updated">
                {"Updated " + dateFormatter(repository.updated_at)}
            </p>
        </div>
    )
}