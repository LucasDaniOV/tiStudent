import { Category, Comment, Resource, Subject } from "../types";
import { getById } from "../util/get";
import { getToken } from "../util/token";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/resources";
const type = "resources";

const getAllResources = async () => {
  const token = getToken();
  const res = await fetch(baseUrl + "?includeCategoriesAndSubjects=true", {
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

const createResource = async (title: string, description: string, filePath: string, thumbNail: string) => {
  const token = getToken();

  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description,
      filePath,
      thumbNail,
      profileId: parseInt(JSON.parse(sessionStorage.getItem("loggedInUser")!).id || ""),
    }),
  });

  return await res.json();
};

const updateResource = async (id: string, title: string, description: string) => {
  const token = getToken();
  const res = await fetch(baseUrl + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description,
    }),
  });

  return await res.json();
};

const getCommentsOnResource = async (id: string): Promise<Comment[]> => {
  const token = getToken();
  const comments = await fetch(process.env.NEXT_PUBLIC_API_URL + "/comments?resourceId=" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
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
  const categoriesOnResource = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/categories-on-resources?resourceId=" + resourceId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const jsonCategoriesOnResource = await categoriesOnResource.json();
  const categoriesOnResources = jsonCategoriesOnResource.categoriesOnResources;

  const categories: Category[] = [];
  for (const categoryOnResource of categoriesOnResources) {
    const category = await getById("categories", categoryOnResource.categoryId);
    categories.push(category.category.name);
  }

  return categories;
};

const getSubjectsByResourceId = async (resourceId: string) => {
  const token = getToken();
  const subjects = await fetch(process.env.NEXT_PUBLIC_API_URL + "/subjects-on-resources?resourceId=" + resourceId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const jsonSubjects = await subjects.json();

  const subjectsOnResources = jsonSubjects.subjectsOnResources;

  const subjectsArray: Subject[] = [];
  for (const subjectOnResource of subjectsOnResources) {
    const subject = await getById("subjects", subjectOnResource.subjectId);
    subjectsArray.push(subject.subject.name);
  }

  return subjectsArray;
};

const ResourceService = {
  getAllResources,
  getResourceById,
  deleteResourceById,
  createResource,
  updateResource,
  getCommentsOnResource,
  getResourcesByProfile,
  getCategoriesByResourceId,
  getSubjectsByResourceId,
};

export default ResourceService;
