export interface GitHubSearchResponse {
    total_count: number;
    items: GitHubRepository[];
}

export type GitHubRepository = {
    id: number;
    full_name: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    updated_at: string;
    html_url: string;
    owner: {
        avatar_url: string;
    }
}