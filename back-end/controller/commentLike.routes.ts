import { CommentLike } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import commentLikeService from '../service/commentLike.service';
import { CommentLikeInput } from '../types';

const commentLikeRouter = express.Router();

commentLikeRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commentLikeInput: CommentLikeInput = req.body;

        const commentLike: CommentLike = await commentLikeService.createCommentLike(commentLikeInput);

        res.status(200).json({ status: 'success', message: 'comment like created', commentLike });
    } catch (error) {
        next(error);
    }
});

commentLikeRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId: number | undefined = parseInt(req.query.profileId as string);
        const commentId: number | undefined = parseInt(req.query.commentId as string);

        let commentLikes: CommentLike[];

        if (profileId && commentId) {
            commentLikes = [await commentLikeService.getCommentLikeByProfileIdAndCommentId(profileId, commentId)];
        } else if (profileId) {
            commentLikes = await commentLikeService.getCommentLikesByProfileId(profileId);
        } else if (commentId) {
            commentLikes = await commentLikeService.getCommentLikesByCommentId(commentId);
        } else {
            commentLikes = await commentLikeService.getCommentLikes();
        }

        res.status(200).json({ status: 'success', message: 'comment likes found', commentLikes });
    } catch (error) {
        next(error);
    }
});

commentLikeRouter.delete('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId: number = parseInt(req.query.profileId as string);
        const commentId: number = parseInt(req.query.commentId as string);

        const deletedCommentLike: CommentLike = await commentLikeService.deleteCommentLike(profileId, commentId);

        res.status(200).json({ status: 'success', message: 'comment like deleted', deletedCommentLike });
    } catch (error) {
        next(error);
    }
});

export { commentLikeRouter };
