import commentDb from '../domain/data-access/comment.db';
import { Comment } from '../domain/model/comment';
import profileService from './profile.service';
import resourceService from './resource.service';

const createComment = async (resourceId: number, profileId: number, message: string): Promise<Comment> => {
    Comment.validateMessage(message);
    await resourceService.getResourceById(resourceId);
    await profileService.getProfileById(profileId);
    return await commentDb.createComment(resourceId, profileId, message);
};

const getComments = async (): Promise<Comment[]> => await commentDb.getComments();

const getCommentById = async (commentId: number): Promise<Comment> => {
    const comment = await commentDb.getCommentById(commentId);
    if (!comment) throw new Error(`no comment with id ${commentId} found`);
    return comment;
};

const updateCommentMessage = async (commentId: number, message: string): Promise<Comment> => {
    Comment.validateMessage(message);
    await getCommentById(commentId);
    return await commentDb.updateCommentMessage(commentId, message);
};

const deleteComment = async (commentId: number): Promise<Comment> => {
    await getCommentById(commentId);
    return await commentDb.deleteComment(commentId);
};

export default {
    createComment,
    getComments,
    getCommentById,
    updateCommentMessage,
    deleteComment,
};
