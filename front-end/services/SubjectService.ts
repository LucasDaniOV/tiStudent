import { getToken } from "@/util/token";

const getAllSubjects = async () => {
  const token = getToken();
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/subjects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

const getSubjectIdByName = async (name: string) => {
  const token = getToken();
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/subjects?name=" + encodeURIComponent(name),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await res.json();
};

const addSubjectToResource = async (resourceId: string, subjectId: string) => {
  const token = getToken();
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/subjects-on-resources",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ resourceId, subjectId }),
    }
  );
  return await res.json();
};

export default {
  getAllSubjects,
  addSubjectToResource,
  getSubjectIdByName,
};
