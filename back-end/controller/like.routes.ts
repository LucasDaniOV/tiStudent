import express, { Request, Response } from 'express';
import commentService from '../service/comment.service';
import likeService from '../service/like.service';
import profileService from '../service/profile.service';

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
        const like = await likeService.likeResource(profileId, resourceId);
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

likeRouter.post('/:profileId/comment/:commentId', async (req: Request, res: Response) => {
    try {
        const profileId = parseInt(req.params.profileId);
        const commentId = parseInt(req.params.commentId);
        const like = await likeService.likeComment(profileId, commentId);
        res.status(200).json({ status: 'success', message: 'Like created ', data: like });
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
