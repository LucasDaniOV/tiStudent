import { Comment } from "@/types";
import { getToken } from "@/util/token";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/comments";

// const getCommentsOnComment = async (
//   id: string
//   // token: string
// ): Promise<Comment[]> => {
//   const token = getToken();
//   const comments = await fetch(baseUrl + `/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return await comments.json();
// };

const getCommentById = async (
  commentId: string
  // token: string
) => {
  const token = getToken();
  const comment = await fetch(baseUrl + `/${commentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await comment.json();
};

const writeCommentOnComment = async (
  profileId: string,
  resourceId: string,
  commentId: string,
  message: string,
  token: string
) => {
  const comment = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      profileId,
      resourceId,
      message,
      parentId: commentId,
    }),
  });
  return await comment.json();
};

const writeCommentOnResource = async (
  profileId: string,
  resourceId: string,
  message: string
) => {
  const token = getToken();
  const comment = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      profileId,
      resourceId,
      message,
    }),
  });
  return await comment.json();
};

const getChildrenByCommentId = async (commentId: string) => {
  const token = getToken();
  const comments = await fetch(baseUrl + `/${commentId}/children`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await comments.json();
};

const deleteComment = async (
  comment: Comment,
  token: string
): Promise<Boolean> => {
  const res = await fetch(baseUrl + `/${comment.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

const CommentService = {
  // getCommentsOnComment,
  getCommentById,
  writeCommentOnComment,
  writeCommentOnResource,
  deleteComment,
  getChildrenByCommentId,
};

export default CommentService;
