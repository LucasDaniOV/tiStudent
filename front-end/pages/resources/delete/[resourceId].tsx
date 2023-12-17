import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "@/components/header";
import ResourceService from "@/services/ResourceService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Resource } from "@/types/index";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const DeleteResourceById = () => {
  const [resource, setResource] = useState<Resource>();

  const router = useRouter();
  const { resourceId } = router.query;

  const deleteResourceById = async () => {
    const [resourceResponse] = await Promise.all([
      ResourceService.deleteResourceById(resourceId as string),
    ]);
    const [resource] = await Promise.all([resourceResponse.json()]);
    setResource(resource);
  };

  useEffect(() => {
    if (resourceId) deleteResourceById();
  }, []);
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("resources.info.title")}</title>
      </Head>
      <Header current="resources" />
      <main>
        <h1>
          {t("resources.delete")}
          {resource && resourceId}
        </h1>
        {!resourceId && <p>{t("loading")}</p>}
        <Link href="/resources">{t("back")}</Link>
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

export default DeleteResourceById;
