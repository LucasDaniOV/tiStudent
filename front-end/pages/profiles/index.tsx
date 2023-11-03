import Header from "@/components/header";
import ProfilesOverviewTable from "@/components/profiles/ProfilesOverviewTable";
import { Profile } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import ProfileService from "../../services/ProfileService";
import ProfileCreateForm from "@/components/profiles/ProfileCreateForm";

const Profiles: React.FC = () => {
    const [profiles, setProfiles] = useState<Array<Profile>>();

    const getProfiles = async () => {
        const fetchedProfiles = await ProfileService.getAllProfiles();
        return setProfiles(fetchedProfiles);
    }

    useEffect(() => {
        getProfiles();
    }, []);
    
    return (
        <>
            <Head><title>Profiles</title></Head>
            <Header />
            <main>
                <h1>Profiles</h1>
                <section>{profiles && <ProfilesOverviewTable profiles={profiles}/>}</section>
                <h1>Create new profile</h1>
                <section><ProfileCreateForm/></section>
            </main>
        </>
    );
};

export default Profiles;