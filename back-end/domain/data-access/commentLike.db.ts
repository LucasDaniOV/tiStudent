import { CommentLike } from '@prisma/client';
import database from '../../util/database';

const createCommentLike = async (profileId: number, commentId: number): Promise<CommentLike> => {
    try {
        const commentLikePrisma = await database.commentLike.create({
            data: {
                profileId,
                commentId,
            },
        });
        return commentLikePrisma;
    } catch (error) {
        console.error(error);
        throw new Error('Database error when creating comment like. See server log for details.');
    }
};

const getCommentByProfileIdAndCommentId = async (profileId: number, commentId: number): Promise<CommentLike> => {
    try {
        const commentLikePrisma = await database.commentLike.findUnique({
            where: {
                profileId_commentId: {
                    profileId,
                    commentId,
                },
            },
        });
        return commentLikePrisma;
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting comment like. See server log for details.');
    }
};

const getCommentLikes = async (): Promise<CommentLike[]> => {
    try {
        const commentLikesPrisma = await database.commentLike.findMany();
        return commentLikesPrisma;
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting comment likes. See server log for details.');
    }
};

const getCommentLikesByProfileId = async (profileId: number): Promise<CommentLike[]> => {
    try {
        const commentLikesPrisma = await database.commentLike.findMany({
            where: {
                profileId,
            },
        });
        return commentLikesPrisma;
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting comment likes by profileId. See server log for details.');
    }
};

const getCommentLikesByCommentId = async (commentId: number): Promise<CommentLike[]> => {
    try {
        const commentLikesPrisma = await database.commentLike.findMany({
            where: {
                commentId,
            },
        });
        return commentLikesPrisma;
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting comment likes by commentId. See server log for details.');
    }
};

const deleteCommentLike = async (profileId: number, commentId: number): Promise<CommentLike> => {
    try {
        const commentLikePrisma = await database.commentLike.delete({
            where: {
                profileId_commentId: {
                    profileId,
                    commentId,
                },
            },
        });
        return commentLikePrisma;
    } catch (error) {
        console.error(error);
        throw new Error('Database error when deleting comment like. See server log for details.');
    }
};

export default {
    createCommentLike,
    getCommentByProfileIdAndCommentId,
    getCommentLikes,
    getCommentLikesByProfileId,
    getCommentLikesByCommentId,
    deleteCommentLike,
};
