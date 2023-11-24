import Header from "@/components/header";
import UserService from "@/services/UserService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "@/types";
import { getToken } from "@/util/token";

const DeleteUserById = () => {
  const [user, setUser] = useState<User>();

  const router = useRouter();
  const { userId } = router.query;

  const deleteUserById = async () => {
    const [returnedUser] = await Promise.all([
      UserService.getUserById(userId as string),
    ]);
    const [user] = await Promise.all([returnedUser]);
    setUser(user);
    const token = getToken();
    await UserService.deleteUserById(userId as string, token);
  };

  useEffect(() => {
    if (userId) deleteUserById();
  }, []);

  return (
    <>
      <Head>
        <title>User deleted</title>
      </Head>
      <Header />
      <main>
        <h1>Deleted user with ID: {user && userId}</h1>
        {!userId && <p>Loading</p>}
      </main>
    </>
  );
};

export default DeleteUserById;
