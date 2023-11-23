import Header from "@/components/header";
import ProfilesOverviewTable from "@/components/profiles/ProfilesOverviewTable";
import { Profile } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import { mutate } from "swr";
import useInterval from "use-interval";
import ProfileService from "../../services/ProfileService";

const Profiles: React.FC = () => {
  const [profiles, setProfiles] = useState<Array<Profile>>();
  const [authorized, setAuthorized] = useState<boolean>(false);

  const getProfiles = async () => {
    const response = await ProfileService.getAllProfiles();
    console.log(response);

    if (response.status === "unauthorized" || response.status === "error") {
      setAuthorized(false);
      return;
    }
    setAuthorized(true);
    return setProfiles(response);
  };

  useInterval(() => {
    mutate("profiles", getProfiles());
  }, 5000);

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <>
      <Head>
        <title>Profiles</title>
      </Head>
      <Header />
      <main>
        <h1>Profiles</h1>
        <section>
          {authorized ? (
            profiles && <ProfilesOverviewTable profiles={profiles} />
          ) : (
            <p>You are not authorized to view this page. Please login first.</p>
          )}
        </section>
      </main>
    </>
  );
};

export default Profiles;
