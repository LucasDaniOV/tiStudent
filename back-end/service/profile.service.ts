import profileDb from '../domain/data-access/profile.db';
import resourceService from './resource.service';
import userDb from '../domain/data-access/user.db';
import { Profile } from '../domain/model/profile';
import { Resource } from '../domain/model/resource';
import { ProfileInput } from '../types';
import commentDb from '../domain/data-access/comment.db';
import { Comment } from '../domain/model/comment';
import { SourceTextModule } from 'vm';
import likeDb from '../domain/data-access/like.db';
import { Like } from '../domain/model/like';
import resourceDb from '../domain/data-access/resource.db';

const getAllProfiles = async () => await profileDb.getAllProfiles();

const getProfileById = async (id: number): Promise<Profile> => {
    const profile = await profileDb.getProfileById(id);
    if (!profile) throw new Error(`Profile with id ${id} does not exist`);
    return profile;
};

const getProfileByEmail = async (email: string): Promise<Profile> => {
    const profiles = await profileDb.getAllProfiles();
    const profile = profiles.find((p) => p.user.email === email);
    if (!profile) throw new Error(`Profile with email "${email}" does not exist`);
    return profile;
};

const createProfile = async ({ username, bio, userId }: ProfileInput): Promise<Profile> => {
    // check that userID is a number
    if (typeof userId !== 'number') throw new Error('userId must be a number');

    // check if user with userId exists
    const user = await userDb.getUserById(userId);
    if (!user) throw new Error(`User with id ${userId} does not exist`);

    // check if user already has a profile
    if (await profileDb.getProfileByUserId(userId)) throw new Error(`User already has a profile`);

    // check if errors occur when creating profile object
    const profile = new Profile({ username, bio, user });

    // check if username is already taken
    if (await profileDb.getProfileByUsername(username)) throw new Error(`Username already exists`);

    // create profile
    return await profileDb.createProfile(profile.user, profile.username, profile.bio);
};

const likeObject = async (profileId: number, object: string, id: number): Promise<Like> => {
    const profile = await getProfileById(profileId);
    if (!profile) throw new Error(`Profile with id ${profileId} does not exist`);
    switch (object) {
        case 'resource':
            const resource = await resourceService.getResourceById(id);
            if (!resource) throw new Error(`Resource with id ${id} does not exist`);
            const likeResource = await likeDb.createLike(profile, resource, null);
            return likeResource;
        case 'comment':
            const comment = await getCommentById(id);
            if (!comment) throw new Error(`Comment with id ${id} does not exist`);
            const likeComment = await likeDb.createLike(profile, null, comment);
            return likeComment;

        default:
            throw new Error('Unsupported field');
    }
};

const getProfileField = async (profile: Profile, field: string) => {
    if (field == 'username') return profile.username;
    else if (field == 'bio') return profile.bio;
    else if (field == 'latestActivity') return profile.latestActivity;
    else if (field == 'likedResources') return await likeDb.getLikesByProfile(profile.id);
};

const updateField = async (profile: Profile, field: string, value: string): Promise<Profile | Like[]> => {
    if (field == 'bio') return await profileDb.updateProfileBio(profile.id, value);
    else if (field == 'likes') {
        const likeId = parseInt(value);
        const likes = await likeDb.getLikesByProfile(profile.id);
        const like = likes.findIndex((l) => l.id == likeId);
        if (like) {
            const removed = await likeDb.deleteLike(likeId);
            if (removed) return await likeDb.getLikesByProfile(profile.id);
            else throw new Error('Something went wrong');
        } else {
            throw new Error('Profile has no like on this object');
        }
    } else {
        throw new Error('Unsupported field');
    }
};

const deleteProfile = async (profileId: number): Promise<Boolean> => {
    return await profileDb.deleteProfile(profileId);
};

const writeComment = async (
    profile: Profile,
    resource: Resource,
    message: string,
    parentId: number | null = null
): Promise<Comment> => {
    if (parentId) {
        const parentComments = await commentDb.getAllCommentsOnResource(resource.id);
        console.log(parentComments);

        if (parentComments.findIndex((c) => c.id == parentId) !== -1) {
            return await commentDb.createComment(profile, resource, message, parentId);
        } else {
            throw new Error(`Parent Comment with id ${parentId} is not present on Resource with id ${resource.id}`);
        }
    } else return await commentDb.createComment(profile, resource, message);
};

const getAllCommentsByProfile = async (profileId: number): Promise<Comment[]> => {
    return await commentDb.getAllCommentsByProfile(profileId);
};

const getAllCommentsByProfileOnResource = async (profileId: number, resourceId: number): Promise<Comment[]> => {
    return await commentDb.getAllCommentsByProfileOnResource(profileId, resourceId);
};

const getCommentById = async (commentId: number): Promise<Comment> => {
    const comment = await commentDb.getCommentById(commentId);
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
    const includes = comments.findIndex((c) => c.id == comment.id);

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
    getProfileByEmail,
    createProfile,
    likeObject,
    getProfileField,
    updateField,
    deleteProfile,
    writeComment,
    getAllCommentsByProfile,
    getAllCommentsByProfileOnResource,
    deleteComment,
    getCommentById,
    updateComment,
};
