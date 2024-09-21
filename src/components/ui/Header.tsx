import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 py-6 sm:flex-row">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:mb-0">
          News Aggregator
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="font-semibold text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/feed" className="text-gray-600 hover:text-gray-900">
                Your Feed
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="text-gray-600 hover:text-gray-900"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
