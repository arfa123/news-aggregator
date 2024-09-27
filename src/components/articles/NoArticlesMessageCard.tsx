import { EnvelopeIcon } from "@heroicons/react/24/outline";

const NoArticlesMessageCard = () => {
  return (
    <div className="mb-8 rounded-lg bg-white p-8 text-center shadow-md">
      <EnvelopeIcon />
      <h3 className="mb-2 text-xl font-semibold">No Articles Found</h3>
      <p className="text-gray-600">
        We couldn&apos;t find any articles matching your search criteria. Please
        try adjusting your filters or search terms.
      </p>
    </div>
  );
};

export default NoArticlesMessageCard;
