import { Like } from "@/types";
import { getToken } from "@/util/token";

const getAllLikesOnResource = async (resourceId: string) => {
  const token = getToken();
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/like/resource/" + resourceId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await res.json();
};

const getAllLikesOnComment = async (commentId: string) => {
  const token = getToken();
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/like/comment/" + commentId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await res.json();
};

const likeResource = async (profileId: string, resourceId: string) => {
  const token = getToken();
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/like/${profileId}/resource/${resourceId}`,
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
const likeComment = async (profileId: string, resourceId: string, commentId: string) => {
  const token = getToken();
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/like/${profileId}/resource/${resourceId}/comment/${commentId}`,
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

const LikeService = {
  getAllLikesOnResource,
  getAllLikesOnComment,
  likeResource,
  likeComment,
};

export default LikeService;
