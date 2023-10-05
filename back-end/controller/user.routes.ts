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
 *             example: Str0ngPW!!!
 */

import express, { Request, Response } from 'express';
import userService from '../service/user.service';
import { User } from '../domain/model/user';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - users
 *     summary: Create a new User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Information about the new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

userRouter.post('/', (req: Request, res: Response) => {
    try {
        const user = <User>req.body;
        res.status(200).json(userService.createUser(user));
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - users
 *     summary: Returns User with given id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the User
 *         schema:
 *           type: number
 *           example: 0
 *     responses:
 *         200:
 *           description: The User with the id
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 */

userRouter.get('/:id', (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        res.status(200).json(userService.getUserById(userId));
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
 *       200:
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

/**
 * @swagger
 * /users:
 *   put:
 *     tags:
 *       - users
 *     summary: Update a field of User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The User with updated field
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

userRouter.put('/', (req: Request, res: Response) => {
    try {
        const user = <User>req.body;
        res.status(200).json(userService.updateUser(user));
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - users
 *     summary: Remove a of User
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the User
 *         schema:
 *           type: number
 *           example: 0
 *     responses:
 *       200:
 *         description: A boolean saying whether the user was removed or not
 *         content:
 *           text/plain:
 *             type: boolean
 *             example: true
 */

userRouter.delete('/:id', (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        res.status(200).json(userService.removeUser(userId));
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { userRouter };
