import CommentService from "@/services/CommentService";
import LikeService from "@/services/LikeService";
import { Like } from "@/types";
import { useEffect, useState } from "react";

type Props = {
  profileId: string;
  object: "resource" | "comment";
  likesObjects: Like[];
  commentId?: string;
  resourceId: string;
};

const Likes: React.FC<Props> = ({
  profileId,
  object,
  likesObjects,
  commentId,
  resourceId,
}: Props) => {
  const [clicked, setClicked] = useState<"up" | undefined>(undefined);
  const [likes, setLikes] = useState<number>(0);
  const getLikes = async () => {
    if (object == "resource") {
      setLikes(likesObjects.length);
      const likers = likesObjects.map((l: Like) => l.profileId);
      if (likers.includes(profileId)) {
        setClicked("up");
      }
    } else {
      setLikes(likesObjects.length);
      const likers = likesObjects.map((l: Like) => l.profileId);
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
        await LikeService.unLike("resource", resourceId, profileId);
      } else {
        await LikeService.unLike("comment", commentId!, profileId);
      }
      setClicked(undefined);
      //remove like
    } else {
      setLikes(likes + 1);
      setClicked("up");
      if (object == "resource") {
        await LikeService.likeResource(profileId, resourceId);
      } else {
        await LikeService.likeComment(profileId, commentId!);
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
