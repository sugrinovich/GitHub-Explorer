import { useState } from "react";
import type { GitHubRepository } from "../types/types";
interface usePaginationsProps {
    items: GitHubRepository[];
}
export function usePaginations({ items }: usePaginationsProps) {

    const itemsPerPage = 3;

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const firstPage = totalPages === 0 ? 0 : 1;

    const [currentPage, setPage] = useState(firstPage);

    // Если элементов стало меньше (например, удалили из избранного),
    // не остаёмся на несуществующей странице
    const page = Math.min(Math.max(currentPage, firstPage), totalPages);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    function handleNext() {
        if (page < totalPages) setPage(page + 1);
    }

    function handlePrevious() {
        if (page > 1) setPage(page - 1);
    }

    return {
        page,
        setPage,
        totalPages,
        firstPage,
        startIndex,
        endIndex,
        handleNext,
        handlePrevious,
    };
}
