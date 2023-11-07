import Head from "next/head";
import ResourcesOverviewTable from "../../components/resources/ResourcesOverviewTable";
import { useState, useEffect } from "react";
import { Resource } from "../../types";
import Header from "@/components/header";
import ResourceService from "../../services/ResourceService";
import React from "react";
import Link from "next/link";

const Resources: React.FC = () => {
  const [resources, setResources] = useState<Array<Resource>>();

  const getResources = async () => {
    const fetchedResources = await ResourceService.getAllResources();
    return setResources(fetchedResources);
  };

  useEffect(() => {
    getResources();
  }, []);

  return (
    <>
      <Head>
        <title>Resources</title>
      </Head>
      <Header />
      <main className="resourceOverview">
        <section style={{ alignItems: "center" }}>
          <h1 style={{ margin: "auto" }}>Resources</h1>
          {resources && <ResourcesOverviewTable resources={resources} />}
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
