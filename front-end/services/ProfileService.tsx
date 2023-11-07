import { Comment, Profile } from "../types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/profiles";

const getAllProfiles = async (): Promise<Profile[]> => {
  const res = await fetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const getProfileById = async (profileId: string): Promise<Profile> => {
  const res = await fetch(baseUrl + `/${profileId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const getProfileByEmail = async (email: string): Promise<Profile> => {
  const res = await fetch(baseUrl + `/user/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const deleteProfileById = async (profileId: number): Promise<Boolean> => {
  const res = await fetch(baseUrl + `/${profileId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const deleteComment = async (comment: Comment): Promise<Boolean> => {
  const res = await fetch(
    baseUrl + `/${comment.profile.id}/comment/${comment.id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.json();
};

const createProfile = async (username: string, bio: string, userId: number) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, bio, userId }),
  });
  return res.json();
};

const getCommentById = async (commentId: string) => {
  const comment = await fetch(baseUrl + `/comments/${commentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return comment.json();
};

const writeComment = async (
  profileId: string,
  resourceId: string,
  commentId: string,
  message: string
) => {
  const comment = await fetch(
    baseUrl +
      `/comment-on-comment/${profileId}/${resourceId}/${commentId}?message=${message}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return comment.json();
};

export default {
  getAllProfiles,
  getProfileById,
  getProfileByEmail,
  deleteProfileById,
  createProfile,
  getCommentById,
  writeComment,
  deleteComment,
};
