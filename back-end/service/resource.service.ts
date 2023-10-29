import profileDb from '../domain/data-access/profile.db';
import resourceDb from '../domain/data-access/resource.db';
import { Category } from '../domain/model/category';
import { Profile } from '../domain/model/profile';
import { Resource } from '../domain/model/resource';
import { Subject } from '../domain/model/subject';
import { ResourceInput } from '../types';
import { Comment } from '../domain/model/comment';
import commentDb from '../domain/data-access/comment.db';
import likeDb from '../domain/data-access/like.db';
import { Like } from '../domain/model/like';

// get all resources
const getAllResources = async (): Promise<Resource[]> => await resourceDb.getAllResources();

// get resource by id
const getResourceById = async (id: number): Promise<Resource> => {
    const resource = await resourceDb.getResourceById(id);
    if (!resource) throw new Error(`Resource with id ${id} does not exist`);
    return resource;
};

// create resource
const createResource = async ({ creator, title, description, category, subject }: ResourceInput): Promise<Resource> => {
    if (!creator) throw new Error('creator Profile is required');
    if (!profileDb.getProfileById(creator.id)) throw new Error(`Profile with id ${creator.id} does not exist`);
    if (!Object.values(Category).includes(category)) throw new Error('Invalid Category');
    if (!Object.values(Subject).includes(subject)) throw new Error('Invalid Subject');
    const resource = new Resource({ creator, title, description, category, subject });

    const existing = resourceDb.getResourceByContent(
        resource.title,
        resource.description,
        resource.category,
        resource.subject
    );
    if (existing) throw new Error('Resource already exists');

    return await resourceDb.createResource(resource);
};

const updateField = async (
    resourceId: number,
    field: string,
    newValue: string | Category | Subject
): Promise<Resource> => {
    const resource = await resourceDb.getResourceById(resourceId);
    return await resourceDb.updateFieldOfResource(resource.id, field, newValue);
};

const getField = async (
    resource: Resource,
    field: string
): Promise<string | number | Profile[] | Profile | Comment[] | Like[]> => {
    switch (field) {
        case 'creator':
            return resource.creator;
        case 'title':
            return resource.title;

        case 'description':
            return resource.description;

        case 'category':
            return resource.category;

        case 'subject':
            return resource.subject;

        case 'likes':
            return (await likeDb.getLikesOnResource(resource.id)).length;

        case 'upvoters':
            return await profileDb.getProfilesWithLikeOnResource(resource);
        case 'comments':
            return commentDb.getAllCommentsOnResource(resource.id);

        default:
            throw new Error('Unsupported field');
    }
};

const deleteResource = async (resourceId: number) => {
    return await resourceDb.deleteResource(resourceId);
};

const getCommentsOnComment = async (commentId: number) => {
    const comments = await resourceDb.getCommentsOnComment(commentId);
    if (comments) return comments;
    else throw new Error('This comment has no subcomments');
};

export default {
    getAllResources,
    getResourceById,
    createResource,
    getField,
    updateField,
    deleteResource,
    getCommentsOnComment,
};
