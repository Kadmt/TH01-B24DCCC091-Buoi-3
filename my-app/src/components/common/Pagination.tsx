import React from 'react';
import './Pagination.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
    currentPage, 
    totalPages, 
    totalItems,
    onPageChange 
}) => {
    if (totalPages <= 1) return null;

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination-container">
            <p className="pagination-info">
                Tổng cộng: {totalItems} sản phẩm | Trang {currentPage} / {totalPages}
            </p>
            <nav>
                <ul className="pagination">
                    
                    {/* Previous Button */}
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                            className="page-link" 
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1} // Thêm thuộc tính disabled để vô hiệu hóa nút
                        >
                            Previous
                        </button>
                    </li>
                    
                    {pageNumbers.map(page => (
                        <li 
                            key={page} 
                            className={`page-item ${currentPage === page ? 'active' : ''}`}
                        >
                            <button 
                                className="page-link" 
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                    
                    {/* Next Button */}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button 
                            className="page-link" 
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages} 
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;