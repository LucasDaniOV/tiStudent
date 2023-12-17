import likeDb from '../domain/data-access/like.db';
import { Like } from '../domain/model/like';
import commentService from './comment.service';
import profileService from './profile.service';
import resourceService from './resource.service';

const getAllLikes = async (): Promise<Like[]> => {
    return await likeDb.getAllLikes();
};

const getAllLikesOnComment = async (commentId: number): Promise<Like[]> => {
    return await likeDb.getLikesOnComment(commentId);
};

const getAllLikesOnResource = async (resourceId: number): Promise<Like[]> => {
    return await likeDb.getLikesOnResource(resourceId);
};

const getLikeById = async (likeId: number): Promise<Like> => {
    const like = await likeDb.getLikeById(likeId);
    if (!like) throw new Error(`No Like found with ID ${likeId}`);
    return like;
};

const like = async (profileId: number, resourceId: number, commentId: number | null): Promise<Like> => {
    const profile = await profileService.getProfileById(profileId);
    if (!profileId) throw new Error(`Profile with id ${profileId} is required`);
    const resource = await resourceService.getResourceById(resourceId);
    if (!resource) throw new Error(`Resource with id ${resourceId} does not exist`);
    if (commentId !== null){
        const comment = await commentService.getCommentById(commentId);
        if (!comment) throw new Error(`Comment with id ${commentId} does not exist`);
        const likeResource = await likeDb.createLike(profile, resource, comment);
        return likeResource;
    }
    const likeResource = await likeDb.createLike(profile, resource, null);
    return likeResource;
};

const unlikeResource = async (profileId: number, resourceId: number): Promise<Boolean> => {
    const likes = await getAllLikes();
    const like = likes.find((l) => l.profile.id === profileId && l.resource.id === resourceId);
    if (!like) throw new Error(`No Like found by profile with ID ${profileId} on Resource with id ${resourceId}`);
    return await likeDb.deleteLike(like.id);
};

const unlikeComment = async (profileId: number, commentId: number): Promise<Boolean> => {
    const likes = await getAllLikes();
    const like = likes.find((l) => l.profile.id === profileId && l.comment.id === commentId);
    if (!like) throw new Error(`No Like found by profile with ID ${profileId} on Comment with id ${commentId}`);
    return await likeDb.deleteLike(like.id);
};

export default {
    getAllLikes,
    getLikeById,
    getAllLikesOnComment,
    getAllLikesOnResource,
    like,
    unlikeResource,
    unlikeComment,
};
