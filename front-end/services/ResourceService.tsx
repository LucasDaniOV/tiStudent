import { Resource } from "@/types";

const getAllResources = () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/resources", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getResourceById = (resourceId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/resources/${resourceId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const deleteResourceById = (resourceId: string) => {
  return fetch(
    process.env.NEXT_PUBLIC_API_URL + `/resources/${parseInt(resourceId)}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const ResourceService = {
  getAllResources,
  getResourceById,
  deleteResourceById,
};

export default ResourceService;
