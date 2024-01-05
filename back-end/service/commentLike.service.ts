import { CommentLike } from '../domain/model/commentLike';
import profileService from './profile.service';
import commentService from './comment.service';
import commentLikeDb from '../domain/data-access/commentLike.db';
import { AuthenticationResponse, CommentLikeInput } from '../types';
import { UnauthorizedError } from 'express-jwt';

const createCommentLike = async (
    auth: AuthenticationResponse,
    commentLikeInput: CommentLikeInput
): Promise<CommentLike> => {
    const realProfileId: number = parseInt(auth.id as string);
    const profileId = parseInt(commentLikeInput.profileId as string);

    if (realProfileId !== profileId) {
        throw new UnauthorizedError('invalid_token', {
            message: 'You cannot create a comment like as another profile!',
        });
    }

    const commentId = parseInt(commentLikeInput.commentId as string);

    await profileService.getProfileById(profileId);
    await commentService.getCommentById(commentId);

    if (await commentLikeDb.getCommentLikeByProfileIdAndCommentId(profileId, commentId)) {
        throw new Error(`CommentLike with profileId ${profileId} and commentId ${commentId} already exists`);
    }

    return await commentLikeDb.createCommentLike(profileId, commentId);
};

const getCommentLikeByProfileIdAndCommentId = async (profileId: number, commentId: number): Promise<CommentLike> => {
    await profileService.getProfileById(profileId);
    await commentService.getCommentById(commentId);

    const commentLike = await commentLikeDb.getCommentLikeByProfileIdAndCommentId(profileId, commentId);
    if (!commentLike) {
        throw new Error(`CommentLike with profileId ${profileId} and commentId ${commentId} does not exist`);
    }

    return commentLike;
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

const deleteCommentLike = async (
    auth: AuthenticationResponse,
    profileId: number,
    commentId: number
): Promise<CommentLike> => {
    const realProfileId: number = parseInt(auth.id as string);

    if (realProfileId !== profileId) {
        throw new UnauthorizedError('invalid_token', {
            message: 'You cannot delete a comment like as another profile!',
        });
    }

    await getCommentLikeByProfileIdAndCommentId(profileId, commentId);
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
