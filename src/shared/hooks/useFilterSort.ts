import { isWithinUpdateFilter } from "../utils/getFilteredDate";
import type { GitHubRepository } from "../types/types";

export type SortFilters = {
    language: string;
    minStars: string;
    updated: string;
    sortBy: keyof GitHubRepository | "any";
};

export function filterRepositories(items: GitHubRepository[], filters: SortFilters) {

    let result = items;

    if (filters.language !== "any") {
        result = result.filter(
            el => el.language?.toLowerCase() === filters.language.toLowerCase()
        );
    }

    if (filters.minStars !== "any") {
        result = result.filter(
            el => el.stargazers_count > Number(filters.minStars)
        );
    }

    if (filters.updated !== "any") {
        result = result.filter(
            el => isWithinUpdateFilter(el.updated_at, filters.updated)
        );
    }

    if (filters.sortBy !== "any") {
        const key = filters.sortBy;

        result = [...result].sort(
            (a, b) => Number(b[key]) - Number(a[key])
        );
    }

    return result;
}