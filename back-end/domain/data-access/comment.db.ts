import { ChildComment } from '../../types';
import database from '../../util/database';
import { Comment } from '../model/comment';

const createComment = async (
    resourceId: number,
    profileId: number,
    message: string,
    parentId?: number
): Promise<Comment> => {
    try {
        const commentPrisma = await database.comment.create({
            data: {
                resourceId,
                profileId,
                message,
                parentId,
            },
        });
        if (commentPrisma) return Comment.from(commentPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when creating comment. See server log for details.');
    }
};

const getComments = async (): Promise<Comment[]> => {
    try {
        const commentsPrisma = await database.comment.findMany();
        if (commentsPrisma) return commentsPrisma.map((c) => Comment.from(c));
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting comments. See server log for details.');
    }
};

const getCommentById = async (commentId: number): Promise<Comment> => {
    try {
        const commentPrisma = await database.comment.findUnique({
            where: {
                id: commentId,
            },
        });
        if (commentPrisma) return Comment.from(commentPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting comment by id. See server log for details.');
    }
};

const getCommentsByResourceId = async (resourceId: number): Promise<Comment[]> => {
    try {
        const commentsPrisma = await database.comment.findMany({
            where: {
                resourceId,
            },
        });
        if (commentsPrisma) return commentsPrisma.map((c) => Comment.from(c));
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting comments by resource id. See server log for details.');
    }
};

const getChildrenByCommentId = async (commentId: number): Promise<ChildComment[]> => {
    try {
        const res: ChildComment[] = await database.comment.findMany({
            where: {
                parentId: commentId,
            },
            include: {
                profile: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
                likes: true,
            },
        });

        let childComments: ChildComment[] = [];

        res.forEach((c) => {
            childComments.push({
                id: c.id,
                createdAt: c.createdAt,
                updatedAt: c.updatedAt,
                message: c.message,
                profileId: c.profileId,
                resourceId: c.resourceId,
                profile: {
                    id: c.profile.id,
                    username: c.profile.username,
                },
                likes: c.likes,
            });
        });

        return childComments;
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting child comments by comment id. See server log for details.');
    }
};

const updateCommentMessage = async (commentId: number, message: string): Promise<Comment> => {
    try {
        const commentPrisma = await database.comment.update({
            where: {
                id: commentId,
            },
            data: {
                message,
            },
        });
        if (commentPrisma) return Comment.from(commentPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating comment message. See server log for details.');
    }
};

const deleteComment = async (commentId: number): Promise<Comment> => {
    try {
        const commentPrisma = await database.comment.delete({
            where: {
                id: commentId,
            },
        });
        if (commentPrisma) return Comment.from(commentPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when deleting comment. See server log for details.');
    }
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
