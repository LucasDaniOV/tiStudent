import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "@/components/Header";
import ProfilesOverviewTable from "@/components/profiles/ProfilesOverviewTable";
import { Profile } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import { mutate } from "swr";
import useInterval from "use-interval";
import ProfileService from "../../services/ProfileService";
import { useTranslation } from "next-i18next";
import LeaderBoard from "@/components/profiles/LeaderBoard";
import { useRouter } from "next/router";

const Profiles: React.FC = () => {
  const [profiles, setProfiles] = useState<Array<Profile>>();
  const [topTen, setTopTen] =
    useState<Array<{ profile: Profile; resourceCount: number }>>();
  const [authorized, setAuthorized] = useState<boolean>(false);
  const { t } = useTranslation();
  const router = useRouter();
  const getProfiles = async () => {
    const response = await ProfileService.getAllProfiles();
    if (response.status === "unauthorized" || response.status === "error") {
      setAuthorized(false);
      sessionStorage.removeItem("loggedInUser");
      confirm("You have to be logged in to view any profiles.");
      router.push("/login");
      return;
    }
    setAuthorized(true);
    return setProfiles(response.profiles);
  };

  const getTopTen = async () => {
    const response = await ProfileService.getLeaderboard();
    if (response.status === "unauthorized" || response.status === "error") {
      setAuthorized(false);
      return;
    }
    setAuthorized(true);
    return setTopTen(response.profiles);
  };

  useInterval(() => {
    mutate("profiles", getProfiles());
    mutate("topTen", getTopTen());
  }, 5000);

  useEffect(() => {
    getProfiles();
    getTopTen();
  }, []);

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
              <div className="m-12">
                {topTen && <LeaderBoard profiles={topTen} />}
              </div>
              {profiles && <ProfilesOverviewTable profiles={profiles} />}
            </>
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
