import { UnauthorizedError } from 'express-jwt';
import commentDb from '../domain/data-access/comment.db';
import { Comment } from '../domain/model/comment';
import { AuthenticationResponse, ChildComment } from '../types';
import profileService from './profile.service';
import resourceService from './resource.service';

const createComment = async (
    auth: AuthenticationResponse,
    resourceId: number,
    profileId: number,
    message: string,
    parentId?: number
): Promise<Comment> => {
    const realProfileId: number = parseInt(auth.id as string);
    if (realProfileId !== profileId) {
        throw new UnauthorizedError('invalid_token', {
            message:
                'You are trying to create a comment as another profile!!! This incident will be reported to INTERPOL!',
        });
    }

    Comment.validateMessage(message);

    await resourceService.getResourceById(resourceId);
    await profileService.getProfileById(profileId);

    if (parentId) await getCommentById(parentId);

    return await commentDb.createComment(resourceId, profileId, message, parentId);
};

const getComments = async (): Promise<Comment[]> => await commentDb.getComments();

const getCommentById = async (commentId: number): Promise<Comment> => {
    const comment = await commentDb.getCommentById(commentId);
    if (!comment) throw new Error(`no comment with id ${commentId} found`);
    return comment;
};

const getCommentsByResourceId = async (resourceId: number): Promise<Comment[]> => {
    await resourceService.getResourceById(resourceId);
    return await commentDb.getCommentsByResourceId(resourceId);
};

const getChildrenByCommentId = async (commentId: number): Promise<ChildComment[]> => {
    await getCommentById(commentId);
    return await commentDb.getChildrenByCommentId(commentId);
};

const updateCommentMessage = async (
    auth: AuthenticationResponse,
    commentId: number,
    message: string
): Promise<Comment> => {
    const realProfileId: number = parseInt(auth.id as string);
    const comment: Comment = await getCommentById(commentId);

    if (realProfileId !== comment.profileId) {
        throw new UnauthorizedError('invalid_token', {
            message:
                'You are trying to update a comment as another profile!!! This incident will be reported to INTERPOL!',
        });
    }

    Comment.validateMessage(message);
    return await commentDb.updateCommentMessage(commentId, message);
};

const deleteComment = async (auth: AuthenticationResponse, commentId: number): Promise<Comment> => {
    const realProfileId: number = parseInt(auth.id as string);
    const comment: Comment = await getCommentById(commentId);

    if (realProfileId !== comment.profileId) {
        throw new UnauthorizedError('invalid_token', {
            message:
                'You are trying to delete a comment as another profile!!! This incident will be reported to INTERPOL!',
        });
    }

    return await commentDb.deleteComment(commentId);
};

export default {
    createComment,
    getComments,
    getCommentById,
    getCommentsByResourceId,
    getChildrenByCommentId,
    updateCommentMessage,
    deleteComment,
};
