import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import ResourcesOverviewTable from "@/components/resources/ResourcesOverviewTable";
import ProfileService from "@/services/ProfileService";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const Resources: React.FC = () => {
  const { t } = useTranslation();

  const getProfile = async () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (!loggedInUser) return;
    const profileResponse = await ProfileService.getProfileById(JSON.parse(loggedInUser).id);
    if (profileResponse.profile) {
      return profileResponse.profile;
    }
  };

  const { data, isLoading, error } = useSWR("profile", getProfile);

  if (error) {
    console.error("Failed to fetch resources:", error);
    return <div>{t("login.error")}</div>;
  }
  useInterval(() => {
    mutate("profile", getProfile());
  }, 2500);

  return (
    <>
      <Head>
        <title>{t("resources.title")}</title>
      </Head>

      <Header current="resources" isLoggedIn={!!data} />

      <main className="pl-20 pr-20">
        <h1 className="text-3xl">{t("resources.title")}</h1>
        {isLoading ? (
          <p>{t("loading")}</p>
        ) : data ? (
          <>
            <Link href="/resources/create">{t("resources.create")}</Link>
            <ResourcesOverviewTable profile={data} />
          </>
        ) : (
          <div className="text-red-600">{t("authorization.error")}</div>
        )}
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
export default Resources;
