import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import { classNames } from "@/common/utils";

type PaginationBlockProps = {
  count: number;
  totalPages: number;
  currentPage: number;
  handleNextPage: (id: number) => void;
  handlePreviousPage: (id: number) => void;
};

export default function PaginationBlock({
  count,
  totalPages,
  currentPage,
  handleNextPage,
  handlePreviousPage,
}: PaginationBlockProps) {
  const [pages, setPages] = useState<number[]>([]);

  const handlePaginationNextPage = () => {
    if (currentPage < totalPages) {
      handleNextPage(currentPage + 1);
    }
  };

  const handlePaginationPreviousPage = () => {
    if (currentPage > 1) {
      handlePreviousPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const pages = [];
    if (totalPages < 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      setPages(pages);
    } else {
      if (currentPage === 1) {
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
      } else if (currentPage === totalPages) {
        for (let i = 1; i <= 3; i++) {
          pages.push(totalPages - 3 + i);
        }
      } else {
        for (let i = 1; i <= 3; i++) {
          pages.push(currentPage - 2 + i);
        }
      }
      setPages(pages);
    }
  }, [currentPage, totalPages]);

  const hasPages = pages.length > 1;

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      {hasPages && (
        <div className="flex-1 flex justify-between sm:hidden">
          <a
            onClick={handlePaginationPreviousPage}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            onClick={handlePaginationNextPage}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </a>
        </div>
      )}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Se encontraron <span className="font-medium">{count}</span> resultados
          </p>
        </div>
        <div>
          {hasPages && (
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <a
                onClick={handlePaginationPreviousPage}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              {pages.map((page) => {
                return (
                  <a
                    aria-current="page"
                    key={page}
                    className={classNames(
                      page === currentPage
                        ? "z-10 bg-blue-50 border-blue-300 text-blue-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
                      "relative inline-flex items-center px-4 py-2 border text-sm font-medium ",
                    )}
                  >
                    {page}
                  </a>
                );
              })}
              <a
                onClick={handlePaginationNextPage}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
