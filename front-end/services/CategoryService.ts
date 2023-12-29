import { getToken } from "@/util/token";

const getAllCategories = async () => {
  const token = getToken();
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

const addCategoryToResource = async (
  resourceId: string,
  categoryId: string
) => {
  const token = getToken();
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/categories-on-resources",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ resourceId, categoryId }),
    }
  );
  return await res.json();
};

export default {
  getAllCategories,
  addCategoryToResource,
};
