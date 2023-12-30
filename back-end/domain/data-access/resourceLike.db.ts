import { ResourceLike } from '@prisma/client';
import database from '../../util/database';

const createResourceLike = async (profileId: number, resourceId: number): Promise<ResourceLike> => {
    try {
        const resourceLikePrisma = await database.resourceLike.create({
            data: {
                profileId,
                resourceId,
            },
        });
        return resourceLikePrisma;
    } catch (error) {
        console.error(error);
        throw new Error('Database error when creating resource like. See server log for details.');
    }
};

const getResourceByProfileIdAndResourceId = async (profileId: number, resourceId: number): Promise<ResourceLike> => {
    try {
        const resourceLikePrisma = await database.resourceLike.findUnique({
            where: {
                profileId_resourceId: {
                    profileId,
                    resourceId,
                },
            },
        });
        return resourceLikePrisma;
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting resource like. See server log for details.');
    }
};

const getResourceLikes = async (): Promise<ResourceLike[]> => {
    try {
        const resourceLikesPrisma = await database.resourceLike.findMany();
        return resourceLikesPrisma;
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting resource likes. See server log for details.');
    }
};

const getResourceLikesByProfileId = async (profileId: number): Promise<ResourceLike[]> => {
    try {
        const resourceLikesPrisma = await database.resourceLike.findMany({
            where: {
                profileId,
            },
        });
        return resourceLikesPrisma;
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting resource likes by profileId. See server log for details.');
    }
};

const getResourceLikesByResourceId = async (resourceId: number): Promise<ResourceLike[]> => {
    try {
        const resourceLikesPrisma = await database.resourceLike.findMany({
            where: {
                resourceId,
            },
        });
        return resourceLikesPrisma;
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting resource likes by resourceId. See server log for details.');
    }
};

const deleteResourceLike = async (profileId: number, resourceId: number): Promise<ResourceLike> => {
    try {
        const resourceLikePrisma = await database.resourceLike.delete({
            where: {
                profileId_resourceId: {
                    profileId,
                    resourceId,
                },
            },
        });
        return resourceLikePrisma;
    } catch (error) {
        console.error(error);
        throw new Error('Database error when deleting resource like. See server log for details.');
    }
};

export default {
    createResourceLike,
    getResourceByProfileIdAndResourceId,
    getResourceLikes,
    getResourceLikesByProfileId,
    getResourceLikesByResourceId,
    deleteResourceLike,
};
