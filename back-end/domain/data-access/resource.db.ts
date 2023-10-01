import { Resource } from '../model/resource';

let currentId = 0;

const resources: Resource[] = [];

const getAllResources = (): Resource[] => resources;

const getResourceById = (id: number): Resource => resources.find((resource) => resource.id === id);

const createResource = ({ creator, createdAt, title, description, category, subject }): Resource => {
    const resource = new Resource({
        id: currentId++,
        creator,
        createdAt,
        title,
        description,
        category,
        subject,
    });
    resources.push(resource);
    return resource;
};

export default { getAllResources, getResourceById, createResource };
