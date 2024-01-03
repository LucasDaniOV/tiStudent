import Header from "@/components/Header";
import CreateResourceForm from "@/components/resources/ResourceCreateForm";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CreateResource: React.FC = () => {
  const { t } = useTranslation();
  const [profileId, setProfileId] = useState<string>();

  const setUser = async () => {
    const user = sessionStorage.getItem("loggedInUser");
    if (!user) return;
    setProfileId(JSON.parse(user).id);
  };

  useEffect(() => {
    setUser();
  }, [profileId]);

  return (
    <>
      <Head>
        <title>{t("resources.create")}</title>
      </Head>
      <Header current="resources" />
      <main className="flex flex-row align-middle items-center justify-center">
        {profileId ? (
          <CreateResourceForm />
        ) : (
          <h2>{t("authorization.error")}</h2>
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

export default CreateResource;
