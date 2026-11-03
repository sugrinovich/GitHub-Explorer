import "./Pagination.css"

interface PaginationProps {

    page: number;
    totalPages: number;
    handleNext: () => void;
    handlePrev: () => void;
}

export function Pagination({page, totalPages, handleNext, handlePrev}: PaginationProps) {
    if (totalPages === 0) return null;

    return (
        <div className="pagination">
            <p>
                Page {page} of {totalPages}
            </p>
            <div className="pagination__buttons">
                <button
                    className="pagination__buttons--item"
                    type="button"
                    disabled={page <= 1}
                    onClick={handlePrev}>← Previous</button>
                <button
                    className="pagination__buttons--item"
                    type="button"
                    disabled={page >= totalPages}
                    onClick={handleNext}>Next →</button>
            </div>
        </div>
    )
}
