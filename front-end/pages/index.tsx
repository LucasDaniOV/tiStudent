import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Language from "@/components/Language";
import ProfileService from "@/services/ProfileService";
import styles from "@/styles/Home.module.css";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [name, setName] = React.useState<string>("");
  const getUser = async () => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      const profile = await ProfileService.getProfileById(JSON.parse(user).id);
      setName(profile.profile.username);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Head>
        <title>{t("app.title")}</title>
        <meta name="description" content="tiStudent app" />
        <meta name="viewport" content="width=device-with, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header current="home"></Header>
      <main className="flex flex-col items-center justify-center w-max m-auto">
        <Image
          src="/images/logo.png"
          alt="tiStudent Logo"
          width={250}
          height={250}
          style={{ padding: "1rem" }}
        />
        <span>
          <h1 className="text-3xl font-bold">
            {t("home.welcome")} {name}!
          </h1>
        </span>
        <div className={styles.description}>
          <p>{t("home.message")}</p>
        </div>
      </main>
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

export default Home;
