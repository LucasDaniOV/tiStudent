import ResourceService from "@/services/ResourceService";
import { Profile, Resource } from "@/types";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import LikeService from "@/services/LikeService";
import { useRouter } from "next/router";
import Image from "next/image";
import SharedResources from "./SharedResource";

type Props = {
  profile: Profile;
};

const AccountInfo: React.FC<Props> = ({ profile }: Props) => {
  const { t } = useTranslation();
  const [resources, setResources] = useState<Resource[]>();
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const [profilePicture, setProfilePicture] = useState<string>("");

  const getResources = async () => {
    const response = await ResourceService.getResourcesByProfile(
      parseInt(profile.id)
    );
    const img = await import("../../../backend/uploads/" + profile.picture);
    setProfilePicture(img);

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
      setResources(response.resources);
    }
  };

  useEffect(() => {
    if (profile) getResources();
  }, [profile]);
  return (
    <>
      {profile && (
        <article className="mb-5">
          <div className="grid grid-cols-4 bg-gray-500">
            <div className="flex justify-center m-0 items-center">
              {profilePicture && (
                <Image
                  src={profilePicture}
                  alt={"Profile picture"}
                  width={150}
                  height={150}
                />
              )}
            </div>
            <div className="flex justify-center m-1 items-center">
              <span>
                <strong>{t("profiles.fields.username")}: </strong>{" "}
                {profile.username}
              </span>
            </div>
            <div className="flex justify-center m-1 items-center">
              <span>
                <strong>{t("profiles.fields.bio")}:</strong> {profile.bio}
              </span>
            </div>
            <div className="flex justify-center m-1 items-center">
              <span>
                <strong>{t("profiles.fields.created.at")}:</strong>{" "}
                {String(profile.createdAt).split("T")[0]}
              </span>
            </div>
          </div>
          {resources && resources.length > 0 ? (
            <div className="flex flex-col justify-center">
              <strong className="flex justify-center m-5">
                {profile.username}'s uploaded resources:
              </strong>
              <table>
                <thead>
                  <tr className="grid grid-cols-4">
                    <th className="m-1">Thumbnail</th>
                    <th className="m-1">Title</th>
                    <th className="m-1">Description</th>
                    <th className="m-1">Likes</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map((resource) => {
                    return (
                      <SharedResources
                        resource={resource}
                        likes={likes[resource.id]}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="flex justify-center m-5 text-gray-400">
              This user hasn't shared anything yet
            </p>
          )}
        </article>
      )}
    </>
  );
};

export default AccountInfo;
