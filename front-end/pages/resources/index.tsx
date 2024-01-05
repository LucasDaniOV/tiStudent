import Header from "@/components/Header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import ResourcesOverviewTable from "../../components/resources/ResourcesOverviewTable";
import ResourceService from "../../services/ResourceService";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Resources: React.FC = () => {
  const [authorized, setAuthorized] = useState<boolean>(true);
  const { t } = useTranslation();
  const router = useRouter();
  const getResources = async () => {
    const response = await ResourceService.getAllResources();
    if (response.status === "unauthorized" || response.status === "error") {
      setAuthorized(false);
      sessionStorage.removeItem("loggedInUser");
      return;
    }
    setAuthorized(true);
    return response.resources;
  };

  const { data, isLoading, error } = useSWR("resources", getResources);

  useInterval(() => {
    mutate("resources", getResources());
  }, 5000);

  return (
    <>
      <Head>
        <title>{t("resources.title")}</title>
      </Head>
      <Header current="resources" />
      <main className="grid grid-cols-4">
        <section className="col-span-3 items-center">
          <h1 className="m-auto text-3xl">{t("resources.title")}</h1>
          {error && <div>{error}</div>}
          {isLoading && <div>{t("loading")}</div>}
          {authorized ? (
            data && <ResourcesOverviewTable resources={data} />
          ) : (
            <p>{t("authorization.error")}</p>
          )}
        </section>
        {authorized && (
          <section id="addResource" className="col-span-1 m-auto">
            <Link
              href="/resources/create"
              className=" bg-gray-400 p-8 hover:bg-gray-200 hover:text-black text-xl"
            >
              {t("resources.info.message")}
            </Link>
          </section>
        )}
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
export default Resources;
