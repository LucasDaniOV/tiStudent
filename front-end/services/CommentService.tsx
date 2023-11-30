import { Comment } from "@/types";
import { getToken } from "@/util/token";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/comments";

const getCommentsOnComment = async (
  id: string
  // token: string
): Promise<Comment[]> => {
  const token = getToken();
  const comments = await fetch(baseUrl + `/${id}/comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await comments.json();
};

const getCommentById = async (
  commentId: string
  // token: string
): Promise<Comment> => {
  const token = getToken();
  const comment = await fetch(baseUrl + `/comments/${commentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await comment.json();
};

const writeComment = async (
  profileId: string,
  resourceId: string,
  commentId: string,
  message: string,
  token: string
) => {
  const comment = await fetch(
    baseUrl + `/${profileId}/${resourceId}/${commentId}?message=${message}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await comment.json();
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
  getCommentsOnComment,
  getCommentById,
  writeComment,
  deleteComment,
};

export default CommentService;
