import Header from "@/components/header";
import ResourceService from "@/services/ResourceService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Comment } from "@/types/index";
import Link from "next/link";
import ProfileService from "@/services/ProfileService";

const DeleteCommentById = () => {
  const [Comment, setComment] = useState<Comment>();

  const router = useRouter();
  const { CommentId } = router.query;

  const deleteCommentById = async () => {
    const comment = await ProfileService.getCommentById(String(CommentId));
    await Promise.all([ProfileService.deleteComment(comment)]);
    setComment(comment);
  };

  useEffect(() => {
    if (CommentId) deleteCommentById();
  }, []);

  return (
    <>
      <Head>
        <title>Comment info</title>
      </Head>
      <Header />
      <main>
        <h1>Comment with id {Comment && CommentId} was removed</h1>
        {!CommentId && <p>Loading</p>}
        <Link href="/Comments">Go back</Link>
      </main>
    </>
  );
};

export default DeleteCommentById;
