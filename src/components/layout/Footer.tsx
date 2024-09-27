import Link from "next/link";

import { Paths } from "@/types/enums";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <h3 className="mb-2 text-xl font-semibold">News Aggregator</h3>
            <p className="text-sm text-gray-400">
              Stay informed with the latest news
            </p>
          </div>
          <nav>
            <ul className="flex flex-wrap justify-center space-x-4 md:justify-end">
              <li>
                <Link href={Paths.home} className="hover:text-gray-300">
                  About
                </Link>
              </li>
              <li>
                <Link href={Paths.home} className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href={Paths.home} className="hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={Paths.home} className="hover:text-gray-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          &copy; 2024 News Aggregator. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
