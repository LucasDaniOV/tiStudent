import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  current: string;
};

const Header: React.FC<Props> = ({ current }: Props) => {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    setUser(sessionStorage.getItem("loggedInUser"));
  }, [user]);
  const basic =
    "text-white text-opacity-50 no-underline text-center text-xl hover:text-opacity-100";
  return (
    <header
      role="heading"
      className="p-4 border-b border-black bg-gradient-to-b from-gray-800 to-black text-transparent w-screen"
    >
      <nav className="flex flex-col">
        <a className="text-white text-opacity-100 text-center underline text-xl">
          {" "}
          tiStudent App
        </a>
        <Link
          href="/"
          className={current == "home" ? basic + " bg-gray-700" : basic}
        >
          Home
        </Link>
        <Link
          href="/users"
          className={current == "users" ? basic + " bg-gray-700" : basic}
        >
          Users
        </Link>
        <Link
          href="/resources"
          className={current == "resources" ? basic + " bg-gray-700" : basic}
        >
          Resources
        </Link>
        <Link
          href="/profiles"
          className={current == "profiles" ? basic + " bg-gray-700" : basic}
        >
          Profiles
        </Link>
        <Link
          href="/login"
          className={current == "login" ? basic + " bg-gray-700" : basic}
        >
          {user ? "Logout" : "Login"}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
