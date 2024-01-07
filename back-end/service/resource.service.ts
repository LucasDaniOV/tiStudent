import { UnauthorizedError } from 'express-jwt';
import resourceDb from '../domain/data-access/resource.db';
import { Resource } from '../domain/model/resource';
import { AuthenticationResponse, ResourceData, ResourceInput } from '../types';
import profileService from './profile.service';

const createResource = async (auth: AuthenticationResponse, resourceInput: ResourceInput): Promise<Resource> => {
    const { title, description, filePath, thumbNail, profileId } = resourceInput;
    const realProfileId = parseInt(auth.id as string);

    if (realProfileId !== profileId) {
        throw new UnauthorizedError('invalid_token', { message: 'You cannot create a resource as someone else!' });
    }

    Resource.validate(title, description, profileId);
    await profileService.getProfileById(profileId);
    return await resourceDb.createResource(title, description, profileId, filePath, thumbNail);
};

const getAllResources = async (): Promise<ResourceData[]> => await resourceDb.getAllResources();

const getResourceById = async (id: number): Promise<ResourceData> => {
    const resource = await resourceDb.getResourceById(id);
    if (!resource) throw new Error(`Resource with id ${id} does not exist`);
    return resource;
};

const getResourcesByProfileId = async (profileId: number): Promise<Resource[]> => {
    await profileService.getProfileById(profileId);
    return await resourceDb.getResourcesByProfileId(profileId);
};

const updateResource = async (
    auth: AuthenticationResponse,
    id: number,
    resourceInput: ResourceInput
): Promise<Resource> => {
    const resource: ResourceData = await getResourceById(id);
    const realProfileId = parseInt(auth.id as string);

    if (realProfileId !== resource.profileId) {
        throw new UnauthorizedError('invalid_token', { message: "You cannot update someone else's resource!" });
    }

    const { title, description, filePath, thumbNail } = resourceInput;
    Resource.validateTitle(title);
    Resource.validateDescription(description);

    return await resourceDb.updateResource(id, title, description, filePath, thumbNail);
};

const deleteResource = async (auth: AuthenticationResponse, id: number): Promise<Resource> => {
    const resource: ResourceData = await getResourceById(id);
    const realProfile = await profileService.getProfileById(parseInt(auth.id as string));

    if (realProfile.id !== resource.profileId || realProfile.role !== 'ADMIN') {
        throw new UnauthorizedError('invalid_token', { message: "You cannot delete someone else's resource!" });
    }

    return await resourceDb.deleteResource(id);
};

export default {
    createResource,
    getAllResources,
    getResourceById,
    getResourcesByProfileId,
    updateResource,
    deleteResource,
};
