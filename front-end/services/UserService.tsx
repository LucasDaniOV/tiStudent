const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/users";

const getAllUsers = () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getUserById = (userId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getUserByEmail = (email: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/email/` + email, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const deleteUserById = (userId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createUser = async (email: string, password: string) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

const getGithubUser = async (code: string) => {
  const url = `${baseUrl}/login/github?code=${code}`
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}

const UserService = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteUserById,
  createUser,
  getGithubUser
};

export default UserService;
