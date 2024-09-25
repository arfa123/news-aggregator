const NoArticlesMessageCard = () => {
  return (
    <div className="mb-8 rounded-lg bg-white p-8 text-center shadow-md">
      <svg
        className="mx-auto mb-4 size-16 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        ></path>
      </svg>
      <h3 className="mb-2 text-xl font-semibold">No Articles Found</h3>
      <p className="text-gray-600">
        We couldn&apos;t find any articles matching your search criteria. Please
        try adjusting your filters or search terms.
      </p>
    </div>
  );
};

export default NoArticlesMessageCard;
