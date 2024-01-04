import { ResourceLike } from '../domain/model/resourceLike';
import profileService from './profile.service';
import resourceService from './resource.service';
import resourceLikeDb from '../domain/data-access/resourceLike.db';
import { ResourceLikeInput } from '../types';

const createResourceLike = async (resourceLikeInput: ResourceLikeInput): Promise<ResourceLike> => {
    const profileId = parseInt(resourceLikeInput.profileId as string);
    const resourceId = parseInt(resourceLikeInput.resourceId as string);

    await profileService.getProfileById(profileId);
    await resourceService.getResourceById(resourceId);

    if (await resourceLikeDb.getResourceLikeByProfileIdAndResourceId(profileId, resourceId)) {
        throw new Error(`ResourceLike with profileId ${profileId} and resourceId ${resourceId} already exists`);
    }

    return await resourceLikeDb.createResourceLike(profileId, resourceId);
};

const getResourceLikeByProfileIdAndResourceId = async (profileId: number, resourceId: number): Promise<ResourceLike> => {
    await profileService.getProfileById(profileId);
    await resourceService.getResourceById(resourceId);

    const resourceLike = await resourceLikeDb.getResourceLikeByProfileIdAndResourceId(profileId, resourceId);
    if (!resourceLike) {
        throw new Error(`ResourceLike with profileId ${profileId} and resourceId ${resourceId} does not exist`);
    }

    return resourceLike;
};

const getResourceLikes = async (): Promise<ResourceLike[]> => await resourceLikeDb.getResourceLikes();

const getResourceLikesByProfileId = async (profileId: number): Promise<ResourceLike[]> => {
    await profileService.getProfileById(profileId);
    return await resourceLikeDb.getResourceLikesByProfileId(profileId);
};

const getResourceLikesByResourceId = async (resourceId: number): Promise<ResourceLike[]> => {
    await resourceService.getResourceById(resourceId);
    return await resourceLikeDb.getResourceLikesByResourceId(resourceId);
};

const deleteResourceLike = async (profileId: number, resourceId: number): Promise<ResourceLike> => {
    await getResourceLikeByProfileIdAndResourceId(profileId, resourceId);
    return await resourceLikeDb.deleteResourceLike(profileId, resourceId);
};

export default {
    createResourceLike,
    getResourceLikeByProfileIdAndResourceId,
    getResourceLikes,
    getResourceLikesByProfileId,
    getResourceLikesByResourceId,
    deleteResourceLike,
};
