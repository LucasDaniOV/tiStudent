import Header from "@/components/header";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>tiStudent</title>
        <meta name="description" content="tiStudent app" />
        <meta name="viewport" content="width=device-with, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main className={styles.main}>
        <Image
          src="/images/logo.png"
          alt="tiStudent Logo"
          width={250}
          height={250}
          style={{ padding: "1rem" }}
        />
        <span>
          <h1>Welcome!</h1>
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
