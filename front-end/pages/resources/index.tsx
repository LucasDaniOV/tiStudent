import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import ResourcesOverviewTable from "@/components/resources/ResourcesOverviewTable";
import ProfileService from "@/services/ProfileService";
import { Profile, Resource } from "@/types";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import ResourceService from "../../services/ResourceService";

const Resources: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { t } = useTranslation();

  const getProfile = async () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (!loggedInUser) return;

    const profileResponse = await ProfileService.getProfileById(JSON.parse(loggedInUser).id);

    if (profileResponse.profile) {
      setProfile(profileResponse.profile);
    }
  };

  const fetchResources = async () => {
    if (!profile) return;
    const resourcesResponse = await ResourceService.getAllResources();
    return resourcesResponse.resources;
  };

  const { data: resources, error } = useSWR(profile ? "resources" : null, fetchResources);

  if (error) {
    console.error("Failed to fetch resources:", error);
    return <div>Error loading resources.</div>;
  }

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      mutate("resources", fetchResources());
    }
  }, [profile]);

  useInterval(() => {
    mutate("resources", fetchResources());
  }, 5000);

  return (
    <>
      <Head>
        <title>{t("resources.title")}</title>
      </Head>

      <Header current="resources" isLoggedIn={!!profile} />

      <main className="pl-20 pr-20 flex flex-col gap-5">
        <h1 className="text-3xl">{t("resources.title")}</h1>
        {profile ? (
          <div>
            <button className="p-5 rounded-xl mb-5 bg-tistudent-blue hover:bg-blue-500 text-xl">
              <Link href="/resources/create">{t("resources.create")}</Link>
            </button>
            {resources && <ResourcesOverviewTable resources={resources as Resource[]} />}
          </div>
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
