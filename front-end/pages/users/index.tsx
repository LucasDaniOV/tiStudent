import Head from "next/head";
import UsersOverviewTable from "../../components/users/UsersOverviewTable";
import { useState, useEffect } from "react";
import { User } from "../../types";
import Header from "@/components/header";
import UserService from "../../services/UserService";
import React from "react";

const Users: React.FC = () => {
  const [users, setUsers] = useState<Array<User>>();

  const getUsers = async () => {
    const response = await UserService.getAllUsers();
    const fetchedUsers = await response.json();
    return setUsers(fetchedUsers);
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
        <section>{users && <UsersOverviewTable users={users} />}</section>
      </main>
    </>
  );
};

export default Users;
