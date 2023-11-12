import express, { Request, Response } from 'express';
import commentService from '../service/comment.service';

const commentRouter = express.Router();

commentRouter.get('/:commentId/comments', async (req: Request, res: Response) => {
    try {
        const commentId = parseInt(req.params.commentId);
        const comment = commentService.getCommentById(commentId);
        if (comment) res.status(200).json(await commentService.getCommentsOnComment(commentId));
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});
