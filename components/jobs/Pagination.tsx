import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    // If total pages is less than max, show all pages
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show first and last page, and pages around current
    const sidePages = Math.floor((maxPagesToShow - 2) / 2);

    // Current page is close to start
    if (currentPage <= sidePages + 1) {
      for (let i = 1; i <= maxPagesToShow - 1; i++) {
        pages.push(i);
      }
      pages.push(totalPages);
      return pages;
    }

    // Current page is close to end
    if (currentPage >= totalPages - sidePages) {
      pages.push(1);
      for (let i = totalPages - (maxPagesToShow - 2); i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Current page is in the middle
    pages.push(1);
    for (let i = currentPage - sidePages; i <= currentPage + sidePages; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }
    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center space-x-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
        aria-label="Previous Page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pageNumbers.map((page, i) => {
        // Insert ellipsis where there are gaps
        const prevPage = pageNumbers[i - 1];
        const showEllipsis = prevPage && page - prevPage > 1;

        return (
          <div key={page} className="flex items-center">
            {showEllipsis && (
              <span className="mx-1 inline-flex h-9 w-5 items-center justify-center text-sm text-muted-foreground">
                ...
              </span>
            )}
            <button
              onClick={() => onPageChange(page)}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-input bg-background hover:bg-muted'
              }`}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          </div>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
        aria-label="Next Page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
