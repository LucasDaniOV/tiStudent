import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "@/components/Header";
import ProfileInfo from "@/components/profiles/ProfileInfo";
import ProfileService from "@/services/ProfileService";
import { Profile } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

const ReadProfileById = () => {
  const [profile, setProfile] = useState<Profile>();
  const { t } = useTranslation();
  const router = useRouter();
  const { profileId } = router.query;
  const getProfileById = async () => {
    const fetchedProfile = await ProfileService.getProfileById(
      profileId as string
    );
    return setProfile(fetchedProfile.data);
  };

  useEffect(() => {
    if (profileId) getProfileById();
  });

  return (
    <>
      <Head>
        <title>{t("profiles.title")}</title>
      </Head>
      <Header current="profiles" />
      <main>
        <h1>
          {t("profiles.info")}
          {profile && profile.username}
        </h1>
        {!profileId && <p>{t("loading")}</p>}
        <section>
          <ProfileInfo profile={profile as Profile}></ProfileInfo>
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

export default ReadProfileById;
