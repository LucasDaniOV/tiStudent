import { Profile, Comment, Resource } from "@/types";
import ProfileService from "./ProfileService";
import { getAll, getById } from "@/util/get";
import { getToken } from "@/util/token";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/resources";
const type = "resources";

const getAllResources = async () => getAll(type);
const getResourceById = async (resourceId: string) => getById(type, resourceId);

const deleteResourceById = async (resourceId: string) => {
  const token = getToken();
  return await fetch(baseUrl + "/" + parseInt(resourceId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const createResource = async (
  profileId: string,
  title: string,
  description: string,
  categoryId: number = 1,
  subjectId: number = 1
) => {
  const token = getToken();

  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      profileId,
      title,
      description,
    }),
  });

  const resource = await res.json();
  const resourceId = resource.id;

  await fetch(process.env.NEXT_PUBLIC_API_URL + "/subjects-on-resources", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      resourceId,
      subjectId,
    }),
  });

  await fetch(process.env.NEXT_PUBLIC_API_URL + "/categories-on-resources", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      resourceId,
      categoryId,
    }),
  });

  return res;
};

const getCommentsOnResource = async (id: string): Promise<Comment[]> => {
  const token = getToken();
  const comments = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/comments?resourceId=" + id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await comments.json();
};

const getResourcesByProfile = async (profileId: number) => {
  const token = getToken();
  const resources = await fetch(baseUrl + "?profileId=" + profileId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await resources.json();
};

const ResourceService = {
  getAllResources,
  getResourceById,
  deleteResourceById,
  createResource,
  getCommentsOnResource,
  getResourcesByProfile,
};

export default ResourceService;
