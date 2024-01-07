import { Comment } from "@/types";

type Props = {
  comments: Comment[];
};

const CommentsOverview: React.FC<Props> = ({ comments }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      {comments.map((comment) => (
        <div className="p-2 border-2 border-gray-800">
          <div>{comment.profile.username}</div>
          <div>{comment.message}</div>
        </div>
      ))}
    </div>
  );
};

export default CommentsOverview;
