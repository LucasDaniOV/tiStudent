import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import AccountInfo from "@/components/profiles/AccountInfo";
import ProfileService from "@/services/ProfileService";
import { Profile } from "@/types";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const ReadProfileById = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { profileId } = router.query;
  const getProfileById = async () => {
    const fetchedProfile = await ProfileService.getProfileById(profileId as string);

    return fetchedProfile.profile;
  };

  const {
    data: profile,
    isLoading: profileIsLoading,
    error: profileError,
  } = useSWR(["profile", profileId], getProfileById);

  useInterval(() => {
    mutate(["profile", profileId], getProfileById());
  }, 5000);

  return (
    <>
      <Head>
        <title>{t("profiles.title")}</title>
      </Head>
      <Header current="profiles" isLoggedIn={!!profile} />
      <main className="mx-auto" style={{ width: "80%" }}>
        {profileError && <div>{profileError}</div>}
        {profileIsLoading && <div>{t("loading")}</div>}
        <h1 className="flex justify-center mb-5">
          {profile && (
            <>
              {t("profiles.info.message")} {profile.username}
            </>
          )}
        </h1>
        {!profileId && <p>{t("loading")}</p>}
        <section>
          <AccountInfo profile={profile as Profile} />
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

export default ReadProfileById;
