import Header from "@/components/header";
import ResourceService from "@/services/ResourceService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Resource } from "@/types/index";
import ResourceInfo from "@/components/resources/ResourceInfo";

const ReadResourceById = () => {
  const [resource, setResource] = useState<Resource>();

  const router = useRouter();
  const { resourceId } = router.query;

  const getResourceById = async () => {
    const [resourceResponse] = await Promise.all([
      ResourceService.getResourceById(resourceId as string),
    ]);
    const [resource] = await Promise.all([resourceResponse.json()]);
    setResource(resource);
  };

  useEffect(() => {
    if (resourceId) getResourceById();
  });

  return (
    <>
      <Head>
        <title>Resource info</title>
      </Head>
      <Header />
      <main>
        <h1>Info about Resource {resource && resource.id}</h1>
        {!resourceId && <p>Loading</p>}
        <section>
          <ResourceInfo resource={resource as Resource}></ResourceInfo>
        </section>
      </main>
    </>
  );
};

export default ReadResourceById;
