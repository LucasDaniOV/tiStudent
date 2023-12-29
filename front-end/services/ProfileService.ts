import { getAll } from "@/util/get";
import { getToken } from "@/util/token";
import { Profile } from "../types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/profiles";
const type = "profiles";

const getAllProfiles = async () => await getAll(type);

const getProfileById = async (profileId: string) => {
  const token = getToken();
  const res = await fetch(baseUrl + `/${profileId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const profile = await res.json();
  return profile;
};

const deleteProfileById = async (profileId: number): Promise<Boolean> => {
  const token = getToken();
  const res = await fetch(baseUrl + `/${profileId}`, {
    method: "DELETE",
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
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, role, username, bio }),
  });
  return await res.json();
};

const loginUser = async (email: string, password: string) => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/signin";
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

const getLeaderboard = async (): Promise<
  Array<{ profile: Profile; resourceCount: number }>
> => {
  const token = getToken();
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/leaderboard/10`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export default {
  getAllProfiles,
  getProfileById,
  deleteProfileById,
  createProfile,
  loginUser,
  getLeaderboard,
};
