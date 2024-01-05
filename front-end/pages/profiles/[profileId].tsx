import Header from "@/components/header/Header";
import AccountInfo from "@/components/profiles/AccountInfo";
import ProfileService from "@/services/ProfileService";
import { Profile } from "@/types";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ReadProfileById = () => {
  const [profile, setProfile] = useState<Profile>();
  const { t } = useTranslation();
  const router = useRouter();
  const { profileId } = router.query;
  const getProfileById = async () => {
    const fetchedProfile = await ProfileService.getProfileById(
      profileId as string
    );
    return setProfile(fetchedProfile.profile);
  };
  useEffect(() => {
    if (profileId && !profile) getProfileById();
  }, [profile, profileId]);

  return (
    <>
      <Head>
        <title>{t("profiles.title")}</title>
      </Head>
      <Header current="profiles" />
      <main className="mx-auto" style={{ width: "80%" }}>
        <h1 className="flex justify-center mb-5">
          {profile && (
            <>
              {t("profiles.info")} {profile.username}
            </>
          )}
        </h1>
        {!profileId && <p>{t("loading")}</p>}
        <section>
          <AccountInfo profile={profile as Profile} />
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
