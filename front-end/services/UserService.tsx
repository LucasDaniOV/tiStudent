import { getAll } from "@/util/get";
import { getToken } from "@/util/token";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/users";
const type = "users";

const getAllUsers = async () => getAll(type);

const getUserById = async (userId: string) => {
  const token = getToken();

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/users/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const user = await res.json();
  return user;
};

const getUserByEmail = async (email: string) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/users/email/` + email,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const user = await res.json();
  return user;
};

const deleteUserById = async (userId: string) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/users/${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const user = await res.json();
  return user;
};

const createUser = async (email: string, password: string) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const user = await res.json();
  return user;
};

const getGithubUser = async (code: string) => {
  const url = `${baseUrl}/login/github?code=${code}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const user = await res.json();
  return user;
};

const loginUser = async (email: string, password: string) => {
  const url = `${baseUrl}/login`;
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

const UserService = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteUserById,
  createUser,
  getGithubUser,
  loginUser,
};

export default UserService;
