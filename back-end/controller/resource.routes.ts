/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
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
import resourceService from '../service/resource.service';
import { ResourceInput } from '../types';

const resourceRouter = express.Router();

/**
 * @swagger
 * /resources:
 *   get:
 *     tags:
 *       - resources
 *     summary: Get all resources
 *     responses:
 *       200:
 *         description: List of resources
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 */
resourceRouter.get('/', async (req: Request, res: Response) => {
    try {
        const resources = await resourceService.getAllResources();
        res.status(200).json(resources);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /resources/{id}:
 *   get:
 *     tags:
 *       - resources
 *     summary: Get a resource by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           format: int64
 *           required: true
 *           description: The resource id
 *     responses:
 *       200:
 *         description: A resource object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 */
resourceRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const resource = await resourceService.getResourceById(id);
        res.status(200).json(resource);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /resources:
 *   post:
 *     tags:
 *       - resources
 *     summary: Create a new resource
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               creator:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     format: int64
 *                     example: 1
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-10-03T19:27:40.812Z
 *               title:
 *                 type: string
 *                 example: Programming 1 Cheat Sheet
 *               description:
 *                 type: string
 *                 example: Includes all the important concepts from Programming 1
 *               category:
 *                 type: string
 *                 example: Cheat Sheet
 *               subject:
 *                 type: string
 *                 example: Programming 1
 *     responses:
 *       200:
 *         description: The created resource object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 */
resourceRouter.post('/', async (req: Request, res: Response) => {
    try {
        const resource = req.body as ResourceInput;
        const result = await resourceService.createResource(resource);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { resourceRouter };
