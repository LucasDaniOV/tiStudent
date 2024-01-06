import Footer from "@/components/Footer";
import Message from "@/components/Message";
import Welcome from "@/components/Welcome";
import Header from "@/components/header/Header";
import ProfileService from "@/services/ProfileService";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");

  const { t } = useTranslation();

  const getUser = async () => {
    const user = sessionStorage.getItem("loggedInUser");

    if (user) {
      const profile = await ProfileService.getProfileById(JSON.parse(user).id);
      setIsLoggedIn(true);
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

      <Header current="home" isLoggedIn={isLoggedIn} />

      <div className="pl-20 pr-20 grid grid-cols-2">
        <Message />
        <Welcome name={name} />
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
