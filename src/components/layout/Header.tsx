"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/config/constants";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 py-6 sm:flex-row">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:mb-0">
          News Aggregator
        </h1>
        <nav>
          <ul className="flex space-x-4">
            {ROUTES.map((route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className={`${route.path === pathname ? "pointer-events-none font-semibold text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
