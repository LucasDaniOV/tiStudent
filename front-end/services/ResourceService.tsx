import { Profile, Resource, Comment } from "@/types";
import ProfileService from "./ProfileService";

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
  profileId: string,
  title: string,
  description: string,
  category: string,
  subject: string
) => {
  const res1 = await ProfileService.getProfileById(profileId);

  if (res1.status === "error") {
    return {
      message: "Profile does not exist",
      status: "error",
    };
  }

  const creator = res1.data as Profile;

  const res2 = await fetch(baseUrl, {
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

  const res2Json = await res2.json();

  if (res2Json.status === "error") {
    return {
      status: "error",
      message: res2Json.message,
    };
  }

  return res2Json;
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

const ResourceService = {
  getAllResources,
  getResourceById,
  deleteResourceById,
  createResource,
  getCommentsOnResource,
};

export default ResourceService;
