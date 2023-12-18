import database from '../../util/database';
import { Category } from '../model/category';
import { Resource } from '../model/resource';
import { Subject } from '../model/subject';

const getAllResources = async (): Promise<Resource[]> => {
    try {
        const resourcesPrisma = await database.resource.findMany({
            include: {
                creator: true,
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
                creator: true,
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
                        id: Number(resource.creator.id),
                    },
                },
                title: resource.title,
                createdAt: new Date(),
                description: resource.description,
                category: resource.category,
                subject: resource.subject,
            },
            include: {
                creator: true,
            },
        });
        if (resourcePrisma) return Resource.from(resourcePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
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
                creator: true,
            },
        });
        if (resourcePrisma) return Resource.from(resourcePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteResource = async (resourceId: number): Promise<Boolean> => {
    try {
        await database.resource.delete({
            where: {
                id: resourceId,
            },
        });
        return true;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateFieldOfResource = async (
    resourceId: number,
    field: string,
    newValue: string | Category | Subject
): Promise<Resource> => {
    try {
        const resource = await getResourceById(resourceId);
        if (resource) {
            switch (field) {
                case 'title':
                    const resourceTitlePrisma = await database.resource.update({
                        where: {
                            id: resourceId,
                        },
                        data: {
                            title: newValue,
                        },
                        include: {
                            creator: true,
                        },
                    });
                    if (resourceTitlePrisma) return Resource.from(resourceTitlePrisma);
                    break;
                case 'description':
                    const resourceDescriptionPrisma = await database.resource.update({
                        where: {
                            id: resourceId,
                        },
                        data: {
                            description: newValue,
                        },
                        include: {
                            creator: true,
                        },
                    });
                    if (resourceDescriptionPrisma) return Resource.from(resourceDescriptionPrisma);
                    break;
                case 'category':
                    const resourceCategoryPrisma = await database.resource.update({
                        where: {
                            id: resourceId,
                        },
                        data: {
                            category: newValue as Category,
                        },
                        include: {
                            creator: true,
                        },
                    });
                    if (resourceCategoryPrisma) return Resource.from(resourceCategoryPrisma);
                    break;
                case 'subject':
                    const resourceSubjectPrisma = await database.resource.update({
                        where: {
                            id: resourceId,
                        },
                        data: {
                            subject: newValue as Subject,
                        },
                        include: {
                            creator: true,
                        },
                    });
                    if (resourceSubjectPrisma) return Resource.from(resourceSubjectPrisma);
                    break;
                default:
                    throw new Error('Field not supported');
            }
        }
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllResources,
    getResourceById,
    createResource,
    getResourceByContent,
    deleteResource,
    updateFieldOfResource,
};
