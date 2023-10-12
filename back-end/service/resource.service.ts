import profileDb from '../domain/data-access/profile.db';
import resourceDb from '../domain/data-access/resource.db';
import userDb from '../domain/data-access/user.db';
import { Category } from '../domain/model/category';
import { Resource } from '../domain/model/resource';
import { Subject } from '../domain/model/subject';
import { User } from '../domain/model/user';
import { ProfileInput, ResourceInput } from '../types';

// get all resources
const getAllResources = async (): Promise<Resource[]> => resourceDb.getAllResources();

// get resource by id
const getResourceById = async (id: number): Promise<Resource> => {
    const resource = resourceDb.getResourceById(id);
    if (!resource) throw new Error(`Resource with id ${id} does not exist`);
    return resource;
};

// create resource
const createResource = async ({
    creator: creatorInput,
    createdAt = new Date(),
    title,
    description,
    category,
    subject,
}: ResourceInput): Promise<Resource> => {
    if (!creatorInput) throw new Error('creator User is required');
    const creator = userDb.getUserById(creatorInput.id);
    if (!creator) throw new Error(`User with id ${creatorInput.id} does not exist`);
    const resource = new Resource({ creator, createdAt, title, description, category, subject });

    const existing = resourceDb.getResourceByContent(
        resource.title,
        resource.description,
        resource.category,
        resource.subject
    );
    if (existing) throw new Error('Resource already exists');

    return resourceDb.createResource(resource);
};

const updateField = (
    resource: Resource,
    field: string,
    newValue: string | Category | Subject
): Resource | ProfileInput[] => {
    switch (field) {
        case 'creator':
            const userId = parseInt(newValue as string);
            const user = userDb.getUserById(userId);
            if (!user) throw new Error(`User with id ${userId} does not exist`);
            return resource.updateCreator(user);
        case 'title':
            return resource.updateTitle(newValue as string);

        case 'description':
            return resource.updateDescription(newValue as string);

        case 'category':
            return resource.updateCategory(newValue as Category);

        case 'subject':
            return resource.updateSubject(newValue as Subject);

        case 'upvoters':
            const profileId = parseInt(newValue as string);
            const profile = profileDb.getProfileById(profileId);
            const profileInput = { userId: profile.user.id, username: profile.username };
            return resource.removeUpvoter(profileInput);
        default:
            throw new Error('Unsupported field');
    }
};
const getField = (resource: Resource, field: string): string => {
    switch (field) {
        case 'likes':
            return String(resource.likes);
        case 'creator':
            return JSON.stringify(resource.creator);
        case 'title':
            return resource.title;

        case 'description':
            return resource.description;

        case 'category':
            return resource.category;

        case 'subject':
            return resource.subject;

        case 'upvoters':
            return JSON.stringify(resource.upvoters);
        default:
            throw new Error('Unsupported field');
    }
};

const deleteResource = (resource: Resource) => {
    return resourceDb.deleteResource(resource);
};

export default { getAllResources, getResourceById, createResource, getField, updateField, deleteResource };
