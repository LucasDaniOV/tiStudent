import Head from "next/head";
import ResourcesOverviewTable from "../../components/resources/ResourcesOverviewTable";
import { useState, useEffect } from "react";
import { Resource } from "../../types";
import Header from "@/components/header";
import ResourceService from "../../services/ResourceService";
import React from "react";
import Link from "next/link";
import useInterval from "use-interval";
import useSWR, { mutate } from "swr";

const Resources: React.FC = () => {
  const [authorized, setAuthorized] = useState<boolean>(false);

  const getResources = async () => {
    const response = await ResourceService.getAllResources();
    if (response.status === "unauthorized" || response.status === "error") {
      setAuthorized(false);
      return;
    }
    setAuthorized(true);
    return response;
  };

  const { data, isLoading, error } = useSWR("resources", getResources);

  useInterval(() => {
    mutate("resources", getResources());
  }, 5000);

  return (
    <>
      <Head>
        <title>Resources</title>
      </Head>
      <Header />
      <main className="resourceOverview">
        <section style={{ alignItems: "center" }}>
          <h1 style={{ margin: "auto" }}>Resources</h1>
          {error && <div>{error}</div>}
          {isLoading && <div>Loading...</div>}
          {authorized ? (
            data && <ResourcesOverviewTable resources={data} />
          ) : (
            <p>You are not authorized to view this page. Please login first.</p>
          )}
        </section>
        <aside>
          {/* {sessionStorage.getItem("loggedInUser")} */}
          <section id="addResource">
            <Link href="/resources/create">Add a Resource</Link>
          </section>
        </aside>
      </main>
    </>
  );
};

export default Resources;
