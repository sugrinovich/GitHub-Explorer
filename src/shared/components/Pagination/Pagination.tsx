import "./Pagination.css"

interface PaginationProps {

    page: number;
    totalPages: number;
    handleNext: () => void;
    handlePrev: () => void;
}

export function Pagination({page, totalPages, handleNext, handlePrev}: PaginationProps) {
    return (
        <div className="pagination">
            <p>
                Showing {page} of {totalPages} pages.
            </p>
            <div className="pagination__buttons">
                <button 
                    className="pagination__buttons--item"
                    onClick={() => handlePrev()}>Previous</button>
                <button 
                    className="pagination__buttons--item"
                    onClick={() => handleNext()}>Next →</button>
            </div>
        </div>
    )
}