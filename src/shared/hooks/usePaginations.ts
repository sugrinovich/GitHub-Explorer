import { useState } from "react";
import type { GitHubRepository } from "../types/types";
interface usePaginationsProps {
    items: GitHubRepository[];
}
export function usePaginations({ items }: usePaginationsProps) {
    
    const itemsPerPage = 3;

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const firstPage = totalPages === 0 ? 0 : 1;

    const [page, setPage] = useState(firstPage);


    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    function handleNext() {
        if (page === 0 && totalPages === 0) {
            alert("Нет страниц для просмотра!!!");
            return;
        }

        if (page < totalPages) {
            setPage(page + 1);
        } else {
            alert("Вы находитесь на последней странице!!!");
        }
    }

    function handlePrevious() {
        if (page === 0 && totalPages === 0) {
            alert("Нет страниц для просмотра!!!");
            return;
        }

        if (page > 1) {
            setPage(page - 1);
        } else {
            alert("Вы находитесь на первой странице!!!");
        }
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