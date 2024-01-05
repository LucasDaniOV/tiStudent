import Header from "@/components/header/Header";
import LeaderBoard from "@/components/profiles/LeaderBoard";
import ProfilesOverviewTable from "@/components/profiles/ProfilesOverviewTable";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import ProfileService from "../../services/ProfileService";
import Footer from "@/components/Footer";

const Profiles: React.FC = () => {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const { t } = useTranslation();
  const getProfiles = async () => {
    const response = await ProfileService.getAllProfiles();
    if (response.status === "unauthorized" || response.status === "error") {
      setAuthorized(false);
      sessionStorage.removeItem("loggedInUser");
      return;
    }
    setAuthorized(true);
    return response.profiles;
  };

  const getTopTen = async () => {
    const response = await ProfileService.getLeaderboard();
    if (response.status === "unauthorized" || response.status === "error") {
      setAuthorized(false);
      return;
    }
    setAuthorized(true);
    return response.profiles;
  };

  const { data: profilesData, isLoading: profilesLoading, error: profilesError } = useSWR("profiles", getProfiles);

  const { data: topTenData, isLoading: topTenLoading, error: topTenError } = useSWR("topTen", getTopTen);

  useInterval(() => {
    mutate("profiles", getProfiles());
    mutate("topTen", getTopTen());
  }, 5000);

  return (
    <>
      <Head>
        <title>{t("profiles.index.title")}</title>
      </Head>
      <Header current="profiles" />
      <main>
        <h1 className="text-3xl">{t("profiles.index.title")}</h1>
        <section>
          {authorized ? (
            <>
              {profilesError && <div>{profilesError}</div>}
              {topTenError && <div>{topTenError}</div>}
              {topTenLoading && <div>{t("loading")}</div>}
              {profilesLoading && <div>{t("loading")}</div>}
              <div className="m-12">{topTenData && <LeaderBoard profiles={topTenData} />}</div>
              {profilesData && <ProfilesOverviewTable profiles={profilesData} />}
            </>
          ) : (
            <p>{t("authorization.error")}</p>
          )}
        </section>
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

export default Profiles;
