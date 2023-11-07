import { Comment, Profile } from "@/types";
import React from "react";

type Props = {
  comment: Comment;
};

const CommentInfo: React.FC<Props> = ({ comment }: Props) => {
  return (
    <>
      {comment && (
        //   style={{
        //     display: "flex",
        //     padding: "1rem",
        //     listStyleType: "none",
        //     textDecoration: "none",
        //     borderBottom: "none",
        //   }}
        // >
        <>
          <h1>{comment.message}</h1>
        </>
      )}
    </>
  );
};

export default CommentInfo;
