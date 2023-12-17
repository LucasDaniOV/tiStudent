import { Comment } from "@/types";
import React from "react";

type Props = {
  comment: Comment | undefined;
};

const CommentInfo: React.FC<Props> = ({ comment }: Props) => {
  return (
    <>
      {comment && (
        <>
          <h1>
            {comment.message} - {comment.profile.username}
          </h1>
        </>
      )}
    </>
  );
};

export default CommentInfo;
