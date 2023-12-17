import CommentService from "@/services/CommentService";
import LikeService from "@/services/LikeService";
import { Like } from "@/types";
import { useEffect, useState } from "react";

type Props = {
  profileId: string;
  id: string;
  object: "resource" | "comment";
};

const Likes: React.FC<Props> = ({ profileId, id, object }: Props) => {
  const [clicked, setClicked] = useState<"up" | undefined>(undefined);
  const [likes, setLikes] = useState<number>(0);
  const getLikes = async () => {
    if (object == "resource") {
      const resourceLikes = await LikeService.getAllLikesOnResource(id);
      setLikes(resourceLikes.data.length);
      const likers = resourceLikes.data.map((l: Like) => l.profile.id);
      if (likers.includes(profileId)) {
        setClicked("up");
      }
    } else {
      const commentLikes = await LikeService.getAllLikesOnComment(id);
      setLikes(commentLikes.data.length);
      const likers = commentLikes.data.map((l: Like) => l.profile.id);
      if (likers.includes(profileId)) {
        setClicked("up");
      }
    }
  };

  useEffect(() => {
    getLikes();
  }, [profileId]);

  const updateLikes = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (clicked == "up") {
      setLikes(likes - 1);
      if (object == "resource") {
        await LikeService.unLike("resource", id, profileId);
      } else {
        await LikeService.unLike("comment", id, profileId);
      }
      setClicked(undefined);
      //remove like
    } else {
      console.log("up");
      setLikes(likes + 1);
      setClicked("up");
      if (object == "resource") {
        await LikeService.likeResource(profileId, id);
      } else {
        const comment = await CommentService.getCommentById(id);
        const resourceId = comment.resource.id;
        await LikeService.likeComment(profileId, resourceId, id);
      }
    }
  };
  return (
    <div className="w-1/4 flex justify-center">
      <a
        className={
          clicked == "up"
            ? "cursor-pointer text-4xl m-2 p-2 text-green-500 bg-gray-900 flex w-max"
            : "cursor-pointer text-4xl m-2 p-2 hover:text-green-500 hover:bg-gray-900 flex w-max"
        }
        onClick={(e) => updateLikes(e)}
      >
        &#x1F44D;<span>{likes}</span>
      </a>
    </div>
  );
};

export default Likes;
