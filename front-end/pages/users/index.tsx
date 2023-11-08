import Head from "next/head";
import UsersOverviewTable from "../../components/users/UsersOverviewTable";
import { useState, useEffect } from "react";
import { User } from "../../types";
import Header from "@/components/header";
import UserService from "../../services/UserService";
import React from "react";
import UserCreateForm from "@/components/users/UserCreateForm";

const Users: React.FC = () => {
  const [users, setUsers] = useState<Array<User>>();

  const getUsers = async () => {
    const users = await UserService.getAllUsers();
    return setUsers(users);
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
        <h1>Create new user</h1>
        <section><UserCreateForm /></section>
      </main>
    </>
  );
};

export default Users;
