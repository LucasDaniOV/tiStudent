import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';

/**
 * @swagger
 *   components:
 *     schemas:
 *       User:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *             example: 1
 *           email:
 *             type: string
 *             format: email
 *             example: user@tistudent.be
 *           password:
 *             type: string
 *             format: password
 *             example: Str0ngPW!!!
 */
const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - users
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: list of all users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - users
 *     summary: Get user by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id of the user
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *         200:
 *           description: user with given id
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - users
 *     summary: Get user by email
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: email of the User
 *         schema:
 *           type: string
 *           example: user@tistudent.be
 *     responses:
 *         200:
 *           description: user with given email
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/email/:email', async (req: Request, res: Response) => {
    try {
        const userEmail = req.params.email;
        const user = await userService.getUserByEmail(userEmail);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags:
 *       - users
 *     summary: Create new user
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
 *     responses:
 *       200:
 *         description: new user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   format: int64
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: satoshi.nakamoto@gmail.com
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: Str0ngPW!!!2
 */
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = req.body as UserInput;
        const user = await userService.createUser(userInput);
        res.status(200).json({ status: 'success', message: 'User created', user });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - users
 *     summary: Remove user by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id of the user
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: boolean saying whether the user was removed or not
 *         content:
 *           application/json:
 *             type: boolean
 *             example: true
 */
userRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        res.status(200).json(await userService.removeUserById(userId));
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /users/{id}/email:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - users
 *     summary: Update user email
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id of the user
 *         schema:
 *           type: number
 *           example: 1
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
 *                 example: newemail@tistudent.be
 *     responses:
 *       200:
 *         description: updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   format: int64
 *                   example: 1
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: newemail@tistudent.be
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: Str0ngPW!!!
 */
userRouter.put('/:id/email', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const email = String(req.query.email);
        const user = await userService.updateEmailById(id, email);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /users/{id}/password:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - users
 *     summary: Update user password
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id of the user
 *         schema:
 *           type: number
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: Str0ngPW!!!2
 *     responses:
 *       200:
 *         description: updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   format: int64
 *                   example: 1
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: user@tistudent.be
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: Str0ngPW!!!2
 */
userRouter.put('/:id/password', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const password = String(req.query.password);
        const user = await userService.updatePasswordById(id, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /users/github:
 *   get:
 *     tags:
 *       - users
 *     summary: Get GitHub user
 */
userRouter.get('/login/github', async (req: Request, res: Response) => {
    try {
        const code = String(req.query.code);
        const access_token = await userService.getGithubAccessToken(code);
        const githubUser = await userService.getGithubUser(access_token);
        res.status(200).json(githubUser);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - users
 *     summary: Authenticate user
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput: UserInput = req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({ message: 'Authentication successful', ...response });
    } catch (error) {
        next(error);
    }
});

export { userRouter };
