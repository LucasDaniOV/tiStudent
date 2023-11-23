import { getToken } from "./token";

const getAll = async (type: "users" | "profiles" | "resources") => {
  const token = getToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${type}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};

export { getAll };