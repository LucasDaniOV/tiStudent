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

const getProfileByEmail = async (email: string): Promise<Profile> => {
  const res = await fetch(baseUrl + `/user/${email}`, {
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

const createProfile = async (username: string, bio: string, userId: string) => {
  const id = parseInt(userId);
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, bio, userId: id }),
  });
  return res.json();
};

export default {
  getAllProfiles,
  getProfileById,
  getProfileByEmail,
  deleteProfileById,
  createProfile,
};
