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
  const creator = await ProfileService.getProfileById('3925486');
  console.log(creator);
  if (!creator) {
    return {
      message: "Profile does not exist",
      status: "error",
    };
  }
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

const ResourceService = {
  getAllResources,
  getResourceById,
  deleteResourceById,
  createResource,
};

export default ResourceService;
