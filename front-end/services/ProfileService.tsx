import { getAll, getById } from "@/util/get";
import { Profile } from "../types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/profiles";
const type = "profiles";

const getAllProfiles = async () => getAll(type);

const getProfileById = async (profileId: string) => getById(type, profileId);

const getProfileByEmail = async (
  email: string,
  token: string
): Promise<Profile> => {
  const res = await fetch(baseUrl + `/user/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

const createProfile = async (username: string, bio: string, userId: number) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, bio, userId }),
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
