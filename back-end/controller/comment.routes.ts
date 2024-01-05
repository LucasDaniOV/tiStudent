import express, { NextFunction, Request, Response } from 'express';
import { Comment } from '../domain/model/comment';
import commentService from '../service/comment.service';
import { AuthenticationResponse, ChildComment } from '../types';

const commentRouter = express.Router();

commentRouter.post('/', async (req: Request & { auth: AuthenticationResponse }, res: Response, next: NextFunction) => {
    try {
        const resourceId: number = parseInt(req.body.resourceId);
        const profileId: number = parseInt(req.body.profileId);
        const message: string = req.body.message;
        const parentId: number | undefined = parseInt(req.body.parentId);
        const auth: AuthenticationResponse = req.auth;

        const comment: Comment = await commentService.createComment(auth, resourceId, profileId, message, parentId);

        res.status(200).json({ status: 'success', message: 'comment created', comment });
    } catch (error) {
        next(error);
    }
});

commentRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resourceId: number = parseInt(req.query.resourceId as string);

        let comments: Comment[];

        if (resourceId) {
            comments = await commentService.getCommentsByResourceId(resourceId);
        } else {
            comments = await commentService.getComments();
        }

        res.status(200).json({ status: 'success', message: 'comments found', comments });
    } catch (error) {
        next(error);
    }
});

commentRouter.get('/:commentId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commentId: number = parseInt(req.params.commentId);

        const comment: Comment = await commentService.getCommentById(commentId);

        res.status(200).json({ status: 'success', message: 'comment found', comment });
    } catch (error) {
        next(error);
    }
});

commentRouter.get('/:commentId/children', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commentId: number = parseInt(req.params.commentId);

        const comments: ChildComment[] = await commentService.getChildrenByCommentId(commentId);

        res.status(200).json({ status: 'success', message: 'child comments found', comments });
    } catch (error) {
        next(error);
    }
});

commentRouter.put(
    '/:commentId',
    async (req: Request & { auth: AuthenticationResponse }, res: Response, next: NextFunction) => {
        try {
            const commentId: number = parseInt(req.params.commentId);
            const message: string = req.body.message;
            const auth: AuthenticationResponse = req.auth;

            const updatedComment: Comment = await commentService.updateCommentMessage(auth, commentId, message);

            res.status(200).json({ status: 'success', message: 'comment updated', updatedComment });
        } catch (error) {
            next(error);
        }
    }
);

commentRouter.delete('/:commentId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commentId: number = parseInt(req.params.commentId);

        const deletedComment: Comment = await commentService.deleteComment(commentId);

        res.status(200).json({ status: 'success', message: 'comment deleted', deletedComment });
    } catch (error) {
        next(error);
    }
});

export { commentRouter };
