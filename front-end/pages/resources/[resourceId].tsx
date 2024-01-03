import FileDownloadComponent from "@/components/FileDownloadComponent";
import Header from "@/components/Header";
import Comments from "@/components/comments/Comments";
import Likes from "@/components/likes/likes";
import ResourceInfo from "@/components/resources/ResourceInfo";
import CommentService from "@/services/CommentService";
import ProfileService from "@/services/ProfileService";
import ResourceService from "@/services/ResourceService";
import { Category, Profile, Resource, Subject } from "@/types/index";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

const ReadResourceById = () => {
  const { t } = useTranslation();
  const [resource, setResource] = useState<Resource>();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [creator, setCreator] = useState<Profile>();
  const [profile, setProfile] = useState<Profile>();
  const [commentMessage, setMessage] = useState<string>("");
  const [shareState, setShare] = useState<boolean>(false);
  const router = useRouter();
  const { resourceId } = router.query;
  const [image, setImage] = useState<string>("");

  const getResourceById = async () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (!loggedInUser) return;
    const [resourceResponse, profileResponse] = await Promise.all([
      ResourceService.getResourceById(resourceId as string),
      ProfileService.getProfileById(JSON.parse(loggedInUser).id),
    ]);
    setResource(resourceResponse);
    setProfile(profileResponse.profile);
    const img = await import("../../../backend/uploads/" + resourceResponse.thumbNail);
    console.log("img");
    setImage(img);
  };

  const getSubjects = async () => {
    const response = await ResourceService.getSubjectsByResourceId(
      resourceId as string
    );
    setSubjects(response);
  };

  const getCategories = async () => {
    const response = await ResourceService.getCategoriesByResourceId(
      resourceId as string
    );
    setCategories(response);
  };

  const getCreator = async (profileId: string) => {
    const response = await ProfileService.getProfileById(profileId);
    setCreator(response.profile);
  };

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
    router.reload();
  };

  useEffect(() => {
    if (resourceId && !resource) {
      getResourceById();
      getSubjects();
      getCategories();
    }
    if (!creator && resource && resource.profileId)
      getCreator(resource.profileId as string);
  }, [resourceId, resource, profile]);
  console.log(subjects);

  return (
    <>
      <Head>
        <title>{t("resources.info.title")}</title>
      </Head>
      <Header current="resources" />
      <main>
        {profile ? (
          <>
            {!resourceId && <p>{t("loading")}</p>}
            <div className="flex flex-row">
              <section className="grid grid-cols-3 w-screen m-auto">
                <>
                  {resource && (
                    <div className="col-span-1 flex justify-center">
                      <Image
                        src={image}
                        width={150}
                        height={100}
                        alt="Thumbnail"
                      />
                    </div>
                  )}
                  {resource && profile && categories && subjects && creator && (
                    <div className="col-span-2">
                      <ResourceInfo
                        resource={resource as Resource}
                        subjects={subjects}
                        categories={categories}
                      />
                    </div>
                  )}
                  {resource && (
                    <>
                      <div className="col-start-2 ml-5">
                        Description: {resource.description}
                      </div>
                      <div
                        className="flex justify-center"
                        onClick={() =>
                          router.push("../../profiles/" + resource.profileId)
                        }
                      >
                        Creator:{" "}
                        <span className="hover:cursor-pointer hover:text-red-600 ml-1">
                          {creator?.username}
                        </span>
                      </div>
                    </>
                  )}
                  {resource && profile && (
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
                                "http://localhost:8000" + router.asPath
                              );
                            }}
                          >
                            {shareState ? (
                              <span>Link copied</span>
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
                  )}
                </>
              </section>
            </div>
            <section className="mt-10">
              {resource && (
                <Comments
                  object="resource"
                  commentsProp={resource.comments}
                  resourceId={resource.id}
                ></Comments>
              )}
            </section>
            <section>
              {resource && (
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
              )}
            </section>
          </>
        ) : (
          <p>{t("authorization.error")}</p>
        )}
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
