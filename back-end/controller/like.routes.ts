/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           example: 0
 *         createdAt:
 *           type: date-time
 *           example: '2023-01-01T00:00:00.000Z'
 *         profile:
 *           $ref: '#/components/schemas/Profile'
 *         resource:
 *           $ref: '#/components/schemas/Resource'
 *         comment:
 *           $ref: '#/components/schemas/Comment'
 */

import express, { Request, Response } from 'express';
import commentService from '../service/comment.service';
import likeService from '../service/like.service';
import profileService from '../service/profile.service';
import resourceService from '../service/resource.service';

const likeRouter = express.Router();

/**
 * @swagger
 * /like/{profileId}/resource/{resourceId}:
 *   post:
 *     tags:
 *       - profiles
 *     summary: Like a Resource
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
 *         description: The ID of the Resource
 *         schema:
 *           type: number
 *           example: 0
 *     responses:
 *       200:
 *         description: The Like object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 */

likeRouter.post('/:profileId/resource/:resourceId', async (req: Request, res: Response) => {
    try {
        const profileId = parseInt(req.params.profileId);
        const resourceId = parseInt(req.params.resourceId);
        const like = await likeService.like(profileId, resourceId, null);
        res.status(200).json({ status: 'success', message: 'Like created', data: like });
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /like/{profileId}/comment/{commentId}:
 *   post:
 *     tags:
 *       - profiles
 *     summary: Like a Comment
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
 *         description: The ID of the comment
 *         schema:
 *           type: number
 *           example: 0
 *     responses:
 *       200:
 *         description: The Like object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 */

likeRouter.post('/:profileId/resource/:resourceId/comment/:commentId', async (req: Request, res: Response) => {
    try {
        const profileId = parseInt(req.params.profileId);
        const resourceId = parseInt(req.params.resourceId);
        const commentId = parseInt(req.params.commentId);
        const like = await likeService.like(profileId, resourceId, commentId);
        res.status(200).json({ status: 'success', message: 'Like created ', data: like });
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /like/comment/{commentId}:
 *   get:
 *     tags:
 *       - likes
 *     summary: Get the number of likes on a Comment
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: The ID of the comment
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: The number of likes on the comment
 *         content:
 *           application/json:
 *             example:
 *               status: 'success'
 *               message: 'Like count retrieved'
 *               data: 5
 */

likeRouter.get('/comment/:commentId', async (req: Request, res: Response) => {
    try {
        const commentId = parseInt(req.params.commentId);
        const likes = await likeService.getAllLikesOnComment(commentId);
        res.status(200).json({ status: 'success', message: 'Like created ', data: likes.length });
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /like/resource/{resourceId}:
 *   get:
 *     tags:
 *       - likes
 *     summary: Get the number of likes on a Resource
 *     parameters:
 *       - name: resourceId
 *         in: path
 *         required: true
 *         description: The ID of the Resource
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: The number of likes on the resource
 *         content:
 *           application/json:
 *             example:
 *               status: 'success'
 *               message: 'Like count retrieved'
 *               data: 5
 */

likeRouter.get('/resource/:resourceId', async (req: Request, res: Response) => {
    try {
        const resourceId = parseInt(req.params.resourceId);
        const likes = await likeService.getAllLikesOnResource(resourceId);
        res.status(200).json({ status: 'success', message: 'Like created ', data: likes.length });
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /like/{profileId}/{resourceId}   :
 *   delete:
 *     tags:
 *       - profiles
 *     summary: Remove a like on some object (a comment or a resource)
 *     parameters:
 *       - name: profileId
 *         in: path
 *         required: true
 *         description: The ID of the Profile.
 *         schema:
 *           type: number
 *           example: 0
 *       - name: likeId
 *         in: path
 *         required: true
 *         description: The ID of Like
 *         schema:
 *           type: number
 *           example: 0
 *
 *     responses:
 *       200:
 *         description: The updated list of likes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Like'
 */

likeRouter.delete('/:profileId/:likeId', async (req: Request, res: Response) => {
    try {
        const profileId = parseInt(req.params.profileId);
        const likeId = String(req.params.likeId);
        const profile = await profileService.getProfileById(profileId);
        const likedResources = await profileService.updateField(profile, 'likes', likeId);
        res.status(200).json(likedResources);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { likeRouter };
