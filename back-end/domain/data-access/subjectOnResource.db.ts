import { SubjectOnResource } from '../model/subjectOnResource';
import database from '../../util/database';

const createSubjectOnResource = async (subjectId: number, resourceId: number): Promise<SubjectOnResource> => {
    try {
        const subjectOnResourcePrisma = await database.subjectOnResource.create({
            data: {
                subjectId,
                resourceId,
            },
        });
        if (subjectOnResourcePrisma) {
            return SubjectOnResource.from(subjectOnResourcePrisma);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Database error when creating subject on resource. See server log for details.');
    }
};

const getSubjectsOnResources = async (): Promise<SubjectOnResource[]> => {
    try {
        const subjectsOnResourcesPrisma = await database.subjectOnResource.findMany();
        if (subjectsOnResourcesPrisma) {
            return subjectsOnResourcesPrisma.map((subjectOnResourcePrisma) =>
                SubjectOnResource.from(subjectOnResourcePrisma)
            );
        }
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting subjects on resources. See server log for details.');
    }
};

const getSubjectOnResource = async (subjectId: number, resourceId: number): Promise<SubjectOnResource> => {
    try {
        const subjectOnResourcePrisma = await database.subjectOnResource.findUnique({
            where: {
                subjectId_resourceId: {
                    subjectId,
                    resourceId,
                },
            },
        });
        if (subjectOnResourcePrisma) {
            return SubjectOnResource.from(subjectOnResourcePrisma);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting subject on resource. See server log for details.');
    }
};

const getSubjectsOnResourcesBySubjectId = async (subjectId: number): Promise<SubjectOnResource[]> => {
    try {
        const subjectsOnResourcesPrisma = await database.subjectOnResource.findMany({
            where: {
                subjectId,
            },
        });
        if (subjectsOnResourcesPrisma) {
            return subjectsOnResourcesPrisma.map((subjectOnResourcePrisma) =>
                SubjectOnResource.from(subjectOnResourcePrisma)
            );
        }
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting subjects on resources by subject id. See server log for details.');
    }
};

const getSubjectsOnResourcesByResourceId = async (resourceId: number): Promise<SubjectOnResource[]> => {
    try {
        const subjectsOnResourcesPrisma = await database.subjectOnResource.findMany({
            where: {
                resourceId,
            },
        });
        if (subjectsOnResourcesPrisma) {
            return subjectsOnResourcesPrisma.map((subjectOnResourcePrisma) =>
                SubjectOnResource.from(subjectOnResourcePrisma)
            );
        }
    } catch (error) {
        console.error(error);
        throw new Error(
            'Database error when getting subjects on resources by resource id. See server log for details.'
        );
    }
};

const deleteSubjectOnResource = async (subjectId: number, resourceId: number): Promise<SubjectOnResource> => {
    try {
        const subjectOnResourcePrisma = await database.subjectOnResource.delete({
            where: {
                subjectId_resourceId: {
                    subjectId,
                    resourceId,
                },
            },
        });
        if (subjectOnResourcePrisma) {
            return SubjectOnResource.from(subjectOnResourcePrisma);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Database error when deleting subject on resource. See server log for details.');
    }
};

export default {
    createSubjectOnResource,
    getSubjectsOnResources,
    getSubjectOnResource,
    getSubjectsOnResourcesBySubjectId,
    getSubjectsOnResourcesByResourceId,
    deleteSubjectOnResource,
};
