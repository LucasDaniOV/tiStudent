import Head from "next/head";
import ResourcesOverviewTable from "../../components/resources/ResourcesOverviewTable";
import { useState, useEffect } from "react";
import { Resource } from "../../types";
import Header from "@/components/header";
import ResourceService from "../../services/ResourceService";
import React from "react";

const Resources: React.FC = () => {
  const [resources, setResources] = useState<Array<Resource>>();

  const getResources = async () => {
    const response = await ResourceService.getAllResources();
    const fetchedResources = await response.json();
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
      <main>
        <h1>Resources</h1>
        <section>
          {resources && <ResourcesOverviewTable resources={resources} />}
        </section>
      </main>
    </>
  );
};

export default Resources;
