import LikeService from "@/services/LikeService";
import ProfileService from "@/services/ProfileService";
import ResourceService from "@/services/ResourceService";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  object: "resource" | "comment";
};

const Likes: React.FC<Props> = ({ id, object }: Props) => {
  const [likes, setLikes] = useState<number>(0);
  const [clicked, setClicked] = useState<"up" | undefined>(undefined);
  const [profileId, setProfileId] = useState<string>();

  const getProfileId = () => {
    const logged = sessionStorage.getItem("loggedInUser");
    if (logged) {
      setProfileId(JSON.parse(logged).id);
    }
  };
  const getLikesOnResource = async () => {
    const likes = await LikeService.getAllLikesOnResource(id);
    setLikes(likes.data);
  };
  const getLikesOnComment = async () => {
    const likes = await LikeService.getAllLikesOnComment(id);
    setLikes(likes.data);
  };
  useEffect(() => {
    if (object == "resource") {
      getLikesOnResource();
    } else {
      getLikesOnComment();
    }
    getProfileId();
  }, []);

  const updateLikes = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (!profileId) return;
    if (clicked == "up") {
      setLikes(likes - 1);
      setClicked(undefined);
    } else {
      setLikes(likes + 1);
      setClicked("up");
      if (object == "resource") {
        await LikeService.likeResource(profileId, id);
      } else {
        await LikeService.likeComment(profileId, id);
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
