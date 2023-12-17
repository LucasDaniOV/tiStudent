import Link from "next/link";
import React, { useEffect, useState } from "react";
import Language from "./Language";
import { useTranslation } from "next-i18next";

type Props = {
  current: string;
};

const Header: React.FC<Props> = ({ current }: Props) => {
  const { t } = useTranslation();
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
          {t("app.title")}
        </a>
        <Link
          href="/"
          className={current == "home" ? basic + " bg-gray-700" : basic}
        >
          {t("header.nav.home")}
        </Link>
        <Link
          href="/users"
          className={current == "users" ? basic + " bg-gray-700" : basic}
        >
          {t("header.nav.users")}
        </Link>
        <Link
          href="/resources"
          className={current == "resources" ? basic + " bg-gray-700" : basic}
        >
          {t("header.nav.resources")}
        </Link>
        <Link
          href="/profiles"
          className={current == "profiles" ? basic + " bg-gray-700" : basic}
        >
          {t("header.nav.profiles")}
        </Link>
        <Link
          href="/login"
          className={current == "login" ? basic + " bg-gray-700" : basic}
        >
          {user ? t("header.nav.logout") : t("header.nav.login")}
        </Link>
        <Language />
      </nav>
    </header>
  );
};

export default Header;
