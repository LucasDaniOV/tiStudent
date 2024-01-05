import { SubjectOnResource } from '../domain/model/subjectOnResource';
import subjectOnResourceDb from '../domain/data-access/subjectOnResource.db';
import resourceService from './resource.service';
import subjectService from './subject.service';
import { AuthenticationResponse, SubjectOnResourceInput, ResourceData } from '../types';
import { UnauthorizedError } from 'express-jwt';

const createSubjectOnResource = async (
    auth: AuthenticationResponse,
    subjectOnResourceInput: SubjectOnResourceInput
): Promise<SubjectOnResource> => {
    const resourceId: number = parseInt(subjectOnResourceInput.resourceId as string);
    const subjectId: number = parseInt(subjectOnResourceInput.subjectId as string);

    const resource: ResourceData = await resourceService.getResourceById(resourceId);
    const realProfileId: number = parseInt(auth.id as string);

    if (resource.profileId !== realProfileId) {
        throw new UnauthorizedError('invalid_token', { message: 'Not your resource' });
    }

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

const deleteSubjectOnResource = async (
    auth: AuthenticationResponse,
    subjectId: number,
    resourceId: number
): Promise<SubjectOnResource> => {
    const resource: ResourceData = await resourceService.getResourceById(resourceId);
    const realProfileId: number = parseInt(auth.id as string);

    if (resource.profileId !== realProfileId) {
        throw new UnauthorizedError('invalid_token', { message: 'Not your resource' });
    }

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
