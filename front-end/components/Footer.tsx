import { useTranslation } from "next-i18next";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    setUser(sessionStorage.getItem("loggedInUser"));
  }, [user]);
  const basic =
    "text-white text-opacity-50 no-underline text-center text-xl hover:text-opacity-100";
  return (
    <footer
      role="heading"
      className="mt-5 p-4 border-b border-black bg-gradient-to-b from-black to-gray-800 w-screen
      "
    >
      <div className="grid grid-cols-2">
        <div>
          <h1 className="text-2xl text-gray-400">Keep in touch:</h1>
          <ul>
            <li>davy.bellens@student.ucll.be</li>
            <li>lucas.oudevrielink@student.ucll.be</li>
          </ul>
        </div>
        <div className="grid grid-cols-3">
          <div>
            <p className="text-lg text-gray-400">Startdate project</p>
            <p>20/09/2023</p>
          </div>
          <div>
            <p className="text-lg text-gray-400">Supported languages</p>
            <ul>
              <li>English</li>
              <li>Nederlands</li>
              <li>Español</li>
              <li>Română</li>
            </ul>
          </div>
          <div>
            <p className="text-lg text-gray-400">Menu</p>
            <ul>
              <li>
                <Link href={"/"}>{t("header.nav.home")}</Link>
              </li>
              <li>
                <Link href={"/resources"}>{t("header.nav.resources")}</Link>
              </li>
              <li>
                <Link href={"/profiles"}>{t("header.nav.profiles")}</Link>
              </li>
              <li>
                <Link href={"/login"}>
                  {user ? t("header.nav.logout") : t("header.nav.login")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="col-span-2 flex justify-center">
          Copyright &copy; 2024 - Full Stack Software Development
        </p>
      </div>
    </footer>
  );
};

export default Footer;
