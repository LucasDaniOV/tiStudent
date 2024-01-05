import FileDownloadComponent from "@/components/FileDownloadComponent";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Comments from "@/components/comments/Comments";
import Likes from "@/components/likes/likes";
import ResourceInfo from "@/components/resources/ResourceInfo";
import CommentService from "@/services/CommentService";
import ProfileService from "@/services/ProfileService";
import ResourceService from "@/services/ResourceService";
import { Profile, Resource } from "@/types/index";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const ReadResourceById = () => {
  const [creator, setCreator] = useState<Profile>();
  const [image, setImage] = useState<string>("");
  // const []
  const { t } = useTranslation();
  const [commentMessage, setMessage] = useState<string>("");
  const [shareState, setShare] = useState<boolean>(false);
  const router = useRouter();
  const { resourceId } = router.query;

  const getProfile = async () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (!loggedInUser) return;
    const profileResponse = await ProfileService.getProfileById(
      JSON.parse(loggedInUser).id
    );
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
    const resource = await ResourceService.getResourceById(
      resourceId as string
    );
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

    return;
  };

  const getSubjects = async () => {
    const response = await ResourceService.getSubjectsByResourceId(
      resourceId as string
    );
    return response;
  };

  const getCategories = async () => {
    const response = await ResourceService.getCategoriesByResourceId(
      resourceId as string
    );
    return response;
  };

  const getCreator = async (profileId: string) => {
    const response = await ProfileService.getProfileById(profileId);
    setCreator(response.profile);
  };

  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useSWR("profile", getProfile);

  const {
    data: resource,
    isLoading: resourceLoading,
    error: resourceError,
  } = useSWR(["resource", resourceId], getResource);
  const {
    data: subjects,
    isLoading: subjectsLoading,
    error: subjectsError,
  } = useSWR(["subjects", resourceId], getSubjects);
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useSWR(["categories", resourceId], getCategories);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!profile) return;
    if (!resource) return;
    if (!commentMessage) return;
    await CommentService.writeCommentOnResource(
      profile.id,
      resource.id,
      commentMessage
    );
  };

  // useInterval(() => {
  //   // mutate(["profile", resourceId], getProfile());
  //   // mutate(["resource", resourceId], getResource());
  //   // mutate(["subjects", resourceId], getSubjects());
  //   // mutate(["categories", resourceId], getCategories());
  // }, 5000);

  return (
    <>
      <Head>
        <title>{t("resources.info.title")}</title>
      </Head>
      <Header current="resources" />
      <main>
        {resourceLoading ||
        subjectsLoading ||
        categoriesLoading ||
        profileLoading ? (
          <p>{t("loading")}</p>
        ) : resource && profile ? (
          <>
            <div className="flex flex-row">
              <section className="grid grid-cols-3 w-screen m-auto">
                <>
                  <div className="col-span-1 flex justify-center">
                    {image && (
                      <Image
                        src={image}
                        width={150}
                        height={100}
                        alt="Thumbnail"
                      />
                    )}
                  </div>
                  <div className="col-span-2">
                    {subjects && categories && (
                      <ResourceInfo
                        resource={resource as Resource}
                        subjects={subjects}
                        categories={categories}
                      />
                    )}
                  </div>
                  <div className="col-start-2 ml-5">
                    {t("resources.fields.description")}: {resource.description}
                  </div>
                  <div
                    className="flex justify-center"
                    onClick={() =>
                      router.push("../../profiles/" + resource.profileId)
                    }
                  >
                    {t("resources.fields.creator")}:
                    <span className="hover:cursor-pointer hover:text-red-600 ml-1">
                      {creator?.username}
                    </span>
                  </div>
                </>
                <div className="col-start-2 col-span-2 grid grid-cols-2">
                  <div>
                    <div className="flex">
                      <Likes
                        profileId={profile.id}
                        object="resource"
                        likesObjects={resource.likes}
                        resourceId={resource.id}
                      />
                      <a href="#addAComment" className="m-auto">
                        <span className="text-6xl ">&#9993;</span>
                      </a>
                      <span
                        className={
                          shareState
                            ? "text-xl m-auto"
                            : "text-6xl pl-2 cursor-pointer m-auto"
                        }
                        onClick={() => {
                          setShare(true);
                          navigator.clipboard.writeText(
                            location.origin + router.asPath
                          );
                        }}
                      >
                        {shareState ? (
                          <span>{t("resources.info.link")}</span>
                        ) : (
                          <span>&#8683;</span>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="m-auto">
                    <FileDownloadComponent fileName={resource.filePath} />
                  </div>
                </div>
              </section>
            </div>

            <section className="mt-10">
              <Comments
                object="resource"
                commentsProp={resource.comments}
                resourceId={resource.id}
                generation={0}
              ></Comments>
            </section>
            <section>
              <section className="w-1/4 m-auto flex " id="addAComment">
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
            </section>
          </>
        ) : (
          <p className="flex justify-center">{t("loading")}</p>
        )}
      </main>
      {profile && <Footer />}
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
