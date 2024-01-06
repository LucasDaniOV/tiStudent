import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import CreateResourceForm from "@/components/resources/ResourceCreateForm";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const CreateResource: React.FC = () => {
  const { t } = useTranslation();

  const getUser = async () => {
    return sessionStorage.getItem("loggedInUser");
  };

  const { data, isLoading, error } = useSWR("user", getUser);

  useInterval(() => {
    mutate("user", getUser());
  }, 5000);

  return (
    <>
      <Head>
        <title>{t("resources.create")}</title>
      </Head>
      <Header current="resources" isLoggedIn={!!data} />
      <main className="flex flex-row align-middle items-center justify-center">
        {isLoading && <p>{t("loading")}</p>}
        {data ? <CreateResourceForm /> : <h2>{t("authorization.error")}</h2>}
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

export default CreateResource;
