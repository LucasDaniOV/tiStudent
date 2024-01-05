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
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const getUser = async () => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      const profile = await ProfileService.getProfileById(JSON.parse(user).id);
      return profile.profile.username;
    }
  };
  const { data, isLoading, error } = useSWR("user", getUser);
  useInterval(() => {
    mutate("user", getUser());
  }, 5000);

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
        <span>
          <h1 className="text-3xl font-bold">
            {t("home.welcome")} {data}!
          </h1>
        </span>
        <Image
          src="/images/logo.png"
          alt="tiStudent Logo"
          width={250}
          height={250}
          style={{ padding: "1rem" }}
        />
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
