import Header from "@/components/header";
import UserService from "@/services/UserService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "@/types";
import { getToken } from "@/util/token";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const DeleteUserById = () => {
  const { t } = useTranslation();
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
        <title>{t("users.deleted.title")}</title>
      </Head>
      <Header current="users" />
      <main>
        <h1>
          {t("users.deleted.message")} {user && userId}
        </h1>
        {!userId && <p>{t("users.loading")}</p>}
      </main>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default DeleteUserById;
