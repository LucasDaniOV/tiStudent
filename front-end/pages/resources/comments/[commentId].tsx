import CommentInfo from "@/components/comments/CommentInfo";
import Comments from "@/components/comments/Comments";
import Header from "@/components/header";
import CommentService from "@/services/CommentService";
import ProfileService from "@/services/ProfileService";
import { Comment, Profile, StatusMessage } from "@/types/index";
import { getToken } from "@/util/token";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

const ReadCommentById = () => {
  const [profile, setProfile] = useState<any>();
  const [parent, setParent] = useState<Comment>();
  const [comment, setComment] = useState<Comment>();
  const [commentMessage, setMessage] = useState<string>("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const router = useRouter();
  const { commentId } = router.query;

  const validate = () => {
    let isValid = true;
    if (!commentMessage.trim()) isValid = false;
    return isValid;
  };

  const createComment = async (commentMessage: string) => {
    if (parent !== comment || !comment || !profile) return false;
    const token = getToken();
    const profileId = await ProfileService.getProfileByEmail(
      profile.email,
      token
    );
    const res = await CommentService.writeComment(
      String(profileId.id),
      String(comment.resource.id),
      String(comment.id),
      commentMessage,
      token
    );

    const message = res.message;
    const type = res.status;
    setStatusMessages([{ message, type }]);
  };

  const getCommentById = async () => {
    // const token = getToken();
    const commentResponse = await CommentService.getCommentById(
      String(commentId)
      // token
    );
    setComment(commentResponse);
    if (commentResponse.parentId) {
      const parent = await CommentService.getCommentById(
        commentResponse.parentId
        // token
      );
      setParent(parent);
    } else {
      setParent(commentResponse);
    }
  };

  useEffect(() => {
    if (commentId) getCommentById();
    const profile = sessionStorage.getItem("loggedInUser");
    if (profile) {
      setProfile(JSON.parse(profile));
    }
  }, [commentId]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setStatusMessages([]);
    if (!validate()) return;
    await createComment(commentMessage);
    router.reload();
  };
  return (
    <>
      <Head>
        <title>comment info</title>
      </Head>
      <Header current="resources" />
      <main>
        {!commentId && <p>Loading</p>}

        <section>
          {comment && (
            <>
              <CommentInfo comment={comment}></CommentInfo>
              {!comment.parentId && (
                <Comments id={String(comment.id)} object="comment"></Comments>
              )}
            </>
          )}
        </section>
        <section>
          {statusMessages && (
            <ul>
              {statusMessages.map((statusMessage, index) => (
                <li key={index}>{statusMessage.message}</li>
              ))}
            </ul>
          )}
          {profile && !comment?.parentId && (
            <>
              <h3>Add a comment</h3>
              <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="message">Message</label>
                <input
                  type="text"
                  id="message"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Submit</button>
              </form>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default ReadCommentById;
