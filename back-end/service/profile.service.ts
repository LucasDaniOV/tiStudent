import profileDb from '../domain/data-access/profile.db';
import resourceService from './resource.service';
import userDb from '../domain/data-access/user.db';
import { Profile } from '../domain/model/profile';
import { Resource } from '../domain/model/resource';
import { ProfileInput } from '../types';
import commentDb from '../domain/data-access/comment.db';
import { Comment } from '../domain/model/comment';

const getAllProfiles = () => profileDb.getAllProfiles();

const getProfileById = (id: number) => {
    const profile = profileDb.getProfileById(id);
    if (!profile) throw new Error(`Profile with id ${id} does not exist`);
    return profile;
};

const createProfile = async ({ userId, username }: ProfileInput): Promise<Profile> => {
    const user = await userDb.getUserById(userId);
    if (!user) throw new Error(`User with id ${userId} does not exist`);
    if (profileDb.getProfileByUserId(userId)) throw new Error(`User already has a profile`);
    const profile = new Profile({ user, username });
    if (profileDb.getProfileByUsername(username)) throw new Error(`Username already exists`);

    return profileDb.createProfile(profile.user, profile.username);
};

const likeResource = async ({ profileId, resourceId }): Promise<Resource> => {
    const profile = getProfileById(profileId);
    if (!profile) throw new Error(`Profile with id ${profileId} does not exist`);
    const resource = await resourceService.getResourceById(resourceId);
    if (!resource) throw new Error(`Resource with id ${resourceId} does not exist`);
    profile.likeResource(resource);
    return resource;
};

const getProfileField = (profile: Profile, field: 'username' | 'bio' | 'latestActivity' | 'likedResources') => {
    if (field == 'username') return profile.username;
    else if (field == 'bio') return profile.bio;
    else if (field == 'latestActivity') return profile.latestActivity;
    else return profile.likedResources;
};

const updateField = async (
    profile: Profile,
    field: 'username' | 'bio' | 'likedResources',
    newValue: string
): Promise<Profile> => {
    if (field == 'username') profile.username = newValue;
    else if (field == 'bio') profile.bio = newValue;
    else {
        const resourceId = parseInt(newValue);
        const resource = await resourceService.getResourceById(resourceId);
        return profile.unLikeResource(resource);
    }
    return getProfileById(profile.id);
};

const deleteProfile = (profile: Profile): Boolean => {
    return profileDb.deleteProfile(profile);
};

const writeComment = (profile: Profile, resource: Resource, message: string) => {
    return commentDb.createComment(profile, resource, message);
};

const getAllCommentsByProfile = (profileId: number): Comment[] => {
    return commentDb.getAllCommentsByProfile(profileId);
};

const getAllCommentsByProfileOnResource = (profileId: number, resourceId: number): Comment[] => {
    return commentDb.getAllCommentsByProfileOnResource(profileId, resourceId);
};

const getCommentById = (commentId: number): Comment => {
    const comment = commentDb.getCommentById(commentId);
    if (!comment) throw new Error(`No comment with id ${commentId} found`);
    return comment;
};

const deleteComment = (profile: Profile, commentId: number): Comment => {
    const comment = commentDb.getCommentById(commentId);
    if (comment.profile != profile) throw new Error(`This Profile didn't write the comment with id ${comment.id}`);
    if (!comment) throw new Error(`No comment with id ${commentId} found`);
    commentDb.deleteComment(comment);
    return comment;
};

export default {
    getAllProfiles,
    getProfileById,
    createProfile,
    likeResource,
    getProfileField,
    updateField,
    deleteProfile,
    writeComment,
    getAllCommentsByProfile,
    getAllCommentsByProfileOnResource,
    deleteComment,
    getCommentById,
};
