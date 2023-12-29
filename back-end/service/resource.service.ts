import resourceDb from '../domain/data-access/resource.db';
import { Resource } from '../domain/model/resource';
import { ResourceInput } from '../types';
import profileService from './profile.service';

const createResource = async (resourceInput: ResourceInput): Promise<Resource> => {
    const { title, description, profileId } = resourceInput;
    Resource.validate(title, description);
    await profileService.getProfileById(profileId);
    return await resourceDb.createResource(title, description, profileId);
};

const getAllResources = async (): Promise<Resource[]> => await resourceDb.getAllResources();

const getResourceById = async (id: number): Promise<Resource> => {
    const resource = await resourceDb.getResourceById(id);
    if (!resource) throw new Error(`Resource with id ${id} does not exist`);
    return resource;
};

const updateResource = async (id: number, resourceInput: ResourceInput): Promise<Resource> => {
    const { title, description } = resourceInput;
    Resource.validate(title, description);
    await getResourceById(id);
    return await resourceDb.updateResource(id, title, description);
};

const deleteResource = async (id: number): Promise<Resource> => {
    await getResourceById(id);
    return await resourceDb.deleteResource(id);
};

export default {
    createResource,
    getAllResources,
    getResourceById,
    updateResource,
    deleteResource,
};
