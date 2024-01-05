import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import ProfileService from "@/services/ProfileService";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const { t } = useTranslation();

  const getUser = async () => {
    const user = sessionStorage.getItem("loggedInUser");

    if (user) {
      const profile = await ProfileService.getProfileById(JSON.parse(user).id);
      setIsLoggedIn(true);
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

      <Header current="home" isLoggedIn={isLoggedIn}></Header>

      <div className="pl-20 pr-20 grid grid-cols-2">
        <div className="flex items-center p-20">
          <div className="p-10 bg-tistudent-blue rounded-xl">
            <p className="text-xl">{t("home.message")}</p>
          </div>
        </div>

        <div className="p-20">
          <h1 className="text-3xl font-bold">
            {t("home.welcome")} {data}!
          </h1>
          <Image
            src="/images/einstein.jpg"
            alt="einstein smoking a cigar while browsing our website"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </div>

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
