import CommentInfo from "@/components/comments/CommentInfo";
import Comments from "@/components/comments/Comments";
import Header from "@/components/header";
import CommentService from "@/services/CommentService";
import { Comment, Profile, StatusMessage } from "@/types/index";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

const ReadCommentById = () => {
  const [profile, setProfile] = useState<Profile>();
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
    if (!parent || !comment || !profile) return false;
    const res = await CommentService.writeComment(
      String(profile.id),
      String(comment.resource.id),
      String(parent.id),
      commentMessage
    );
    console.log(res);

    const message = res.message;
    const type = res.status;
    setStatusMessages([{ message, type }]);
  };

  const getCommentById = async () => {
    const commentResponse = await CommentService.getCommentById(
      String(commentId)
    );
    setComment(commentResponse);
    if (commentResponse.parentId) {
      const parent = await CommentService.getCommentById(
        commentResponse.parentId
      );
      setParent(parent);
    } else {
      setParent(commentResponse);
    }
  };

  useEffect(() => {
    if (commentId) getCommentById();
    const profile = sessionStorage.getItem("loggedInProfile");
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
      <Header />
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
          {profile && !parent?.parentId && (
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
