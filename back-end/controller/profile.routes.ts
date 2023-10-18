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
 *           $ref: '#/components/schemas/User'
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
 *         likedResources:
 *           type: array
 *           example: []
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

// profileRouter.post('/like/:profileId/:resourceId', async (req: Request, res: Response) => {
//     try {
//         const profileId = parseInt(req.params.profileId);
//         const resourceId = parseInt(req.params.resourceId);
//         const resource = await profileService.likeResource({ profileId, resourceId });
//         res.status(200).json(resource);
//     } catch (error) {
//         res.status(400).json({ status: 'error', errorMessage: error.message });
//     }
// });

/**
 * @swagger
 * /profiles/{profileId}/username:
 *   get:
 *     tags:
 *       - profiles
 *     summary: return a Profiles' username
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
 *         description: The username of the Profile
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "johndoe"
 */

profileRouter.get('/:id/username', (req: Request, res: Response) => {
    try {
        const profileId = parseInt(req.params.id);
        const profile = profileService.getProfileById(profileId);
        const username = profileService.getProfileField(profile, 'username');
        res.status(200).json(username);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /profiles/{profileId}/bio:
 *   get:
 *     tags:
 *       - profiles
 *     summary: return a Profiles' bio
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
 *         description: The bio of the Profile
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Software Engineer at Google"
 */

profileRouter.get('/:id/bio', (req: Request, res: Response) => {
    try {
        const profileId = parseInt(req.params.id);
        const profile = profileService.getProfileById(profileId);
        const bio = profileService.getProfileField(profile, 'bio');
        res.status(200).json(bio);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /profiles/{profileId}/latestActivity:
 *   get:
 *     tags:
 *       - profiles
 *     summary: return a Profiles' latest activity
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
 *         description: A timestamp of the latest activity of the Profile
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               format: date-time
 *               example: '2023-10-03T19:27:40.812Z'
 */

profileRouter.get('/:id/latestActivity', (req: Request, res: Response) => {
    try {
        const profileId = parseInt(req.params.id);
        const profile = profileService.getProfileById(profileId);
        const latestActivity = profileService.getProfileField(profile, 'latestActivity');
        res.status(200).json(latestActivity);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /profiles/{profileId}/likedResources:
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

profileRouter.get('/:id/likedResources', (req: Request, res: Response) => {
    try {
        const profileId = parseInt(req.params.id);
        const profile = profileService.getProfileById(profileId);
        const likedResources = profileService.getProfileField(profile, 'likedResources');
        res.status(200).json(likedResources);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /profiles/{profileId}/username?newUsername:
 *   put:
 *     tags:
 *       - profiles
 *     summary: update a Profiles' username
 *     parameters:
 *       - name: profileId
 *         in: path
 *         required: true
 *         description: The ID of the Profile.
 *         schema:
 *           type: number
 *           example: 0
 *       - name: newUsername
 *         in: query
 *         required: true
 *         description: The new username for the Profile
 *         schema:
 *           type: string
 *           example: "JohnathanDoesitall"
 *
 *     responses:
 *       200:
 *         description: The updated Profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 */

profileRouter.put('/:id/username', async (req: Request, res: Response) => {
    try {
        const profileId = parseInt(req.params.id);
        const newUsername = String(req.query.newUsername);
        const profile = profileService.getProfileById(profileId);
        const username = await profileService.updateField(profile, 'username', newUsername);
        res.status(200).json(username);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /profiles/{profileId}/bio?newBio:
 *   put:
 *     tags:
 *       - profiles
 *     summary: return a Profiles' bio
 *     parameters:
 *       - name: profileId
 *         in: path
 *         required: true
 *         description: The ID of the Profile.
 *         schema:
 *           type: number
 *           example: 0
 *       - name: newBio
 *         in: query
 *         required: true
 *         description: The new Bio for the Profile
 *         schema:
 *           type: string
 *           example: "CEO at Google"
 *
 *     responses:
 *       200:
 *         description: The updated Profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 */

profileRouter.put('/:id/bio', async (req: Request, res: Response) => {
    try {
        const profileId = parseInt(req.params.id);
        const newBio = String(req.query.newBio);
        const profile = profileService.getProfileById(profileId);
        const bio = await profileService.updateField(profile, 'bio', newBio);
        res.status(200).json(bio);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /profiles/{profileId}/likedResources?resourceId:
 *   put:
 *     tags:
 *       - profiles
 *     summary: unlike a Resource (thus update the likedResources array)
 *     parameters:
 *       - name: profileId
 *         in: path
 *         required: true
 *         description: The ID of the Profile.
 *         schema:
 *           type: number
 *           example: 0
 *       - name: resourceId
 *         in: query
 *         required: true
 *         description: The ID of the Resource to be unliked
 *         schema:
 *           type: number
 *           example: 0
 *
 *     responses:
 *       200:
 *         description: The updated Profile (and its updated likedResources)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 */

profileRouter.put('/:id/likedResources', async (req: Request, res: Response) => {
    try {
        const profileId = parseInt(req.params.id);
        const resourceId = String(req.query.resourceId);
        const profile = profileService.getProfileById(profileId);
        const likedResources = await profileService.updateField(profile, 'likedResources', resourceId);
        res.status(200).json(likedResources);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /profiles/{profileId}:
 *   delete:
 *     tags:
 *       - profiles
 *     summary: Delete a Profile
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
 *         description: A boolean saying whether or not the Profile was deleted
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: true
 */
profileRouter.delete('/:id', (req: Request, res: Response) => {
    try {
        const profileId = parseInt(req.params.id);
        const profile = profileService.getProfileById(profileId);
        res.status(200).json(profileService.deleteProfile(profile));
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { profileRouter };
