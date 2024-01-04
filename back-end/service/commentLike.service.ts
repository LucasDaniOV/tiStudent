import { CommentLike } from '../domain/model/commentLike';
import profileService from './profile.service';
import commentService from './comment.service';
import commentLikeDb from '../domain/data-access/commentLike.db';
import { CommentLikeInput } from '../types';

const createCommentLike = async (commentLikeInput: CommentLikeInput): Promise<CommentLike> => {
    const profileId = parseInt(commentLikeInput.profileId as string);
    const commentId = parseInt(commentLikeInput.commentId as string);

    if (await getCommentLikeByProfileIdAndCommentId(profileId, commentId)) {
        throw new Error('profile already liked this comment');
    }

    return await commentLikeDb.createCommentLike(profileId, commentId);
};

const getCommentLikeByProfileIdAndCommentId = async (profileId: number, commentId: number): Promise<CommentLike> => {
    await profileService.getProfileById(profileId);
    await commentService.getCommentById(commentId);
    return await commentLikeDb.getCommentLikeByProfileIdAndCommentId(profileId, commentId);
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
