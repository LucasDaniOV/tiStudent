import { ResourceData } from '../../types';
import database from '../../util/database';
import { Category } from '../model/category';
import { CommentLike } from '../model/commentLike';
import { Resource } from '../model/resource';
import { ResourceLike } from '../model/resourceLike';
import { Subject } from '../model/subject';
import { Comment } from '../model/comment';

const include = {
    categories: {
        select: {
            category: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    },
    subjects: {
        select: {
            subject: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    },
    comments: {
        where: {
            parentId: null,
        },
        select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            message: true,
            profile: {
                select: {
                    id: true,
                    username: true,
                },
            },
            likes: true,
        },
    },
    likes: true,
};

const createResource = async (
    title: string,
    description: string,
    filePath: string,
    thumbNail: string,
    profileId: number
): Promise<Resource> => {
    try {
        const resourcePrisma = await database.resource.create({
            data: {
                title,
                description,
                filePath,
                thumbNail,
                profileId,
            },
        });
        if (resourcePrisma) return Resource.from(resourcePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when creating resource. See server log for details.');
    }
};

const getAllResources = async (): Promise<ResourceData[]> => {
    try {
        const res = await database.resource.findMany({
            include,
        });
        return res as ResourceData[];
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting all resources. See server log for details.');
    }
};

const getResourcesByProfileId = async (profileId: number): Promise<Resource[]> => {
    try {
        const resources = await database.resource.findMany({
            where: {
                profileId,
            },
        });
        if (resources) return resources.map((r) => Resource.from(r));
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting resources by profile id. See server log for details.');
    }
};

const getResourceById = async (id: number): Promise<ResourceData> => {
    try {
        const res = await database.resource.findUnique({
            where: {
                id,
            },
            include,
        });
        return res as ResourceData;
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting resource by id. See server log for details.');
    }
};

const updateResource = async (
    id: number,
    title: string,
    description: string,
    filePath: string,
    thumbNail: string
): Promise<Resource> => {
    try {
        const resourcePrisma = await database.resource.update({
            where: {
                id,
            },
            data: {
                title,
                description,
                filePath,
                thumbNail,
            },
        });
        if (resourcePrisma) return Resource.from(resourcePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating resource. See server log for details.');
    }
};

const deleteResource = async (id: number): Promise<Resource> => {
    try {
        const resourcePrisma = await database.resource.delete({
            where: {
                id,
            },
        });
        if (resourcePrisma) return Resource.from(resourcePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when deleting resource. See server log for details.');
    }
};

export default {
    createResource,
    getAllResources,
    getResourceById,
    getResourcesByProfileId,
    updateResource,
    deleteResource,
};
