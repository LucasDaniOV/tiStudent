import Header from "@/components/header";
import UserService from "@/services/UserService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "@/types";
import UserInfo from "@/components/users/UserInfo";

const ReadUserById = () => {
  const [user, setUser] = useState<User>();

  const router = useRouter();
  const { userId } = router.query;

  const getUserById = async () => {
    const [userResponse] = await Promise.all([
      UserService.getUserById(userId as string),
    ]);
    const [user] = await Promise.all([userResponse]);
    setUser(user);
  };

  useEffect(() => {
    if (userId) getUserById();
  });

  return (
    <>
      <Head>
        <title>User info</title>
      </Head>
      <Header />
      <main>
        <h1>Info about user {user && user.id}</h1>
        {!userId && <p>Loading</p>}
        <section>
          <UserInfo user={user as User}></UserInfo>
        </section>
      </main>
    </>
  );
};

export default ReadUserById;
