import Comments from "@/components/comments/Comments";
import Header from "@/components/Header";
import Likes from "@/components/likes/likes";
import ResourceInfo from "@/components/resources/ResourceInfo";
import CommentService from "@/services/CommentService";
import LikeService from "@/services/LikeService";
import ProfileService from "@/services/ProfileService";
import ResourceService from "@/services/ResourceService";
import { Like, Profile, Resource } from "@/types/index";
import { getToken } from "@/util/token";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const ReadResourceById = () => {
  const { t } = useTranslation();
  const [resource, setResource] = useState<Resource>();
  const [profile, setProfile] = useState<Profile>();
  const [commentMessage, setMessage] = useState<string>("");
  const router = useRouter();
  const { resourceId } = router.query;

  const getResourceById = async () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (!loggedInUser) return;
    const [resourceResponse, profileResponse] = await Promise.all([
      ResourceService.getResourceById(resourceId as string),
      ProfileService.getProfileById(JSON.parse(loggedInUser).id),
    ]);
    setResource(resourceResponse);
    setProfile(profileResponse.data);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!profile) return;
    if (!resource) return;
    await CommentService.writeCommentOnResource(
      profile.id,
      resource.id,
      commentMessage
    );
    router.reload();
  };

  useEffect(() => {
    if (resourceId) {
      getResourceById();
    }
  }, [resourceId]);

  return (
    <>
      <Head>
        <title>{t("resources.info.title")}</title>
      </Head>
      <Header current="resources" />
      <main>
        {!resourceId && <p>{t("loading")}</p>}
        <div className="flex flex-row">
          <section className="flex flex-row w-screen m-auto">
            {resource && profile && (
              <Likes
                profileId={profile.id}
                id={String(resource.id)}
                object="resource"
              />
            )}
            <ResourceInfo resource={resource as Resource}></ResourceInfo>
          </section>
        </div>
        <section className="mt-10">
          {resource && <Comments id={resource.id} object="resource"></Comments>}
        </section>
        <section>
          {resource && (
            <section className="w-1/4 m-auto flex ">
              <h3 className="mt-10 mr-10">{t("resources.comment.add")}</h3>
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col mt-10"
              >
                <label htmlFor="message">
                  {t("resources.comment.message")}
                </label>
                <input
                  type="text"
                  id="message"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="m-10 bg-gray-700 hover:bg-gray-400"
                >
                  {t("resources.comment.submit")}
                </button>
              </form>
            </section>
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

export default ReadResourceById;
