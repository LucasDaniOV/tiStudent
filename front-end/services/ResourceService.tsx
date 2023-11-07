import { Profile, Resource, Comment } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/resources";

const getAllResources = async (): Promise<Resource[]> => {
  const resources = await fetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return resources.json();
};

const getResourceById = async (resourceId: string) => {
  return await fetch(baseUrl + "/" + resourceId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const deleteResourceById = async (resourceId: string) => {
  return await fetch(baseUrl + "/" + parseInt(resourceId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createResource = async (
  creator: Profile,
  title: string,
  description: string,
  category: string,
  subject: string
) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      creator,
      title,
      description,
      category,
      subject,
    }),
  });
  return res.json();
};

const getCommentsOnResource = async (id: string): Promise<Comment[]> => {
  const comments = await fetch(baseUrl + `/${id}/comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return comments.json();
};

const getCommentsOnComment = async (id: string): Promise<Comment[]> => {
  const comments = await fetch(baseUrl + `/comments/${id}/comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return comments.json();
};

const ResourceService = {
  getAllResources,
  getResourceById,
  deleteResourceById,
  createResource,
  getCommentsOnResource,
  getCommentsOnComment,
};

export default ResourceService;
