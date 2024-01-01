import { CommentLike } from '@prisma/client';
import profileService from './profile.service';
import commentService from './comment.service';
import commentLikeDb from '../domain/data-access/commentLike.db';

const createCommentLike = async (profileId: number, commentId: number): Promise<CommentLike> => {
    if (await getCommentLikeByProfileIdAndCommentId(profileId, commentId)) {
        throw new Error('profile already liked this comment');
    }
    return await commentLikeDb.createCommentLike(profileId, commentId);
};

const getCommentLikeByProfileIdAndCommentId = async (profileId: number, commentId: number): Promise<CommentLike> => {
    await profileService.getProfileById(profileId);
    await commentService.getCommentById(commentId);
    return await commentLikeDb.getCommentByProfileIdAndCommentId(profileId, commentId);
};

const getCommentLikes = async (): Promise<CommentLike[]> => await commentLikeDb.getCommentLikes();

const getCommentLikesByProfileId = async (profileId: number): Promise<CommentLike[]> => {
    await profileService.getProfileById(profileId);
    return await commentLikeDb.getCommentLikesByProfileId(profileId);
};

const getCommentLikesByCommentId = async (commentId: number): Promise<CommentLike[]> => {
    await commentService.getCommentById(commentId);
    return await commentLikeDb.getCommentLikesByCommentId(commentId);
};

const deleteCommentLike = async (profileId: number, commentId: number): Promise<CommentLike> => {
    const commentLike = await getCommentLikeByProfileIdAndCommentId(profileId, commentId);
    if (!commentLike) throw new Error('comment like does not exist');
    return await commentLikeDb.deleteCommentLike(profileId, commentId);
};

export default {
    createCommentLike,
    getCommentLikeByProfileIdAndCommentId,
    getCommentLikes,
    getCommentLikesByProfileId,
    getCommentLikesByCommentId,
    deleteCommentLike,
};
