"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { generatePagination } from "@/lib/utils";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="mt-8 flex justify-center">
      <nav className="inline-flex rounded-md shadow">
        <Link
          href={createPageURL(currentPage - 1)}
          className={`rounded-l-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 ${currentPage <= 1 ? "pointer-events-none" : ""}`}
        >
          Previous
        </Link>
        {allPages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <>
              <Link
                key={`${page}-${index}`}
                href={createPageURL(page)}
                className={`border-y border-gray-300 bg-white px-4 py-2 ${currentPage === page || position === "middle" ? "pointer-events-none bg-blue-50 font-medium text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}
              >
                {page}
              </Link>
            </>
          );
        })}
        <Link
          href={createPageURL(currentPage + 1)}
          className={`rounded-r-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 ${currentPage >= totalPages ? "pointer-events-none" : ""}`}
        >
          Next
        </Link>
      </nav>
    </div>
  );
};

export default Pagination;
