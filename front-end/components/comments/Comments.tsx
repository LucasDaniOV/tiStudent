import CommentService from "@/services/CommentService";
import ResourceService from "@/services/ResourceService";
import { Comment } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Props = {
  id: string;
  object: "resource" | "comment";
};

const Comments: React.FC<Props> = ({ id, object }: Props) => {
  const [commentsOnResource, setComments] = useState<Array<Comment>>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (object === "resource") {
          const comments = await ResourceService.getCommentsOnResource(id);
          setComments(comments);
        } else {
          const comments = await CommentService.getCommentsOnComment(id);
          setComments(comments);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, []);
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    comment: Comment
  ): Promise<void> => {
    e.stopPropagation();
    e.preventDefault();
    const profileObject = sessionStorage.getItem("loggedInProfile");
    if (!profileObject) return;
    const profile = JSON.parse(profileObject);
    if (profile.id === comment.profile.id) {
      if (
        !confirm(
          `Are you sure you want to delete this comment? (${comment.message})`
        )
      )
        return;
      await CommentService.deleteComment(comment);
      router.reload();
    } else {
      alert("You are not the creator of this comment");
    }
  };

  return (
    <>
      {commentsOnResource.length > 0 && (
        <table>
          <thead>
            <tr>
              <th scope="col">Message</th>
              <th scope="col">Author</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {commentsOnResource.map((com, index) => (
              <tr
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/resources/comments/" + String(com.id));
                }}
                tabIndex={0}
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") {
                //     func(sub);
                //   }
                // }}
              >
                <td>{com.message}</td>
                <td>{com.profile.username}</td>
                <td>
                  <button
                    onClick={(e) => {
                      handleDelete(e, com);
                    }}
                  >
                    &times;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Comments;
