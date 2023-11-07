import Header from "@/components/header";
import ResourceService from "@/services/ResourceService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Comment } from "@/types/index";
import CommentInfo from "@/components/comments/CommentInfo";
import Comments from "@/components/comments/Comments";
import ProfileService from "@/services/ProfileService";

const ReadCommentById = () => {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    setUser(sessionStorage.getItem("loggedInUser"));
  }, []);
  const [comment, setcomment] = useState<Comment>();

  const router = useRouter();
  const { commentId } = router.query;

  const getCommentById = async () => {
    const [commentResponse] = await Promise.all([
      ProfileService.getCommentById(commentId as string),
    ]);
    const [resource] = await Promise.all([commentResponse]);
    setcomment(resource);
  };

  useEffect(() => {
    if (commentId) getCommentById();
  });
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
              <h1>
                {comment.message} - {comment.profile.username}
              </h1>
              <Comments id={String(commentId)} object="comment"></Comments>
              {}
              <h3>Add a comment</h3>
              <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="message">Message</label>
              </form>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default ReadCommentById;
