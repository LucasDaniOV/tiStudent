import resourceDb from '../domain/data-access/resource.db';
import userDb from '../domain/data-access/user.db';
import { Resource } from '../domain/model/resource';
import { ResourceInput } from '../types';

// get all resources
const getAllResources = async (): Promise<Resource[]> => resourceDb.getAllResources();

// get resource by id
const getResourceById = async (id: number): Promise<Resource> => {
    const resource = resourceDb.getResourceById(id);
    if (!resource) throw new Error(`Resource with id ${id} does not exist`);
    return resource;
};

// create resource
const createResource = async ({
    creator: creatorInput,
    createdAt,
    title,
    description,
    category,
    subject,
}: ResourceInput): Promise<Resource> => {
    const creator = userDb.getUserById(creatorInput.id);
    const resource = new Resource({ creator, createdAt, title, description, category, subject });
    return resourceDb.createResource(resource);
};

export default { getAllResources, getResourceById, createResource };
