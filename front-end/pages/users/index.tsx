import Header from "@/components/header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import UsersOverviewTable from "../../components/users/UsersOverviewTable";
import UserService from "../../services/UserService";
import { User } from "../../types";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Users: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<Array<User>>();
  const [authorized, setAuthorized] = useState<boolean>(false);

  const getUsers = async () => {
    const res = await UserService.getAllUsers();
    if (res.status === "unauthorized" || res.status === "error") {
      setAuthorized(false);
      return;
    }
    setAuthorized(true);
    setUsers(res);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Head>
        <title>{t("users.message")}</title>
      </Head>
      <Header current="users" />
      <main>
        <h1 className="text-4xl p-1">{t("users.message")}</h1>
        {authorized ? (
          <UsersOverviewTable users={users!} />
        ) : (
          <p>{t("authorization.error")}</p>
        )}
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

export default Users;
