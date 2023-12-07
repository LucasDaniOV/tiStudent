import Comments from "@/components/comments/Comments";
import Header from "@/components/header";
import ResourceInfo from "@/components/resources/ResourceInfo";
import CommentService from "@/services/CommentService";
import ProfileService from "@/services/ProfileService";
import ResourceService from "@/services/ResourceService";
import { Profile, Resource } from "@/types/index";
import { getToken } from "@/util/token";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

const ReadResourceById = () => {
  const [resource, setResource] = useState<Resource>();
  const [profile, setProfile] = useState<Profile>();
  const [commentMessage, setMessage] = useState<string>("");
  const router = useRouter();
  const { resourceId } = router.query;

  const getResourceById = async () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (!loggedInUser) return;
    const [resourceResponse, profileResponse] = await Promise.all([
      ResourceService.getResourceById(resourceId as string),
      ProfileService.getProfileById(JSON.parse(loggedInUser).id),
    ]);
    setResource(resourceResponse);
    setProfile(profileResponse.data);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    console.log(profile);

    e.preventDefault();
    if (!profile) return;
    if (!resource) return;
    const com = await CommentService.writeCommentOnResource(
      profile.id,
      resource.id,
      commentMessage
    );
    router.reload();
  };

  useEffect(() => {
    if (resourceId) getResourceById();
  }, [resourceId]);

  return (
    <>
      <Head>
        <title>Resource info</title>
      </Head>
      <Header current="resources" />
      <main>
        {!resourceId && <p>Loading</p>}
        <section className="w-1/2 m-auto">
          <ResourceInfo resource={resource as Resource}></ResourceInfo>
        </section>
        <section className="mt-10">
          {resource && <Comments id={resource.id} object="resource"></Comments>}
        </section>
        <section>
          {resource && (
            <section className="w-1/4 m-auto flex ">
              <h3 className="mt-10 mr-10">Add a comment</h3>
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col mt-10"
              >
                <label htmlFor="message">Message</label>
                <input
                  type="text"
                  id="message"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="m-10 bg-gray-700 hover:bg-gray-400"
                >
                  Submit
                </button>
              </form>
            </section>
          )}
        </section>
      </main>
    </>
  );
};

export default ReadResourceById;
