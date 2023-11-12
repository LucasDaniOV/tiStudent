import commentDb from '../domain/data-access/comment.db';
import { Comment } from '../domain/model/comment';
import { Profile } from '../domain/model/profile';
import { Resource } from '../domain/model/resource';

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

const getCommentsOnComment = async (commentId: number) => {
    const comments = await commentDb.getCommentsOnComment(commentId);
    if (comments) return comments;
    else throw new Error('This comment has no subcomments');
};

export default {
    getCommentById,
    writeComment,
    getAllCommentsByProfile,
    getAllCommentsByProfileOnResource,
    getCommentsOnComment,
    deleteComment,
    updateComment,
};
