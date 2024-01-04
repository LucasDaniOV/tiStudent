import { ResourceLike } from '../model/resourceLike';
import database from '../../util/database';

const createResourceLike = async (profileId: number, resourceId: number): Promise<ResourceLike> => {
    try {
        const resourceLikePrisma = await database.resourceLike.create({
            data: {
                profileId,
                resourceId,
            },
        });
        if (resourceLikePrisma) return ResourceLike.from(resourceLikePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when creating resource like. See server log for details.');
    }
};

const getResourceLikeByProfileIdAndResourceId = async (
    profileId: number,
    resourceId: number
): Promise<ResourceLike> => {
    try {
        const resourceLikePrisma = await database.resourceLike.findUnique({
            where: {
                profileId_resourceId: {
                    profileId,
                    resourceId,
                },
            },
        });
        if (resourceLikePrisma) return ResourceLike.from(resourceLikePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting resource like. See server log for details.');
    }
};

const getResourceLikes = async (): Promise<ResourceLike[]> => {
    try {
        const resourceLikesPrisma = await database.resourceLike.findMany();
        if (resourceLikesPrisma) {
            return resourceLikesPrisma.map((resourceLikePrisma) => ResourceLike.from(resourceLikePrisma));
        }
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
        if (resourceLikesPrisma) {
            return resourceLikesPrisma.map((resourceLikePrisma) => ResourceLike.from(resourceLikePrisma));
        }
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
        if (resourceLikesPrisma) {
            return resourceLikesPrisma.map((resourceLikePrisma) => ResourceLike.from(resourceLikePrisma));
        }
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
        if (resourceLikePrisma) return ResourceLike.from(resourceLikePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when deleting resource like. See server log for details.');
    }
};

export default {
    createResourceLike,
    getResourceLikeByProfileIdAndResourceId,
    getResourceLikes,
    getResourceLikesByProfileId,
    getResourceLikesByResourceId,
    deleteResourceLike,
};
