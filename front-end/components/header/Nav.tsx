import Link from "next/link";
import { useTranslation } from "next-i18next";

type Props = {
  current: string;
  isLoggedIn?: boolean;
};

const Nav: React.FC<Props> = ({ current, isLoggedIn }: Props) => {
  const { t } = useTranslation();

  const currentStyle = "text-xl text-blue-500";
  const basic = "text-xl text-white hover:text-blue-500";

  return (
    <nav className="flex gap-5">
      <Link href="/" className={current == "home" ? currentStyle : basic}>
        {t("header.nav.home")}
      </Link>

      <Link href="/resources" className={current == "resources" ? currentStyle : basic}>
        {t("header.nav.resources")}
      </Link>

      <Link href="/profiles" className={current == "profiles" ? currentStyle : basic}>
        {t("header.nav.profiles")}
      </Link>

      <Link href="/login" className={current == "login" ? currentStyle : basic}>
        {isLoggedIn ? t("header.nav.logout") : t("header.nav.login")}
      </Link>
    </nav>
  );
};

export default Nav;
