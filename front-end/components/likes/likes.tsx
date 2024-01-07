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

const Likes: React.FC<Props> = ({ profileId, object, likesObjects, commentId, resourceId }) => {
  const [clicked, setClicked] = useState<"up" | undefined>(undefined);
  const [likes, setLikes] = useState<number>(0);

  const updateLikeStatus = () => {
    const likers = likesObjects.map((l: Like) => l.profileId);
    const isLiked = likers.includes(profileId);
    setLikes(likesObjects.length);
    setClicked(isLiked ? "up" : undefined);
  };

  useEffect(() => {
    updateLikeStatus();
  }, [profileId, likesObjects]);

  const handleLikeAction = async (like: boolean) => {
    if (object === "resource") {
      like
        ? await LikeService.likeResource(profileId, resourceId)
        : await LikeService.unLike("resource", resourceId, profileId);
    } else {
      like
        ? await LikeService.likeComment(profileId, commentId!)
        : await LikeService.unLike("comment", commentId!, profileId);
    }
  };

  const updateLikes = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    const like = clicked !== "up";
    setLikes(like ? likes + 1 : likes - 1);
    setClicked(like ? "up" : undefined);
    await handleLikeAction(like);
  };

  return (
    <div>
      <a
        className={`cursor-pointer text-3xl p-2 text-white flex w-max rounded-xl ${
          clicked === "up" ? "bg-blue-500" : "hover:bg-blue-500 bg-tistudent-blue"
        }`}
        onClick={updateLikes}
      >
        &#x1F44D;<span>{likes}</span>
      </a>
    </div>
  );
};

export default Likes;
