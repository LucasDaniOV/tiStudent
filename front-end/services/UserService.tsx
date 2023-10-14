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

const deleteUserById = (userId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const UserService = {
  getAllUsers,
  getUserById,
  deleteUserById,
};

export default UserService;
