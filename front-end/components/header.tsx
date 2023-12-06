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
  const selected =
    "text-white text-opacity-50 no-underline text-center text-xl bg-gray-700 hover:text-opacity-100 ";
  const notSelected =
    "text-white text-opacity-50 no-underline text-center text-xl hover:text-opacity-100 ";
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
        <Link href="/" className={current == "home" ? selected : notSelected}>
          Home
        </Link>
        <Link
          href="/users"
          className={current == "users" ? selected : notSelected}
        >
          Users
        </Link>
        <Link
          href="/resources"
          className={current == "resources" ? selected : notSelected}
        >
          Resources
        </Link>
        <Link
          href="/profiles"
          className={current == "profiles" ? selected : notSelected}
        >
          Profiles
        </Link>
        <Link
          href="/login"
          className={current == "login" ? selected : notSelected}
        >
          {user ? "Logout" : "Login"}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
