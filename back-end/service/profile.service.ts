import profileDb from '../domain/data-access/profile.db';
import resourceService from './resource.service';
import userDb from '../domain/data-access/user.db';
import { Profile } from '../domain/model/profile';
import { Resource } from '../domain/model/resource';
import { ProfileInput } from '../types';
import commentDb from '../domain/data-access/comment.db';
import { Comment } from '../domain/model/comment';
import { SourceTextModule } from 'vm';

const getAllProfiles = async () => await profileDb.getAllProfiles();

const getProfileById = async (id: number) => {
    const profile = profileDb.getProfileById(id);
    if (!profile) throw new Error(`Profile with id ${id} does not exist`);
    return profile;
};

const createProfile = async ({ userId, username }: ProfileInput): Promise<Profile> => {
    const user = await userDb.getUserById(userId);
    if (!user) throw new Error(`User with id ${userId} does not exist`);

    if (profileDb.getProfileByUserId(userId)) throw new Error(`User already has a profile`);
    const profile = new Profile({ user, username, bio: '', createdAt: new Date(), latestActivity: new Date() });
    if (profileDb.getProfileByUsername(username)) throw new Error(`Username already exists`);

    return profileDb.createProfile(
        profile.user,
        profile.username,
        profile.bio,
        profile.createdAt,
        profile.latestActivity
    );
};

// const likeResource = async ({ profileId, resourceId }): Promise<Resource> => {
//     const profile = getProfileById(profileId);
//     if (!profile) throw new Error(`Profile with id ${profileId} does not exist`);
//     const resource = await resourceService.getResourceById(resourceId);
//     if (!resource) throw new Error(`Resource with id ${resourceId} does not exist`);
//     profile.likeResource(resource);
//     return resource;
// };

// const getProfileField = async (profile: Profile, field: 'username' | 'bio' | 'latestActivity' | 'likedResources') => {
//     if (field == 'username') return profile.username;
//     else if (field == 'bio') return profile.bio;
//     else if (field == 'latestActivity') return profile.latestActivity;
//     else return profile.likedResources;
// };

// const updateField = async (
//     profile: Profile,
//     field: 'username' | 'bio' | 'likedResources',
//     newValue: string
// ): Promise<Profile> => {
//     if (field == 'username') profile.username = newValue;
//     else if (field == 'bio') profile.bio = newValue;
//     else {
//         const resourceId = parseInt(newValue);
//         const resource = await resourceService.getResourceById(resourceId);
//         return profile.unLikeResource(resource);
//     }
//     return getProfileById(profile.id);
// };

const deleteProfile = async (profileId: number): Promise<Boolean> => {
    return profileDb.deleteProfile(profileId);
};

const writeComment = async (profile: Profile, resource: Resource, message: string): Promise<Comment> => {
    return commentDb.createComment(profile, resource, message);
};

const getAllCommentsByProfile = async (profileId: number): Promise<Comment[]> => {
    return commentDb.getAllCommentsByProfile(profileId);
};

const getAllCommentsByProfileOnResource = async (profileId: number, resourceId: number): Promise<Comment[]> => {
    return commentDb.getAllCommentsByProfileOnResource(profileId, resourceId);
};

const getCommentById = async (commentId: number): Promise<Comment> => {
    const comment = commentDb.getCommentById(commentId);
    if (!comment) throw new Error(`No comment with id ${commentId} found`);
    return comment;
};

const deleteComment = async (profile: Profile, commentId: number): Promise<Comment> => {
    const comment = await commentDb.getCommentById(commentId);
    if (!comment) throw new Error(`No comment with id ${commentId} found`);
    if (comment.profile.id != profile.id)
        throw new Error(`This Profile didn't write the comment with id ${comment.id}`);
    commentDb.deleteComment(comment.id);
    return comment;
};

const updateComment = async (profile: Profile, comment: Comment, newMessage: string): Promise<Comment | Profile> => {
    const comments = await getAllCommentsByProfile(profile.id);
    const includes = comments.findIndex((c) => c.equals(comment));

    if (includes !== -1) {
        const newComment = await commentDb.updateMessageOnComment(comment.id, newMessage);
        if (newComment) {
            return newComment;
        }
    } else {
        throw new Error('Profile with this ID did not comment this.');
    }
};

export default {
    getAllProfiles,
    getProfileById,
    createProfile,
    // likeResource,
    // getProfileField,
    // updateField,
    deleteProfile,
    writeComment,
    getAllCommentsByProfile,
    getAllCommentsByProfileOnResource,
    deleteComment,
    getCommentById,
    updateComment,
};
