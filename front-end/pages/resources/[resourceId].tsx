import Header from "@/components/header";
import ResourceService from "@/services/ResourceService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Resource } from "@/types/index";
import ResourceInfo from "@/components/resources/ResourceInfo";
import Comments from "@/components/comments/Comments";

const ReadResourceById = () => {
  const [resource, setResource] = useState<Resource>();

  const router = useRouter();
  const { resourceId } = router.query;

  const getResourceById = async () => {
    const [resourceResponse] = await Promise.all([
      ResourceService.getResourceById(resourceId as string),
    ]);
    setResource(resourceResponse);
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
        {!resourceId && <p>Loading</p>}
        <section>
          <ResourceInfo resource={resource as Resource}></ResourceInfo>
        </section>
        <section>
          {resource && <Comments id={resource.id} object="resource"></Comments>}
        </section>
      </main>
    </>
  );
};

export default ReadResourceById;
