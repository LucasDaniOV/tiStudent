import ResourceService from "@/services/ResourceService";
import React, { useState, useEffect } from "react";
import CommentInfo from "./CommentInfo";
import { Comment } from "@/types";
import { useRouter } from "next/router";
import ProfileService from "@/services/ProfileService";

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
        if (object == "resource") {
          const comments = await ResourceService.getCommentsOnResource(id);
          setComments(comments);
        } else {
          const comments = await ResourceService.getCommentsOnComment(id);
          setComments(comments);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [id]);
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    comment: Comment
  ): Promise<void> => {
    const profileObject = sessionStorage.getItem("loggedInProfile");
    if (!profileObject) return;
    const profile = JSON.parse(profileObject);
    if (profile.id === comment.profile.id) {
      e.stopPropagation();
      e.preventDefault();
      if (
        !confirm(
          `Are you sure you want to delete this comment? (${comment.message})`
        )
      )
        return;
      await ProfileService.deleteComment(comment);
      router.reload();
    } else {
      alert("You are not the creator of this comment");
    }
  };

  return (
    <>
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
              onClick={() =>
                router.push("/resources/comments/" + String(com.id))
              }
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
                <button onClick={(e) => handleDelete(e, com)}>&times;</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Comments;
