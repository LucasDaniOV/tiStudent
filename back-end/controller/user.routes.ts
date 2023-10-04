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
 *           email:
 *             type: string
 *             format: email
 *           password:
 *             type: string
 *             format: password
 *       UserInput:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           email:
 *             type: string
 *             format: email
 *           password:
 *             type: string
 *             format: password
 */

import express, { Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - users
 *     summary: Add a new User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       '200':
 *         description: Information about the new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

userRouter.post('/', (req: Request, res: Response) => {
    try {
        const user = <UserInput>req.body;
        const result = userService.createUser(user);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - users
 *     summary: Returns a list of all the users
 *     responses:
 *       '200':
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/', (req: Request, res: Response) => {
    try {
        const users = userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { userRouter };
