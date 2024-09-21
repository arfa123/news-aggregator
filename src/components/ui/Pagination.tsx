import Link from "next/link";

const Pagination = ({
  currentPage,
  totalPages,
  pagePath,
}: {
  currentPage: number;
  totalPages: number;
  pagePath: string;
}) => {
  const createPageUrl = (page: number) => {
    const searchParams = new URLSearchParams({ page: `${page}` });
    return `${pagePath}?${searchParams.toString()}`;
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push({
        label: `${i}`,
        value: i,
        url: createPageUrl(i),
      });
    }

    return pageNumbers;
  };

  const previousPageUrl = createPageUrl(currentPage - 1);
  const nextPageUrl = createPageUrl(currentPage + 1);

  return (
    <div className="mt-8 flex justify-center">
      <nav className="inline-flex rounded-md shadow">
        <Link
          href={previousPageUrl}
          className={`rounded-l-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 ${currentPage === 1 ? "pointer-events-none" : ""}`}
        >
          Previous
        </Link>
        {getPageNumbers().map((pageNumber) => (
          <Link
            key={pageNumber.url}
            href={pageNumber.url}
            className={`border-y border-gray-300 bg-white px-4 py-2 ${currentPage === pageNumber.value ? "pointer-events-none bg-blue-50 font-medium text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}
          >
            {pageNumber.label}
          </Link>
        ))}
        <Link
          href={nextPageUrl}
          className={`rounded-r-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 ${currentPage === totalPages ? "pointer-events-none" : ""}`}
        >
          Next
        </Link>
      </nav>
    </div>
  );
};

export default Pagination;
