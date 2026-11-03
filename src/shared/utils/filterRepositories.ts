import { isWithinUpdateFilter } from "./getFilteredDate";
import type { GitHubRepository, SortFilters } from "../types/types";

export const DEFAULT_FILTERS: SortFilters = {
    language: "any",
    minStars: "any",
    updated: "any",
    sortBy: "any",
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
            el => el.stargazers_count >= Number(filters.minStars)
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