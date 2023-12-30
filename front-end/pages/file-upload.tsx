import FileUploadComponent from "@/components/FileUploadComponent";
import Header from "@/components/Header";
import ProfileService from "@/services/ProfileService";
import styles from "@/styles/Home.module.css";
import { Profile } from "@/types";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";

const FileUpload: React.FC = () => {
  const { t } = useTranslation();
  const [user, setUser] = React.useState<Profile>();
  const getUser = async () => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      const id = JSON.parse(user).id;
      const profile = await ProfileService.getProfileById(id);
      setUser(profile);
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
      <main className="flex flex-col items-center justify-center w-max m-auto">
        <Header current="home" />
        {user ? <FileUploadComponent /> : <p>{t("authorization.error")}</p>}
      </main>
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

export default FileUpload;
