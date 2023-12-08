import CommentService from "@/services/CommentService";
import ResourceService from "@/services/ResourceService";
import { Comment, Profile } from "@/types";
import { getToken } from "@/util/token";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CommentInfo from "./CommentInfo";
import Link from "next/link";
import ProfileService from "@/services/ProfileService";
import LikeService from "@/services/LikeService";
import Likes from "../likes/likes";

type Props = {
  id: string;
  object: "resource" | "comment";
};

const Comments: React.FC<Props> = ({ id, object }: Props) => {
  const [profile, setProfile] = useState<Profile>();
  const [role, setRole] = useState<string>("");
  const [commentsOnResource, setComments] = useState<Array<Comment>>([]);
  const [subcommentsVisibility, setSubcommentsVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const [optionsVisibility, setOptionsVisibility] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleVisibility = (commentId: string) => {
    setSubcommentsVisibility((prevVisibility) => ({
      ...prevVisibility,
      [commentId]: !prevVisibility[commentId],
    }));
  };
  const toggleOptionsVisibility = (commentId: string) => {
    setOptionsVisibility((prevVisibility) => ({
      ...prevVisibility,
      [commentId]: !prevVisibility[commentId],
    }));
  };
  const router = useRouter();
  const token = getToken();
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
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        if (!loggedInUser) return;
        const profileResponse = await ProfileService.getProfileById(
          JSON.parse(loggedInUser).id
        );
        setProfile(profileResponse.data);
        setRole(JSON.parse(loggedInUser).role);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, []);
  const handleDelete = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    comment: Comment
  ): Promise<void> => {
    e.stopPropagation();
    e.preventDefault();
    const commentProfile = await ProfileService.getProfileById(
      String(comment.profile.id)
    );
    if (profile?.id === commentProfile.id || role == "admin") {
      if (
        !confirm(
          `Are you sure you want to delete this comment? (${comment.message})`
        )
      )
        return;
      await CommentService.deleteComment(comment, token);
      router.reload();
    } else {
      alert("You are not the creator of this comment");
    }
  };

  const handleComment = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    parentComment: Comment
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const message = prompt("Your message:");
    if (!message) return;
    const token = getToken();
    if (!profile) return;
    const comment = await CommentService.writeCommentOnComment(
      profile.id,
      parentComment.resource.id,
      parentComment.id,
      message,
      token
    );
    // router.reload(); // current solution to render newly created comment
  };

  return (
    <>
      {commentsOnResource.length > 0 && profile ? (
        <ul
          className={
            object == "comment"
              ? "bg-gray-500 pb-10 pt-10"
              : "bg-gray-400 pb-10 pt-10"
          }
        >
          {commentsOnResource.map((com, index) => {
            return (
              <li key={index}>
                <div
                  className={
                    object == "comment"
                      ? "grid-cols-4 grid justify-between w-10/12 m-auto text-center"
                      : "grid-cols-5 grid justify-between w-10/12 m-auto text-center"
                  }
                >
                  <Likes id={com.id} object="comment" />
                  <span
                    className={
                      object == "comment"
                        ? "p-1 bg-gray-400 text-gray-700 flex items-center justify-center"
                        : "p-1 bg-gray-200 text-gray-700 flex items-center justify-center"
                    }
                  >
                    {com.message}
                  </span>
                  <span
                    className={
                      object == "comment"
                        ? "p-1 bg-gray-400 text-gray-700 flex items-center justify-center"
                        : "p-1 bg-gray-200 text-gray-700 flex items-center justify-center"
                    }
                  >
                    - {com.profile.username}
                  </span>
                  {!com.parentId && (
                    <a
                      className="flex items-center justify-center hover:bg-gray-600"
                      onClick={(e) => {
                        handleComment(e, com);
                      }}
                    >
                      Reply
                    </a>
                  )}
                  {(profile.id == com.profile.id || role == "admin") &&
                  !optionsVisibility[com.id] ? (
                    <a
                      className="float-right cursor-pointer p-1 pr-2 text-gray-600 hover:bg-gray-700 hover:text-white  flex items-center justify-center"
                      onClick={() => toggleOptionsVisibility(com.id)}
                    >
                      &#8942;
                    </a>
                  ) : (
                    <div className="flex items-center bg-gray-600 m-auto">
                      <a
                        className="p-1 cursor-pointer border-2 border-transparent hover:border-2 hover:border-white"
                        onClick={() => alert("not yet implemented")}
                      >
                        Edit
                      </a>

                      <a
                        className="p-1 cursor-pointer border-2 border-transparent hover:border-2 hover:border-white"
                        onClick={(e) => handleDelete(e, com)}
                      >
                        Delete
                      </a>

                      <a
                        onClick={() => toggleOptionsVisibility(com.id)}
                        className="cursor-pointer hover:bg-red-600 p-1 border-transparent border-2 hover:border-red-600 hover:border-2"
                      >
                        Close
                      </a>
                    </div>
                  )}
                  {!com.parentId && (
                    <button
                      onClick={() => {
                        toggleVisibility(com.id);
                      }}
                      className={
                        subcommentsVisibility[com.id]
                          ? "bg-gray-500 col-span-5 text-gray-700 hover:text-gray-300 pb-5"
                          : "hover:bg-gray-500 col-span-5 text-gray-700 hover:text-gray-300 pb-5"
                      }
                    >
                      {subcommentsVisibility[com.id] ? "Hide" : "Show"} replies
                    </button>
                  )}
                </div>
                {!com.parentId && subcommentsVisibility[com.id] && (
                  <Comments id={com.id} object="comment" />
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <h1 className="w-1/2 m-auto text-center">There are no comments</h1>
      )}
    </>
  );
};

export default Comments;
