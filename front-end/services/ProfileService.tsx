import { getAll, getById } from "@/util/get";
import { Like, Profile } from "../types";
import { getToken } from "@/util/token";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/profiles";
const type = "profiles";

const getAllProfiles = async () => await getAll(type);

const getProfileById = async (profileId: string) => getById(type, profileId);

const getProfileByEmail = async (email: string) => {
  const token = getToken();
  const res = await fetch(baseUrl + `/user/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

const deleteProfileById = async (profileId: number): Promise<Boolean> => {
  const res = await fetch(baseUrl + `/${profileId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

const getLikesByProfile = async (profileId: string): Promise<Array<Like>> => {
  const token = getToken();
  const res = await fetch(baseUrl + `/${profileId}/likedResources`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

const createProfile = async (
  email: string,
  password: string,
  role: string,
  username: string,
  bio?: string
) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, role, username, bio }),
  });
  return await res.json();
};

const getGithubUser = async (code: string) => {
  const url = `${baseUrl}/login/github?code=${code}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

const loginUser = async (email: string, password: string) => {
  const url = `${baseUrl}/login`;
  console.log("step 0");
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export default {
  getAllProfiles,
  getProfileById,
  getProfileByEmail,
  deleteProfileById,
  createProfile,
  getLikesByProfile,
  getGithubUser,
  loginUser,
};
