import { Like } from "@/types";
import { getToken } from "@/util/token";
import ProfileService from "./ProfileService";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/like";

const getAllLikesOnResource = async (resourceId: string) => {
  const token = getToken();
  const res = await fetch(baseUrl + "/resource/" + resourceId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

const getAllLikesOnComment = async (commentId: string) => {
  const token = getToken();
  const res = await fetch(baseUrl + "/comment/" + commentId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

const likeResource = async (profileId: string, resourceId: string) => {
  const token = getToken();
  const res = await fetch(baseUrl + `/${profileId}/resource/${resourceId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};
const likeComment = async (
  profileId: string,
  resourceId: string,
  commentId: string
) => {
  const token = getToken();
  const res = await fetch(
    baseUrl + `/${profileId}/resource/${resourceId}/comment/${commentId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await res.json();
};

const unLike = async (
  object: "resource" | "comment",
  objectId: string,
  profileId: string
) => {
  const token = getToken();
  let likeId = "";
  const likes = await ProfileService.getLikesByProfile(profileId);
  if (object == "resource") {
    const like = likes.find(
      (l) => l.comment == null && l.resource.id == objectId
    );
    if (like) likeId = like?.id;
  } else {
    const like = likes.find(
      (l) => l.comment !== null && l.comment!.id == objectId
    );
    if (like) likeId = like?.id;
  }
  const res = await fetch(baseUrl + `/${profileId}/${likeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

const LikeService = {
  getAllLikesOnResource,
  getAllLikesOnComment,
  likeResource,
  likeComment,
  unLike,
};

export default LikeService;
