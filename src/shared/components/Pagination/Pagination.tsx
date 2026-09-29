import "./Pagination.css"

interface PaginationProps {

    page: number;
    totalPages: number;
    toNext: () => void;
    toPrev: () => void;
}

export function Pagination({page, totalPages, toNext, toPrev}: PaginationProps) {
    return (
        <div className="pagination">
            <p>
                Showing {page} of {totalPages} pages.
            </p>
            <div className="pagination__buttons">
                <button 
                    className="pagination__buttons--item"
                    onClick={() => toPrev()}>Previous</button>
                <button 
                    className="pagination__buttons--item"
                    onClick={() => toNext()}>Next →</button>
            </div>
        </div>
    )
}