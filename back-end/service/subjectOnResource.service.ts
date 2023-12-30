import { SubjectOnResource } from '@prisma/client';
import subjectOnResourceDb from '../domain/data-access/subjectOnResource.db';
import resourceService from './resource.service';
import subjectService from './subject.service';

const createSubjectOnResource = async (subjectId: number, resourceId: number): Promise<SubjectOnResource> => {
    await resourceService.getResourceById(resourceId);
    await subjectService.getSubjectById(subjectId);
    if (await subjectOnResourceDb.getSubjectOnResource(subjectId, resourceId)) {
        throw new Error('Subject on resource already exists');
    }
    const subjectOnResource = await subjectOnResourceDb.createSubjectOnResource(subjectId, resourceId);
    return subjectOnResource;
};

const getSubjectOnResource = async (subjectId: number, resourceId: number): Promise<SubjectOnResource> => {
    await resourceService.getResourceById(resourceId);
    await subjectService.getSubjectById(subjectId);
    const subjectOnResource = await subjectOnResourceDb.getSubjectOnResource(subjectId, resourceId);
    if (!subjectOnResource) throw new Error('Subject on resource not found');
    return subjectOnResource;
};

const getSubjectsOnResources = async (): Promise<SubjectOnResource[]> => {
    return await subjectOnResourceDb.getSubjectsOnResources();
};

const getSubjectsOnResourcesBySubjectId = async (subjectId: number): Promise<SubjectOnResource[]> => {
    await subjectService.getSubjectById(subjectId);
    const subjectsOnResources = await subjectOnResourceDb.getSubjectsOnResourcesBySubjectId(subjectId);
    return subjectsOnResources;
};

const getSubjectsOnResourcesByResourceId = async (resourceId: number): Promise<SubjectOnResource[]> => {
    await resourceService.getResourceById(resourceId);
    const subjectsOnResources = await subjectOnResourceDb.getSubjectsOnResourcesByResourceId(resourceId);
    return subjectsOnResources;
};

const deleteSubjectOnResource = async (subjectId: number, resourceId: number): Promise<SubjectOnResource> => {
    await getSubjectOnResource(subjectId, resourceId);
    return await subjectOnResourceDb.deleteSubjectOnResource(subjectId, resourceId);
};

export default {
    createSubjectOnResource,
    getSubjectOnResource,
    getSubjectsOnResources,
    getSubjectsOnResourcesBySubjectId,
    getSubjectsOnResourcesByResourceId,
    deleteSubjectOnResource,
};
