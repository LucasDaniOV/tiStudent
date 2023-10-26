import database from '../../util/database';
import { Category } from '../model/category';
import { Profile } from '../model/profile';
import { Resource } from '../model/resource';
import { Subject } from '../model/subject';

const getAllResources = async (): Promise<Resource[]> => {
    try {
        const resourcesPrisma = await database.resource.findMany({
            include: {
                creator: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        if (resourcesPrisma) return resourcesPrisma.map((resourcePrisma) => Resource.from(resourcePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getResourceById = async (id: number): Promise<Resource> => {
    try {
        const resourcePrisma = await database.resource.findUnique({
            where: {
                id,
            },
            include: {
                creator: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        if (resourcePrisma) return Resource.from(resourcePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createResource = async ({ creator, title, description, category, subject }): Promise<Resource> => {
    try {
        const resource = new Resource({ creator, title, description, category, subject });
        const resourcePrisma = await database.resource.create({
            data: {
                creator: {
                    connect: {
                        id: resource.creator.id,
                    },
                },
                title: resource.title,
                createdAt: new Date(),
                description: resource.description,
                category: resource.category,
                subject: resource.subject,
            },
            include: {
                creator: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        if (resourcePrisma) return Resource.from(resourcePrisma);
    } catch (error) {}
};

const getResourceByContent = async (
    title: string,
    description: string,
    category: string,
    subject: string
): Promise<Resource> => {
    try {
        const resourcePrisma = await database.resource.findFirst({
            where: {
                title,
                description,
                category,
                subject,
            },
            include: {
                creator: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        if (resourcePrisma) return Resource.from(resourcePrisma);
    } catch (error) {}
};

const deleteResource = async (resourceId: number): Promise<Boolean> => {
    try {
        await database.resource.delete({
            where: {
                id: resourceId,
            },
        });
        return true;
    } catch (error) {}
};

export default { getAllResources, getResourceById, createResource, getResourceByContent, deleteResource };
