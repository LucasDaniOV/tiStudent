import database from '../../util/database';
import { Resource } from '../model/resource';

const createResource = async (title: string, description: string, profileId: number): Promise<Resource> => {
    try {
        const resourcePrisma = await database.resource.create({
            data: {
                title,
                description,
                profileId,
            },
        });
        if (resourcePrisma) return Resource.from(resourcePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when creating resource. See server log for details.');
    }
};

const getAllResources = async (): Promise<Resource[]> => {
    try {
        const resourcesPrisma = await database.resource.findMany();
        if (resourcesPrisma) return resourcesPrisma.map((r) => Resource.from(r));
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting all resources. See server log for details.');
    }
};

const getResourceById = async (id: number): Promise<Resource> => {
    try {
        const resourcePrisma = await database.resource.findUnique({
            where: {
                id,
            },
        });
        if (resourcePrisma) return Resource.from(resourcePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting resource by id. See server log for details.');
    }
};

const updateResource = async (id: number, title: string, description: string): Promise<Resource> => {
    try {
        const resourcePrisma = await database.resource.update({
            where: {
                id,
            },
            data: {
                title,
                description,
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
    updateResource,
    deleteResource,
};
