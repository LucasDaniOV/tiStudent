import { ResourceLike } from '@prisma/client';
import profileService from './profile.service';
import resourceService from './resource.service';
import resourceLikeDb from '../domain/data-access/resourceLike.db';

const createResourceLike = async (profileId: number, resourceId: number): Promise<ResourceLike> => {
    if (await getResourceLikeByProfileIdAndResourceId(profileId, resourceId)) {
        throw new Error('profile already liked this resource');
    }
    return await resourceLikeDb.createResourceLike(profileId, resourceId);
};

const getResourceLikeByProfileIdAndResourceId = async (
    profileId: number,
    resourceId: number
): Promise<ResourceLike> => {
    await profileService.getProfileById(profileId);
    await resourceService.getResourceById(resourceId);
    return await resourceLikeDb.getResourceByProfileIdAndResourceId(profileId, resourceId);
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
    const resourceLike = await getResourceLikeByProfileIdAndResourceId(profileId, resourceId);
    if (!resourceLike) throw new Error('resource like does not exist');
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
