import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "@/components/header";
import ProfilesOverviewTable from "@/components/profiles/ProfilesOverviewTable";
import { Profile } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import { mutate } from "swr";
import useInterval from "use-interval";
import ProfileService from "../../services/ProfileService";
import { useTranslation } from "next-i18next";

const Profiles: React.FC = () => {
  const [profiles, setProfiles] = useState<Array<Profile>>();
  const [authorized, setAuthorized] = useState<boolean>(false);
  const { t } = useTranslation();
  const getProfiles = async () => {
    const response = await ProfileService.getAllProfiles();
    if (response.status === "unauthorized" || response.status === "error") {
      setAuthorized(false);
      return;
    }
    setAuthorized(true);
    return setProfiles(response);
  };

  useInterval(() => {
    mutate("profiles", getProfiles());
  }, 5000);

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <>
      <Head>
        <title>{t("profiles.index.title")}</title>
      </Head>
      <Header current="profiles" />
      <main>
        <h1>{t("profiles.index.title")}</h1>
        <section>
          {authorized ? (
            profiles && <ProfilesOverviewTable profiles={profiles} />
          ) : (
            <p>{t("authorization.error")}</p>
          )}
        </section>
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

export default Profiles;
