import { Profile, Comment, Resource, Category, Subject } from "@/types";
import ProfileService from "./ProfileService";
import { getAll, getById } from "@/util/get";
import { getToken } from "@/util/token";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/resources";
const type = "resources";

const getAllResources = async () => {
  const token = getToken();
  const res = await fetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};

const getResourceById = async (id: string): Promise<Resource> => {
  const token = getToken();
  const res = await fetch(baseUrl + "/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const resource = await res.json();
  return resource.resource;
};

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

const createResource = async (title: string, description: string) => {
  const token = getToken();

  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      description,
      title,
      profileId: parseInt(
        JSON.parse(sessionStorage.getItem("loggedInUser")!).id || ""
      ),
    }),
  });

  return await res.json();
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

const getCategoriesByResourceId = async (resourceId: string) => {
  const token = getToken();
  const categories = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/categories?resourceId=" + resourceId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await categories.json();
};

const getSubjectsByResourceId = async (resourceId: string) => {
  const token = getToken();
  const subjects = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/subjects?resourceId=" + resourceId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await subjects.json();
};

const ResourceService = {
  getAllResources,
  getResourceById,
  deleteResourceById,
  createResource,
  getCommentsOnResource,
  getResourcesByProfile,
  getCategoriesByResourceId,
  getSubjectsByResourceId,
};

export default ResourceService;
