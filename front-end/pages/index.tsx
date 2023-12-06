import Header from "@/components/header";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import React, { useEffect, useState } from "react";
import UserService from "@/services/UserService";
import ProfileService from "@/services/ProfileService";
import { getToken } from "@/util/token";

const Home: React.FC = () => {
  const [name, setName] = React.useState<string>("");
  const getUser = async () => {
    const user = sessionStorage.getItem("loggedInUser");
    const token = getToken();
    if (user) {
      const profile = await ProfileService.getProfileByEmail(
        JSON.parse(user).email,
        token
      );
      setName(profile.username);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Head>
        <title>tiStudent</title>
        <meta name="description" content="tiStudent app" />
        <meta name="viewport" content="width=device-with, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        // className={styles.main}
        className="flex flex-col items-center justify-center w-max m-auto"
      >
        <Header current="home"></Header>
        <Image
          src="/images/logo.png"
          alt="tiStudent Logo"
          width={250}
          height={250}
          style={{ padding: "1rem" }}
        />
        <span>
          <h1 className="text-3xl font-bold">Welcome {name}!</h1>
        </span>
        <div className={styles.description}>
          <p>
            tiStudent is a platform where you can share academic resources. As a
            user you are able to upload resources of your own, and like and
            comment on resources from other people. <br />
            You can view your liked resources and get an overview of all the
            resources you have shared.
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
