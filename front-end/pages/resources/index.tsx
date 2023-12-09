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
      <Header current="resources" />
      <main className="grid grid-cols-4">
        <section className="col-span-3 items-center">
          <h1 className="m-auto text-3xl">Resources</h1>
          {error && <div>{error}</div>}
          {isLoading && <div>Loading...</div>}
          {authorized ? (
            data && <ResourcesOverviewTable resources={data} />
          ) : (
            <p>You are not authorized to view this page. Please login first.</p>
          )}
        </section>
        <section id="addResource" className="col-span-1 m-auto">
          <Link
            href="/resources/create"
            className=" bg-gray-400 p-8 hover:bg-gray-200 hover:text-black text-xl"
          >
            Add a Resource
          </Link>
        </section>
      </main>
    </>
  );
};

export default Resources;
