import Header from "@/components/header";
import ResourceService from "@/services/ResourceService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Resource } from "@/types/index";
import Link from "next/link";

const DeleteResourceById = () => {
  const [resource, setResource] = useState<Resource>();

  const router = useRouter();
  const { resourceId } = router.query;

  const deleteResourceById = async () => {
    const [resourceResponse] = await Promise.all([
      ResourceService.deleteResourceById(resourceId as string),
    ]);
    const [resource] = await Promise.all([resourceResponse.json()]);
    setResource(resource);
  };

  useEffect(() => {
    if (resourceId) deleteResourceById();
  }, []);

  return (
    <>
      <Head>
        <title>Resource info</title>
      </Head>
      <Header />
      <main>
        <h1>Resource with id {resource && resourceId} was removed</h1>
        {!resourceId && <p>Loading</p>}
        <Link href="/resources">Go back</Link>
      </main>
    </>
  );
};

export default DeleteResourceById;
