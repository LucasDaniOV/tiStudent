import { Profile, Resource } from "@/types";
import ProfileService from "./ProfileService";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/resources";

const getAllResources = () => {
  return fetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getResourceById = (resourceId: string) => {
  return fetch(baseUrl + "/" + resourceId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const deleteResourceById = (resourceId: string) => {
  return fetch(baseUrl + "/" + parseInt(resourceId), {
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

  return res2.json();
};

const ResourceService = {
  getAllResources,
  getResourceById,
  deleteResourceById,
  createResource,
};

export default ResourceService;
