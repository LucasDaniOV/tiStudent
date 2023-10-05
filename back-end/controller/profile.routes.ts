/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           example: 0
 *         user:
 *           ref: '#/components/schemas/User'
 *         username:
 *           type: string
 *           example: 'johndoe'
 *         bio:
 *           type: string
 *           example: 'Software engineer at Google'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: '2021-01-01T00:00:00.000Z'
 *         latestActivity:
 *           type: string
 *           format: date-time
 *           example: '2023-01-01T00:00:00.000Z'
 *     ProfileInput:
 *       type: object
 *       properties:
 *         userId:
 *           type: number
 *           format: int64
 *           example: 1
 *         username:
 *           type: string
 *           example: 'johndoe'
 *     Resource:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           example: 0
 *         creator:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               format: int64
 *               example: 1
 *             email:
 *               type: string
 *               example: firstname.lastname@ucll.be
 *             password:
 *               type: string
 *               example: password
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2023-10-03T19:27:40.812Z
 *         title:
 *           type: string
 *           example: Programming 1 Cheat Sheet
 *         description:
 *           type: string
 *           example: Includes all the important concepts from Programming 1
 *         category:
 *           type: string
 *           example: Cheat Sheet
 *         subject:
 *           type: string
 *           example: Programming 1
 */
import express, { Request, Response } from 'express';
import profileService from '../service/profile.service';
import { ProfileInput } from '../types';

const profileRouter = express.Router();

/**
 * @swagger
 * /profiles:
 *   get:
 *     tags:
 *       - profiles
 *     summary: Get all profiles
 *     responses:
 *       200:
 *         description: List of profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 */
profileRouter.get('/', (req: Request, res: Response) => {
    try {
        const profiles = profileService.getAllProfiles();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *     tags:
 *       - profiles
 *     summary: Get a profile by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           format: int64
 *           required: true
 *           description: The profile id
 *     responses:
 *       200:
 *         description: A profile object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 */
profileRouter.get('/:id', (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const profile = profileService.getProfileById(id);
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /profiles:
 *   post:
 *     tags:
 *       - profiles
 *     summary: Create a profile
 *     requestBody:
 *       description: Profile object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileInput'
 *     responses:
 *       200:
 *         description: The created profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 */
profileRouter.post('/', (req: Request, res: Response) => {
    try {
        const profileInput = req.body as ProfileInput;
        const profile = profileService.createProfile(profileInput);
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /profiles/like/{profileId}/{resourceId}:
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
 *         description: The ID of the Resource.
 *         schema:
 *           type: number
 *           example: 0
 *     responses:
 *       200:
 *         description: The liked Resource
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 */

profileRouter.post('/like/:profileId/:resourceId', async (req: Request, res: Response) => {
    try {
        const profileId = parseInt(req.params.profileId);
        const resourceId = parseInt(req.params.resourceId);
        const resource = await profileService.likeResource({ profileId, resourceId });
        res.status(200).json(resource);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /profiles/{profileId}/likedPosts:
 *   get:
 *     tags:
 *       - profiles
 *     summary: give an overview of a Profiles' liked Resources
 *     parameters:
 *       - name: profileId
 *         in: path
 *         required: true
 *         description: The ID of the Profile.
 *         schema:
 *           type: number
 *           example: 0
 *
 *     responses:
 *       200:
 *         description: The liked Resources of the Profile
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 */

profileRouter.get('/:id/likedPosts', (req: Request, res: Response) => {
    try {
        const profileId = parseInt(req.params.id);
        const profile = profileService.getProfileById(profileId);
        const resources = profile.getLikedResources();
        res.status(200).json(resources);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { profileRouter };
