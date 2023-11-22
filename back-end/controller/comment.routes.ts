/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           example: 0
 *         message:
 *           type: string
 *           example: Great summary!!
 *         createdAt:
 *           type: date-time
 *           example: '2023-01-01T00:00:00.000Z'
 *         profile:
 *           $ref: '#/components/schemas/Profile'
 *         resource:
 *           $ref: '#/components/schemas/Resource'
 *         edited:
 *           type: boolean
 *           example: false
 */

import express, { Request, Response } from 'express';
import commentService from '../service/comment.service';
import profileService from '../service/profile.service';
import resourceService from '../service/resource.service';

const commentRouter = express.Router();

//all comments
commentRouter.get('/', async (req: Request, res: Response) => {
    try {
        const comments = await commentService.getAllComments();
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

//get Comment By Id
commentRouter.get('/comments/:commentId', async (req: Request, res: Response) => {
    try {
        const commentId = parseInt(req.params.commentId);
        const comment = await commentService.getCommentById(commentId);
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});
//all comments under a comment
commentRouter.get('/:commentId/comments', async (req: Request, res: Response) => {
    try {
        const commentId = parseInt(req.params.commentId);
        const comment = await commentService.getCommentById(commentId);
        const comments = await commentService.getCommentsOnComment(comment.id);
        if (comment) res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

//refactor

/**
 * @swagger
 * /comments/profile/{profileId}:
 *   get:
 *     tags:
 *       - comments
 *     summary: give an overview of a Profiles' Comments
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: The ID of the comment.
 *         schema:
 *           type: number
 *           example: 0
 *
 *     responses:
 *       200:
 *         description: The comments a comment has written
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */

commentRouter.get('/profile/:id', async (req: Request, res: Response) => {
    try {
        const commentId = parseInt(req.params.id);
        const comment = await commentService.getCommentById(commentId);
        const comments = await commentService.getAllCommentsByProfile(comment.profile.id);
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /comments/{profileId}/{resourceId}:
 *   get:
 *     tags:
 *       - comments
 *     summary: give an overview of a Profiles' comments on a Resource
 *     parameters:
 *       - name: profileId
 *         in: path
 *         required: true
 *         description: The ID of the Profile.
 *         schema:
 *           type: number
 *           example: 0
 *       - name: resourceId
 *         in: path
 *         required: true
 *         description: The ID of the Resource.
 *         schema:
 *           type: number
 *           example: 0
 *     responses:
 *       200:
 *         description: The comments a Profile has written on a Resource
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */

commentRouter.get('/:profileId/:resourceId', async (req: Request, res: Response) => {
    try {
        const profileId = parseInt(req.params.profileId);
        const resourceId = parseInt(req.params.resourceId);
        const comment = await commentService.getCommentById(profileId);
        const resource = await resourceService.getResourceById(resourceId);
        const comments = await commentService.getAllCommentsByProfileOnResource(comment.id, resource.id);
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

//writeComment

/**
 * @swagger
 * /comments/{profileId}/{resourceId}/{commentId}:
 *   post:
 *     tags:
 *       - profiles
 *     summary: Comment on a Comment
 *     parameters:
 *       - name: profileId
 *         in: path
 *         required: true
 *         description: The ID of the Profile.
 *         schema:
 *           type: number
 *           example: 0
 *       - name: resourceId
 *         in: path
 *         required: true
 *         description: The ID of the Resource on which the parent Comment is posted.
 *         schema:
 *           type: number
 *           example: 0
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: The ID of the Comment.
 *         schema:
 *           type: number
 *           example: 0
 *       - name: message
 *         in: query
 *         required: true
 *         description: The message you want to comment
 *         schema:
 *           type: string
 *           example: Great summary!
 *     responses:
 *       200:
 *         description: The Comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 */

commentRouter.post('/:profileId/:resourceId/:commentId', async (req: Request, res: Response) => {
    try {
        const profileId = parseInt(req.params.profileId);
        const resourceId = parseInt(req.params.resourceId);
        const commentId = parseInt(req.params.commentId);
        const message = String(req.query.message);
        const profile = await profileService.getProfileById(profileId);
        const resource = await resourceService.getResourceById(resourceId);
        const newComment = await commentService.writeComment(profile, resource, message, commentId);
        res.status(200).json({ status: 'success', message: 'Comment added', data: newComment });
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /profiles/comment/{profileId}/{resourceId}:
 *   post:
 *     tags:
 *       - profiles
 *     summary: Comment on a Resource
 *     parameters:
 *       - name: profileId
 *         in: path
 *         required: true
 *         description: The ID of the Profile.
 *         schema:
 *           type: number
 *           example: 0
 *       - name: resourceId
 *         in: path
 *         required: true
 *         description: The ID of the Resource.
 *         schema:
 *           type: number
 *           example: 0
 *       - name: message
 *         in: query
 *         required: true
 *         description: The message you want to comment on the Resource
 *         schema:
 *           type: string
 *           example: Great summary!
 *     responses:
 *       200:
 *         description: The Comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 */

commentRouter.post('/comment/:profileId/:resourceId', async (req: Request, res: Response) => {
    try {
        const profileId = parseInt(req.params.profileId);
        const resourceId = parseInt(req.params.resourceId);
        const message = String(req.query.message);
        const profile = await profileService.getProfileById(profileId);
        const resource = await resourceService.getResourceById(resourceId);
        const comment = await commentService.writeComment(profile, resource, message);
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /comments/{profileId}/{commentId}?newMessage:
 *   put:
 *     tags:
 *       - profiles
 *     summary: Edit a Comment
 *     parameters:
 *       - name: profileId
 *         in: path
 *         required: true
 *         description: The ID of the Profile.
 *         schema:
 *           type: number
 *           example: 0
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: The ID of the Comment to be edited
 *         schema:
 *           type: number
 *           example: 0
 *       - name: message
 *         in: query
 *         required: true
 *         description: The new message for the Comment
 *         schema:
 *           type: string
 *           example: "Nice!!"
 *
 *     responses:
 *       200:
 *         description: The updated Comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 */
commentRouter.put('/:profileId/:commentId', async (req: Request, res: Response) => {
    try {
        const commentId = parseInt(req.params.commentId);
        const comment = await commentService.getCommentById(commentId);
        const message = String(req.query.message);
        const updatedComment = await commentService.updateComment(comment, message);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /comments/{profileId}/{commentId}:
 *   delete:
 *     tags:
 *       - comments
 *     summary: delete a Comment written by a Profile
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: The ID of the Profile.
 *         schema:
 *           type: number
 *           example: 0
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: The ID of the Comment.
 *         schema:
 *           type: number
 *           example: 0
 *
 *     responses:
 *       200:
 *         description: the removed Comment
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */

commentRouter.delete('/:commentId', async (req: Request, res: Response) => {
    try {
        const commentId = parseInt(req.params.commentId);
        const comment = await commentService.getCommentById(commentId);
        res.status(200).json(await commentService.deleteComment(comment.id));
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { commentRouter };
