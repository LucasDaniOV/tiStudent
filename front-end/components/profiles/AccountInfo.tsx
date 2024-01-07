import LikeService from "@/services/LikeService";
import ResourceService from "@/services/ResourceService";
import { Profile, Resource } from "@/types";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import defaultPicture from "../../public/images/default-profilePicture.jpg";
import SharedResources from "./SharedResource";

type Props = {
  profile: Profile;
};

const AccountInfo: React.FC<Props> = ({ profile }: Props) => {
  const { t } = useTranslation();
  const [likes, setLikes] = useState<{ [key: string]: number }>({});

  const getResources = async () => {
    const response = await ResourceService.getResourcesByProfile(parseInt(profile.id));
    if (response) {
      const likesPromises = response.resources.map(async (r: Resource) => {
        const likesResponse = await LikeService.getAllLikesOnResource(r.id);
        return { resourceId: r.id, likes: likesResponse.resourceLikes.length };
      });
      const likesResults = await Promise.all(likesPromises);
      const updatedLikes: { [key: string]: number } = {};
      likesResults.forEach((result) => {
        updatedLikes[result.resourceId] = result.likes;
      });

      setLikes(updatedLikes);
      return response.resources;
    }
  };

  const { data, isLoading, error } = useSWR("resources", getResources);
  useInterval(() => {
    mutate("resources", getResources());
  }, 5000);

  return (
    <>
      {isLoading ? (
        <p>{t("loading")}</p>
      ) : (
        profile && (
          <article className="mb-5">
            <div className="grid grid-cols-4 bg-gray-500">
              <div className="flex justify-center m-0 items-center">
                <Image src={defaultPicture} alt={"Profile picture"} width={150} height={150} />
              </div>
              <div className="flex justify-center m-1 items-center">
                <span className={profile.username.replace(" ", "").length > 15 ? " break-all" : ""}>
                  <strong>{t("profiles.fields.username")}: </strong>
                  {profile.username}
                </span>
              </div>
              <div className="flex justify-center m-1 items-center">
                <span className={profile.bio && profile.bio.replace(" ", "").length > 60 ? " break-all" : ""}>
                  <strong>{t("profiles.fields.bio")}:</strong> {profile.bio}
                </span>
              </div>
              <div className="flex justify-center m-1 items-center">
                <span>
                  <strong>{t("resources.info.member")}: </strong>
                  {String(profile.createdAt).split("T")[0]}
                </span>
              </div>
            </div>
            {data && data.length > 0 ? (
              <div className="flex flex-col justify-center">
                <strong className="flex justify-center m-5">
                  {profile.username}
                  {t("profiles.info.uploaded")}:
                </strong>
                <table>
                  <thead>
                    <tr className="grid grid-cols-4">
                      <th className="m-1">{t("resources.fields.thumbnail")}</th>
                      <th className="m-1">{t("resources.fields.title")}</th>
                      <th className="m-1">{t("resources.fields.description")}</th>
                      <th className="m-1">{t("resources.fields.likes")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((resource: Resource) => {
                      return <SharedResources key={resource.id} resource={resource} likes={likes[resource.id]} />;
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="flex justify-center m-5 text-gray-400">{t("profiles.info.nothing")}</p>
            )}
          </article>
        )
      )}
    </>
  );
};

export default AccountInfo;
