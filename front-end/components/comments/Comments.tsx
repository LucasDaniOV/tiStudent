import CommentService from "@/services/CommentService";
import ProfileService from "@/services/ProfileService";
import { Comment, Profile } from "@/types";
import { getToken } from "@/util/token";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Likes from "../likes/likes";

type Props = {
  resourceId: string;
  object: "resource" | "comment";
  commentsProp: Comment[];
  generation: number;
  commentId?: string;
};

const Comments: React.FC<Props> = ({ object, commentsProp, resourceId, generation, commentId }: Props) => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<Profile>();
  const [role, setRole] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>(commentsProp);
  const [subcommentsVisibility, setSubcommentsVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const [optionsVisibility, setOptionsVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const [parentComment, setParentComment] = useState<Comment>();
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
    const checkLoggedIn = async () => {
      try {
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        if (!loggedInUser) return;
        const profileResponse = await ProfileService.getProfileById(JSON.parse(loggedInUser).id);
        setProfile(profileResponse.profile);
        setRole(JSON.parse(loggedInUser).role);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    checkLoggedIn();

    if (comments.length === 0 && commentId) {
      const getComments = async () => {
        const response = await CommentService.getChildrenByCommentId(commentId);
        console.log(response.comments);
        setComments(response.comments);
        const parent = await CommentService.getCommentById(commentId);
        setParentComment(parent.comment);
      };
      getComments();
    }
  }, [commentId]);

  const deleteComment = async (comment: Comment) => {
    if (profile?.id === comment.profile?.id || role == "ADMIN") {
      if (confirm(`${t("resources.comment.options.delete.message")}(${comment.message})`))
        await CommentService.deleteComment(comment, token);
      else return;
      router.reload();
    } else {
      alert(t("resources.comment.options.delete.error"));
    }
  };

  const writeComment = async (parentComment: Comment) => {
    try {
      const message = prompt(t("resources.comment.prompt"));
      if (!message) {
        confirm(t("resources.comment.empty"));
        return;
      }
      if (!profile) return;
      const token = getToken();
      await CommentService.writeCommentOnComment(profile.id, resourceId, parentComment.id, message, token);
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, comment: Comment): Promise<void> => {
    e.stopPropagation();
    e.preventDefault();
    if (!profile) return;
    deleteComment(comment);
  };
  const handleComment = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, parentComment: Comment) => {
    try {
      e.stopPropagation();
      e.preventDefault();
      await writeComment(parentComment);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {generation < 3 && comments.length > 0 && profile ? (
        <ul
          className={
            generation === 0
              ? "bg-gray-400 pb-10 pt-10"
              : generation === 1
              ? "bg-gray-500 pb-10 pt-10"
              : "bg-gray-600 pb-10 pt-10"
          }
        >
          {comments.map((com, index) => {
            return (
              <li key={index}>
                <div
                  className={
                    object == "comment"
                      ? "grid-cols-4 grid justify-between w-10/12 m-auto text-center"
                      : "grid-cols-5 grid justify-between w-10/12 m-auto text-center"
                  }
                >
                  <Likes
                    profileId={profile.id}
                    object="comment"
                    likesObjects={com.likes}
                    commentId={com.id}
                    resourceId={resourceId}
                  />
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
                    - {com.profile?.username}
                  </span>
                  {generation < 2 && !com.parentId && (
                    <a
                      className="flex items-center justify-center hover:bg-gray-600"
                      onClick={(e) => {
                        handleComment(e, com);
                      }}
                    >
                      {t("resources.comment.reply")}
                    </a>
                  )}
                  {(profile.id == com.profile?.id || role === "ADMIN" || profile.id == parentComment?.profileId) && //Author of parent comment should be allowed to delete comments
                    (!optionsVisibility[com.id] ? (
                      <a
                        className="text-2xl float-right cursor-pointer p-1 pr-2 text-gray-600 hover:bg-gray-700 hover:text-white  flex items-center justify-center"
                        onClick={() => toggleOptionsVisibility(com.id)}
                      >
                        &#8942;
                      </a>
                    ) : (
                      <div className="flex items-center bg-gray-600 m-auto">
                        {profile.id == com.profile?.id && ( //Only author of comment should be able to edit the comment
                          <a
                            className="p-1 cursor-pointer border-2 border-transparent hover:border-2 hover:border-white"
                            onClick={() => alert(t("resources.comment.options.edit.message"))}
                          >
                            {t("resources.comment.options.edit.title")}
                          </a>
                        )}

                        <a
                          className="p-1 cursor-pointer border-2 border-transparent hover:border-2 hover:border-white "
                          onClick={(e) => handleDelete(e, com)}
                        >
                          {t("resources.comment.options.delete.title")}
                        </a>

                        <a
                          onClick={() => toggleOptionsVisibility(com.id)}
                          className="cursor-pointer hover:bg-red-600 p-1 border-transparent border-2 hover:border-red-600 hover:border-2"
                        >
                          {t("resources.comment.options.close")}
                        </a>
                      </div>
                    ))}
                  {generation < 2 && !com.parentId && (
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
                      {subcommentsVisibility[com.id] ? t("resources.comment.hide") : t("resources.comment.show")}{" "}
                      {t("resources.comment.replies")}
                    </button>
                  )}
                </div>
                {!com.parentId && subcommentsVisibility[com.id] && (
                  <Comments
                    commentId={com.id}
                    object="comment"
                    commentsProp={[]}
                    resourceId={resourceId}
                    generation={generation + 1}
                  />
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <h1 className="w-1/2 m-auto text-center">{t("resources.comment.none")}</h1>
      )}
    </>
  );
};

export default Comments;
