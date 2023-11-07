import ResourceService from "@/services/ResourceService";
import React, { useState, useEffect } from "react";
import CommentInfo from "./CommentInfo";
import { Comment } from "@/types";
import { useRouter } from "next/router";

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
  return (
    <ul id="comments" className="comments">
      {commentsOnResource.map((com, index) => (
        <li
          key={index}
          onClick={() => router.push("/resources/comments/" + String(com.id))}
          tabIndex={0}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter") {
          //     func(sub);
          //   }
          // }}
        >
          {com && `${com.message} - ${com.profile.username}`}
        </li>
      ))}
    </ul>
  );
};

export default Comments;
