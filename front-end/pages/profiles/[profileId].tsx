import Header from "@/components/header";
import ProfileInfo from "@/components/profiles/ProfileInfo";
import ProfileService from "@/services/ProfileService";
import { Profile } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ReadProfileById = () => {
    const [profile, setProfile] = useState<Profile>();

    const router = useRouter();
    const { profileId } = router.query;

    const getProfileById = async () => {
        const fetchedProfile = await ProfileService.getProfileById(profileId as string);
        return setProfile(fetchedProfile);
    };

    useEffect(() => {
        if (profileId) getProfileById();
    });

    return (
        <>
            <Head><title>Profile info</title></Head>
            <Header />
            <main>
                <h1>Info about Profile {profile && profile.id}</h1>
                {!profileId && <p>Loading</p>}
                <section>
                    <ProfileInfo profile={profile as Profile}></ProfileInfo>
                </section>
            </main>
        </>
    );

};

export default ReadProfileById;
