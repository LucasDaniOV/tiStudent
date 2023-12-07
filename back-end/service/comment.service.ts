import commentDb from '../domain/data-access/comment.db';
import { Comment } from '../domain/model/comment';
import { Profile } from '../domain/model/profile';
import { Resource } from '../domain/model/resource';

const getAllComments = async () => {
    const comments = await commentDb.getAllComments();
    if (!comments) throw new Error('There are no comments');
    return comments;
};

const getCommentById = async (commentId: number): Promise<Comment> => {
    const comment = await commentDb.getCommentById(commentId);
    if (!comment) throw new Error(`No comment with id ${commentId} found`);
    return comment;
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
            return await commentDb.createCommentOnComment(profile, resource, message, parentId);
        } else {
            throw new Error(`Parent Comment with id ${parentId} is not present on Resource with id ${resource.id}`);
        }
    } else return await commentDb.createCommentOnResource(profile, resource, message);
};

const getAllCommentsByProfile = async (profileId: number): Promise<Comment[]> => {
    return await commentDb.getAllCommentsByProfile(profileId);
};

const getAllCommentsByProfileOnResource = async (profileId: number, resourceId: number): Promise<Comment[]> => {
    return await commentDb.getAllCommentsByProfileOnResource(profileId, resourceId);
};

const deleteComment = async (commentId: number): Promise<Comment> => {
    const comment = await commentDb.getCommentById(commentId);
    if (!comment) throw new Error(`No comment with id ${commentId} found`);
    commentDb.deleteComment(comment.id);
    return comment;
};

const updateComment = async (comment: Comment, newMessage: string): Promise<Comment | Profile> => {
    const c = await getCommentById(comment.id);
    if (c) {
        if (!newMessage.trim()) throw new Error("New message can't be empty");
        const newComment = await commentDb.updateMessageOnComment(c.id, newMessage);
        if (newComment) {
            return newComment;
        }
    }
};

const getCommentsOnComment = async (commentId: number) => {
    const comments = await commentDb.getCommentsOnComment(commentId);
    if (comments) return comments;
    else throw new Error('This comment has no subcomments');
};

export default {
    getAllComments,
    getCommentById,
    writeComment,
    getAllCommentsByProfile,
    getAllCommentsByProfileOnResource,
    getCommentsOnComment,
    deleteComment,
    updateComment,
};
