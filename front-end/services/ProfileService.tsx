import { Profile } from "../types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/profiles";

const getAllProfiles = async (): Promise<Profile[]> => {
    const res = await fetch(baseUrl, { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }, 
    });
    return res.json();
};

const getProfileById = async (profileId: string): Promise<Profile> => {
    const res = await fetch(baseUrl + `/${profileId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
};

const deleteProfileById = async (profileId: number): Promise<Boolean> => {
    const res = await fetch(baseUrl + `/${profileId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
};

export default {
    getAllProfiles,
    getProfileById,
    deleteProfileById,
};
