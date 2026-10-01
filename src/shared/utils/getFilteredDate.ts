export function getDaysSince(str: string): number {
    const date = new Date(str);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    return diffMs / (1000 * 60 * 60 * 24);
}

const UPDATE_THRESHOLDS: Record<string, number> = {
    day: 1,
    week: 7,
    month: 30,
    year: 365,
};

export function isWithinUpdateFilter(str: string, filter: string): boolean {
    if (filter === "any") return true;
    const threshold = UPDATE_THRESHOLDS[filter];
    return getDaysSince(str) <= threshold;
}