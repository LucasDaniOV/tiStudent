import Header from "@/components/header";
import ResourceService from "@/services/ResourceService";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { Comment, Profile, StatusMessage } from "@/types/index";
import CommentInfo from "@/components/comments/CommentInfo";
import Comments from "@/components/comments/Comments";
import ProfileService from "@/services/ProfileService";

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
    const res = await ProfileService.writeComment(
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
    const [commentResponse] = await Promise.all([
      ProfileService.getCommentById(String(commentId)),
    ]);
    setComment(commentResponse);
    if (commentResponse.parent) {
      setParent(commentResponse.parent);
    }
    setParent(commentResponse);
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
          {parent && (
            <>
              <CommentInfo comment={parent}></CommentInfo>
              <Comments id={String(commentId)} object="comment"></Comments>
              {}
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
