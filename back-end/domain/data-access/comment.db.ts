import { Comment } from '../model/comment';
import { Profile } from '../model/profile';
import { Resource } from '../model/resource';

let currentId = 0;

let comments: Comment[] = [];

const getAllComments = () => {
    return comments;
};

const getCommentById = (commentId: number) => {
    const comment = comments.find((comment) => comment.id === commentId);
    return comment;
};

const getAllCommentsOnResource = (resourceId: number): Comment[] => {
    return comments.filter((comment) => comment.resource.id == resourceId);
};
const getAllCommentsByProfile = (profileId: number) => {
    return comments.filter((comment) => comment.profile.id == profileId);
};

const getAllCommentsByProfileOnResource = (profileId: number, resourceId: number) => {
    return comments.filter((comment) => comment.profile.id == profileId && comment.resource.id == resourceId);
};

const createComment = (profile: Profile, resource: Resource, message: string) => {
    const comment = new Comment({ id: currentId++, profile, resource, message });
    comments.push(comment);
    return comment;
};

const deleteComment = (commentToDelete: Comment): Boolean => {
    comments = comments.filter((comment) => comment.id != commentToDelete.id);
    return true;
};

export default {
    getAllComments,
    getAllCommentsOnResource,
    getAllCommentsByProfile,
    getAllCommentsByProfileOnResource,
    createComment,
    getCommentById,
    deleteComment,
};
