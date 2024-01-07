import { getToken } from "../util/token";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/like";

const getAllLikesOnResource = async (resourceId: string) => {
  const token = getToken();
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/resourceLikes?resourceId=" + resourceId,
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
  const res = await fetch(baseUrl + "/commentLikes/" + commentId, {
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
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/resourcelikes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ profileId, resourceId }),
  });
  return await res.json();
};

const likeComment = async (profileId: string, commentId: string) => {
  const token = getToken();
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/commentlikes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ profileId, commentId }),
  });
  return await res.json();
};

const unLike = async (
  object: "resource" | "comment",
  objectId: string,
  profileId: string
) => {
  const token = getToken();

  if (object === "resource") {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `/resourcelikes?resourceId=${objectId}&profileId=${profileId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await res.json();
  } else if (object === "comment") {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `/commentlikes?commentId=${objectId}&profileId=${profileId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await res.json();
  }
};

const LikeService = {
  getAllLikesOnResource,
  getAllLikesOnComment,
  likeResource,
  likeComment,
  unLike,
};

export default LikeService;
