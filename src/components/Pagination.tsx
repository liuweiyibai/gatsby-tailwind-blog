import React, { FC } from 'react';
import { Link } from 'gatsby';

export interface PaginationProps {
  totalPages: number & string;
  currentPage: number & string;
}

const Pagination: FC<PaginationProps> = ({ totalPages, currentPage }) => {
  const prevPage = parseInt(currentPage, 10) - 1 > 0;
  const nextPage = parseInt(currentPage, 10) + 1 <= parseInt(totalPages, 10);

  return (
    <div className="pt-6 pb-8 space-y-2 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button role="previous" className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            上一页
          </button>
        )}
        {prevPage && (
          <Link to={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
            <button role="previous">Previous</button>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button role="next" className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            下一页
          </button>
        )}
        {nextPage && (
          <Link to={`/blog/page/${currentPage + 1}`}>
            <button role="next">下一页</button>
          </Link>
        )}
      </nav>
    </div>
  );
};
export default Pagination;
