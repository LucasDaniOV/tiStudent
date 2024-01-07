import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import ResourceEditForm from "@/components/resources/ResourceEditForm";
import useAuthProfile from "@/hooks/useAuthProfile";
import useProfile from "@/hooks/useProfile";
import useResource from "@/hooks/useResource";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";

const EditResourceById = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { resourceId } = router.query;

  const { profile, isLoading: isLoadingAuthProfile } = useAuthProfile();
  const { resource, isLoading: isLoadingResource } = useResource(resourceId as string);
  const { profile: resourceProfile, isLoading: isLoadingResourceProfile } = useProfile(resource?.profileId as string);

  return (
    <>
      <Head>
        <title>{t("resources.title")}</title>
      </Head>

      {!isLoadingAuthProfile && (
        <>
          <Header current="resources" isLoggedIn={!!profile} />

          <main className="px-20">
            {!profile || ((profile.id != resource?.profileId) && profile.role !== "ADMIN") ? (
              <div className="text-red-600">{t("authorization.error")}</div>
            ) : (
              <>{resource && resourceProfile && <ResourceEditForm resourceId={resource.id as string} />}</>
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

export default EditResourceById;
