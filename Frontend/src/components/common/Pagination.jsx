import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5
}) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Logic for ellipsis (...)
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const btnBase = "h-10 w-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all duration-200";
  const activeClass = "bg-[#6739b7] text-white shadow-lg shadow-indigo-100";
  const inactiveClass = "text-gray-500 hover:bg-gray-100 hover:text-[#1a237e]";

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} border border-gray-100 bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#6739b7]`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="w-8 flex justify-center text-gray-400">
                <MoreHorizontal size={16} />
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`${btnBase} ${currentPage === page ? activeClass : inactiveClass}`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} border border-gray-100 bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#6739b7]`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export default Pagination;