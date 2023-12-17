import Header from "@/components/header";
import UserService from "@/services/UserService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "@/types";
import UserInfo from "@/components/users/UserInfo";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ReadUserById = () => {
  const { t } = useTranslation();
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
        <title>{t("users.info")}</title>
      </Head>
      <Header current="users" />
      <main className="flex flex-col justify-center items-center">
        <h1 className="text-xl">
          {t("users.about")} {user && user.id}
        </h1>
        {!userId && <p>{t("loading")}</p>}
        <section>
          <UserInfo user={user as User}></UserInfo>
        </section>
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

export default ReadUserById;
