import CommentService from "@/services/CommentService";
import ProfileService from "@/services/ProfileService";
import { Resource } from "@/types";
import { Profile } from "@/types/index";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import FileDownloadComponent from "../FileDownloadComponent";
import Comments from "../comments/Comments";
import Likes from "../likes/likes";
import ResourceInfo from "./ResourceInfo";

type Props = {
  resource: Resource;
  creator: Profile;
  image: string;
};

const ResourceID: React.FC<Props> = ({ resource, creator, image }: Props) => {
  const { t } = useTranslation();
  const [commentMessage, setMessage] = useState<string>("");
  const [shareState, setShare] = useState<boolean>(false);
  const router = useRouter();

  const getProfile = async () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (!loggedInUser) return;
    const profileResponse = await ProfileService.getProfileById(JSON.parse(loggedInUser).id);
    return profileResponse.profile;
  };

  const { data: profile, isLoading: profileLoading, error: profileError } = useSWR("profile", getProfile);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!profile) return;
    if (!resource) return;
    if (!commentMessage) return;
    await CommentService.writeCommentOnResource(profile.id, resource.id, commentMessage);
  };

  useInterval(() => {
    mutate("profile", getProfile());
  }, 5000);

  return profileLoading ? (
    <p>{t("loading")}</p>
  ) : resource && profile ? (
    <>
      <div className="flex flex-row">
        <section className="grid grid-cols-3 w-screen m-auto">
          <>
            <div className="col-span-1 flex justify-center">
              {image && <Image src={image} width={150} height={100} alt="Thumbnail" />}
            </div>
            <div className="col-span-2">
              <ResourceInfo resource={resource as Resource} />
            </div>
            <div className="col-start-2 ml-5">
              {t("resources.fields.description")}: {resource.description}
            </div>
            <div className="flex justify-center" onClick={() => router.push("../../profiles/" + resource.profileId)}>
              {t("resources.fields.creator")}:
              <span className="hover:cursor-pointer hover:text-red-600 ml-1">{creator?.username}</span>
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
                  className={shareState ? "text-xl m-auto" : "text-6xl pl-2 cursor-pointer m-auto"}
                  onClick={() => {
                    setShare(true);
                    navigator.clipboard.writeText(location.origin + router.asPath);
                  }}
                >
                  {shareState ? <span>{t("resources.info.link")}</span> : <span>&#8683;</span>}
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
        <Comments object="resource" commentsProp={resource.comments} resourceId={resource.id} generation={0}></Comments>
      </section>
      <section>
        <section className="w-1/4 m-auto flex " id="addAComment">
          <h3 className="mt-10 mr-10">{t("resources.comment.add")}</h3>
          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col mt-10">
            <label htmlFor="message">{t("resources.comment.message")}</label>
            <input type="text" id="message" onChange={(e) => setMessage(e.target.value)} />
            <button type="submit" className="m-10 bg-gray-700 hover:bg-gray-400">
              {t("resources.comment.submit")}
            </button>
          </form>
        </section>
      </section>
    </>
  ) : (
    <p className="flex justify-center">{t("loading")}</p>
  );
};
export default ResourceID;
