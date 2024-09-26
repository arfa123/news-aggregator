"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { generatePaginationArray } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pageNumbers = generatePaginationArray(currentPage, totalPages);

  return (
    <div className="mt-8 flex justify-center">
      <nav className="inline-flex rounded-md shadow">
        <Link
          href={createPageURL(Math.max(1, currentPage - 1))}
          className={`rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 ${
            currentPage <= 1 ? "pointer-events-none opacity-50" : ""
          }`}
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="size-5" aria-hidden="true" />
        </Link>
        {pageNumbers.map((page) => (
          <Link
            key={page}
            href={createPageURL(page)}
            className={`border-y border-r border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
              currentPage === page
                ? "pointer-events-none bg-blue-50 text-blue-600"
                : "text-gray-500 hover:bg-gray-50"
            }`}
            aria-current={currentPage === page ? "page" : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </Link>
        ))}
        <Link
          href={createPageURL(Math.min(totalPages, currentPage + 1))}
          className={`rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 ${
            currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
          }`}
          aria-label="Next page"
        >
          <ChevronRightIcon className="size-5" aria-hidden="true" />
        </Link>
      </nav>
    </div>
  );
};

export default Pagination;
