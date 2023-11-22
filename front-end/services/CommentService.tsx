import { Comment } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/comments";

const getCommentsOnComment = async (id: string): Promise<Comment[]> => {
  const comments = await fetch(baseUrl + `/${id}/comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await comments.json();
};

const getCommentById = async (commentId: string): Promise<Comment> => {
  const comment = await fetch(baseUrl + `/comments/${commentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await comment.json();
};

const writeComment = async (
  profileId: string,
  resourceId: string,
  commentId: string,
  message: string
) => {
  const comment = await fetch(
    baseUrl + `/${profileId}/${resourceId}/${commentId}?message=${message}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await comment.json();
};

const deleteComment = async (comment: Comment): Promise<Boolean> => {
  const res = await fetch(baseUrl + `/${comment.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
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
