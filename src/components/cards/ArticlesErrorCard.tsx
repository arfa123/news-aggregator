"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const defaultErrorMessage = `We&apos;re sorry, but there was an error fetching the articles. Please try again later or contact support if the problem persists.`;

const ArticlesErrorCard = ({ error }: { error: string }) => {
  const pathname = usePathname();

  return (
    <div
      className="mb-8 border-l-4 border-red-500 bg-red-100 p-4 text-red-700"
      role="alert"
    >
      <p className="font-bold">Error</p>
      <p>{error && typeof error === "string" ? error : defaultErrorMessage}</p>
      <Link
        href={pathname}
        className="inline-block rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
      >
        Refresh Page
      </Link>
    </div>
  );
};

export default ArticlesErrorCard;
