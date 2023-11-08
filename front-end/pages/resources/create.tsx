import Header from "@/components/header";
import ResourceCreateForm from "@/components/resources/ResourceCreateForm";
import Head from "next/head";
import React from "react";

const CreateResource: React.FC = () => {
  return (
    <>
      <Head>
        <title>Create Resource</title>
      </Head>
      <Header />
      <main>
        <section>
          <ResourceCreateForm />
        </section>
      </main>
    </>
  );
};

export default CreateResource;