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
 *         id:
 *           type: number
 *           format: int64
 *           example: 0
 *         userId:
 *           type: number
 *           format: int64
 *           example: 1
 *         username:
 *           type: string
 *           example: 'johndoe'
 */
import express, { NextFunction, Request, Response } from 'express';
import profileService from '../service/profile.service';
import { ProfileInput } from '../types';

const profileRouter = express.Router();

/**
 * @swagger
 * /profiles:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - profiles
 *     summary: Get all profiles
 *     responses:
 *       200:
 *         description: List of Profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 */
profileRouter.get('/', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        const { role } = req.auth;
        const profiles = await profileService.getAllProfiles(role);
        res.status(200).json(profiles);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
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
profileRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const profile = await profileService.getProfileById(id);
        res.status(200).json({ status: 'success', message: 'Have fun with your profile', data: profile });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/{email}:
 *   get:
 *     tags:
 *       - profiles
 *     summary: Get a profile by user email
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *           required: true
 *           description: The email of the user that this Profile belongs to
 *           example: alice12@prisma.io
 *     responses:
 *       200:
 *         description: A profile object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 */
profileRouter.get('/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params.email;
        const profile = await profileService.getProfileByEmail(email);
        res.status(200).json(profile);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/{profileId}/username:
 *   get:
 *     security:
 *       - bearerAuth: []
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

profileRouter.get('/:id/username', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId = parseInt(req.params.id);
        const profile = await profileService.getProfileById(profileId);
        const username = await profileService.getProfileField(profile, 'username');
        res.status(200).json(username);
    } catch (error) {
        next(error);
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

profileRouter.get('/:id/bio', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId = parseInt(req.params.id);
        const profile = await profileService.getProfileById(profileId);
        const bio = await profileService.getProfileField(profile, 'bio');
        res.status(200).json(bio);
    } catch (error) {
        next(error);
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

profileRouter.get('/:id/latestActivity', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId = parseInt(req.params.id);
        const profile = await profileService.getProfileById(profileId);
        const latestActivity = await profileService.getProfileField(profile, 'latestActivity');
        res.status(200).json(latestActivity);
    } catch (error) {
        next(error);
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

profileRouter.get('/:id/likedResources', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        const { role } = req.auth.role;
        const profileId = parseInt(req.params.id);
        const profile = await profileService.getProfileById(profileId);
        const likedResources = await profileService.getProfileField(profile, 'likedResources');
        res.status(200).json(likedResources);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/{profileId}/sharedResources:
 *   get:
 *     tags:
 *       - profiles
 *     summary: give an overview of a Profiles' shared Resources
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

profileRouter.get('/:id/sharedResources', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        const { role } = req.auth.role;
        const profileId = parseInt(req.params.id);
        const profile = await profileService.getProfileById(profileId);
        const sharedResources = await profileService.getProfileField(profile, 'sharedResources');
        res.status(200).json(sharedResources);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/{profileId}/bio?newBio:
 *   put:
 *     tags:
 *       - profiles
 *     summary: update a Profiles' bio
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
 *     responses:
 *       200:
 *         description: The updated Profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 */

profileRouter.put('/:id/bio', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId = parseInt(req.params.id);
        const newBio = String(req.query.newBio);
        const profile = await profileService.getProfileById(profileId);
        const bio = await profileService.updateField(profile.id, 'bio', newBio);
        res.status(200).json(bio);
    } catch (error) {
        next(error);
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
profileRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId = parseInt(req.params.id);
        const deleted = await profileService.deleteProfile(profileId);
        res.status(200).json({ status: 'success', message: 'Profile deleted', deleted });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/signup:
 *   post:
 *     tags:
 *       - profiles
 *     summary: Create new Profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: satoshi.nakamoto@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Str0ngPW!!!2
 *               role:
 *                 type: string
 *                 format: text
 *                 example: user
 *               username:
 *                 type: string
 *                 format: text
 *                 example: JohnathanDoesItAll
 *               bio:
 *                 type: string
 *                 format: text
 *                 example: Software Engineer at Google
 *     responses:
 *       200:
 *         description: new Profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 */
profileRouter.post('/signup', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        const profileInput = req.body as ProfileInput;
        const user = await profileService.createProfile(profileInput);
        res.status(200).json({ status: 'success', message: 'Profile created', user });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/github:
 *   get:
 *     tags:
 *       - profiles
 *     summary: Get GitHub account
 */
profileRouter.get('/login/github', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        const code = String(req.query.code);
        const access_token = await profileService.getGithubAccessToken(code);
        const githubUser = await profileService.getGithubUser(access_token);
        res.status(200).json(githubUser);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/login:
 *   post:
 *     tags:
 *       - profiles
 *     summary: Authenticate user
 */
profileRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const profileInput: ProfileInput = req.body;
        const response = await profileService.authenticate(profileInput);
        res.status(200).json({ message: 'Authentication successful', ...response });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/exists/email?email:
 *   get:
 *     security:
 *       - bearerAuth: []
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

profileRouter.get('/exists/email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = String(req.query.email);
        try {
            await profileService.getProfileByEmail(email);
            res.status(200).json({ status: true }); // If profile is returned then return status: true
        } catch (error) {
            res.status(200).json({ status: false }); // If profile is not returned and error is thrown then return status: false
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /profiles/leaderboard/10:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - profiles
 *     summary: Get the leaderboard
 *     responses:
 *       200:
 *         description: A list of profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 */

profileRouter.get('/leaderboard/10', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profiles = await profileService.getLeaderBoard();
        res.status(200).json(profiles);
    } catch (error) {
        next(error);
    }
});

export { profileRouter };
