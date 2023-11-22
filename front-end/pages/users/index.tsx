import Header from "@/components/header";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import UsersOverviewTable from "../../components/users/UsersOverviewTable";
import UserService from "../../services/UserService";
import { User } from "../../types";

const Users: React.FC = () => {
  const [users, setUsers] = useState<Array<User>>();
  const [authorized, setAuthorized] = useState<boolean>(false);

  const getUsers = async () => {
    const res = await UserService.getAllUsers();
    if (res.status === "unauthorized") {
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
        <title>Users</title>
      </Head>
      <Header />
      <main>
        <h1>Users</h1>
        {authorized ? (<UsersOverviewTable users={users!}/>) : (<p>You are not authorized to view this page. Please login first.</p>)}
      </main>
    </>
  );
};

export default Users;
