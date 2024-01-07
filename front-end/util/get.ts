import { Type } from "../types";
import { getToken } from "./token";

const base = process.env.NEXT_PUBLIC_API_URL + "/";

const getAll = async (type: Type) => {
  const token = getToken();

  const res = await fetch(base + type, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};

const getById = async (type: Type, id: string) => {
  const token = getToken();
  const res = await fetch(base + type + `/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const user = await res.json();
  return user;
};

export { getAll, getById };
