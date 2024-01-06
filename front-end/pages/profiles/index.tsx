import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import ProfilesPage from "@/components/profiles/ProfilesPage";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useEffect, useState } from "react";

const Profiles: React.FC = () => {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const { t } = useTranslation();

  const getProfile = () => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Head>
        <title>{t("profiles.index.title")}</title>
      </Head>
      <Header current="profiles" isLoggedIn={authorized} />
      <main>{authorized ? <ProfilesPage /> : <p>{t("authorization.error")}</p>}</main>
      <Footer />
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Profiles;
