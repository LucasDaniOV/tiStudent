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
import { useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const ReadResourceById = () => {
  const [creator, setCreator] = useState<Profile>();
  const [image, setImage] = useState<string>("");
  const { t } = useTranslation();
  const router = useRouter();
  const { resourceId } = router.query;

  const getProfile = async () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (!loggedInUser) return;
    const profileResponse = await ProfileService.getProfileById(JSON.parse(loggedInUser).id);
    return profileResponse.profile;
  };

  const getImage = async (thumbNail: string) => {
    try {
      const img = await import("../../../back-end/uploads/" + thumbNail);
      setImage(img);
    } catch (error) {
      console.error(error);
    }
  };

  const getResource = async () => {
    const resource = await ResourceService.getResourceById(resourceId as string);
    if (resource) {
      getImage(resource.thumbNail);
      if (profile)
        try {
          if (resource?.profileId === profile.id) {
            setCreator(profile);
          } else {
            getCreator(resource.profileId);
          }
        } catch (error) {
          console.log(error);
        }
      return resource;
    }
  };

  const getCreator = async (profileId: string) => {
    const response = await ProfileService.getProfileById(profileId);
    setCreator(response.profile);
  };

  const { data: profile, isLoading: profileLoading, error: profileError } = useSWR("profile", getProfile);

  const {
    data: resource,
    isLoading: resourceLoading,
    error: resourceError,
  } = useSWR(["resource", resourceId], getResource);

  useInterval(() => {
    mutate(["profile", resourceId], getProfile());
    mutate(["resource", resourceId], getResource());
  }, 5000);

  return (
    <>
      <Head>
        <title>{t("resources.info.title")}</title>
      </Head>
      <Header current="resources" isLoggedIn={!!profile} />
      <main>
        {resourceLoading ? (
          <p>{t("loading")}</p>
        ) : (
          resource && <ResourceID resource={resource} creator={creator} image={image} />
        )}
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

export default ReadResourceById;
