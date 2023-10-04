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
    createdAt = new Date(),
    title,
    description,
    category,
    subject,
}: ResourceInput): Promise<Resource> => {
    if (!creatorInput) throw new Error('creator User is required');
    const creator = userDb.getUserById(creatorInput.id);
    if (!creator) throw new Error(`User with id ${creatorInput.id} does not exist`);
    const resource = new Resource({ creator, createdAt, title, description, category, subject });

    const existing = resourceDb.getResourceByContent(
        resource.title,
        resource.description,
        resource.category,
        resource.subject
    );
    if (existing) throw new Error('Resource already exists');

    return resourceDb.createResource(resource);
};

export default { getAllResources, getResourceById, createResource };
