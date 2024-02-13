import { useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "@/app/store/store";

const Header = () => {
  const isAuthorized = useSelector((state: RootState) => state.user.authorized);

  return (
    <header className="flex items-center justify-between bg-gray-800 p-4">
      <div className="flex items-center gap-4">
        <span className="text-white text-lg font-semibold">Explore:</span>
        {isAuthorized && (
          <Link
            href="/blog"
            className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
          >
            Blog
          </Link>
        )}
        <Link
          href="/login"
          className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
        >
          Register
        </Link>
      </div>
    </header>
  );
};

export default Header;
