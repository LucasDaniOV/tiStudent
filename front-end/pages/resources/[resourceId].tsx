import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import ResourceID from "@/components/resources/ResourceID";
import ProfileService from "@/services/ProfileService";
import ResourceService from "@/services/ResourceService";
import { Profile } from "@/types/index";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const ReadResourceById = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const { t } = useTranslation();
  const router = useRouter();
  const { resourceId } = router.query;

  const getProfile = async () => {
    try {
      const loggedInUser = sessionStorage.getItem("loggedInUser");
      if (!loggedInUser) {
        setIsLoading(false);
        return;
      }
      const profileResponse = await ProfileService.getProfileById(JSON.parse(loggedInUser).id);
      if (profileResponse.profile) {
        setProfile(profileResponse.profile);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchResource = async () => {
    try {
      if (!profile) return;
      return await ResourceService.getResourceById(resourceId as string);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchResourceProfile = async () => {
    try {
      if (!resource || !profile) return;
      if (resource.profileId == profile.id) {
        return profile;
      }
      const profileResponse = await ProfileService.getProfileById(resource.profileId);
      return profileResponse.profile;
    } catch (error) {
      console.error(error);
    }
  };

  const { data: resource } = useSWR(profile ? "resource" : null, fetchResource);
  const { data: resourceProfile } = useSWR(resource ? "resourceProfile" : null, fetchResourceProfile);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      mutate("resource", fetchResource());
    }
  }, [profile]);

  useEffect(() => {
    if (resource) {
      mutate("resourceProfile", fetchResourceProfile());
    }
  }, [resource]);

  useInterval(() => {
    mutate("resource", fetchResource());
    mutate("resourceProfile", fetchResourceProfile());
  }, 5000);

  return (
    <>
      <Head>
        <title>{t("resources.info.title")}</title>
      </Head>

      {!isLoading && (
        <>
          <Header current="resources" isLoggedIn={!!profile} />

          <main className="px-20">
            {profile ? (
              <>
                {resource && resourceProfile && (
                  <ResourceID resource={resource} profile={profile} creator={resourceProfile} />
                )}
              </>
            ) : (
              <div className="text-red-600">{t("authorization.error")}</div>
            )}
          </main>

          <Footer />
        </>
      )}
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

export default ReadResourceById;
