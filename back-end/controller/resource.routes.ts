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
 *           $ref: "#/components/schemas/ProfileInput"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-10-03T19:27:40.812Z"
 *         title:
 *           type: string
 *           example: "Programming 1 Cheat Sheet"
 *         description:
 *           type: string
 *           example: "Includes all the important concepts from Programming 1"
 *         category:
 *           type: string
 *           example: "Cheat Sheet"
 *         subject:
 *           type: string
 *           example: "Programming 1"
 */
import express, { Request, Response } from 'express';
import resourceService from '../service/resource.service';
import { ResourceInput } from '../types';
import { Subject } from '../domain/model/subject';
import { Category } from '../domain/model/category';

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
 *                 $ref: "#/components/schemas/Profile"
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-10-03T19:27:40.812Z"
 *               title:
 *                 type: string
 *                 example: "Programming 1 Cheat Sheet"
 *               description:
 *                 type: string
 *                 example: "Includes all the important concepts from Programming 1"
 *               category:
 *                 type: string
 *                 example: "Cheat Sheet"
 *               subject:
 *                 type: string
 *                 example: "Programming 1"
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

/**
 * @swagger
 * /resources/{resourceId}/{field}:
 *   get:
 *     tags:
 *       - resources
 *     summary: get the value of a Resource's field
 *     parameters:
 *       - name: resourceId
 *         in: path
 *         required: true
 *         description: The ID of the Resource.
 *         schema:
 *           type: number
 *           example: 0
 *       - name: field
 *         in: path
 *         required: true
 *         description: The field you want to view the value of
 *         schema:
 *           type: string
 *           example: "title"
 *
 *     responses:
 *       200:
 *         description: The value of the Resource's field
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Programming 1 Cheat Sheet"
 */
resourceRouter.get('/:id/:field', async (req: Request, res: Response) => {
    try {
        const resourceId = parseInt(req.params.id);
        const resource = await resourceService.getResourceById(resourceId);
        const field = String(req.params.field);
        res.status(200).json(resourceService.getField(resource, field));
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /resources/{resourceId}/{field}:
 *   put:
 *     tags:
 *       - resources
 *     summary: update the value of a Resource's field
 *     parameters:
 *       - name: resourceId
 *         in: path
 *         required: true
 *         description: The ID of the Resource.
 *         schema:
 *           type: number
 *           example: 0
 *       - name: field
 *         in: path
 *         required: true
 *         description: The field you want to update
 *         schema:
 *           type: string
 *           example: "title"
 *       - name: newValue
 *         in: query
 *         required: true
 *         description: The value you want to update the field with
 *         schema:
 *           type: string
 *           example: "Programming 2 Cheat Sheet"
 *
 *     responses:
 *       200:
 *         description: The value of the Resource's field
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 */
resourceRouter.put('/:id/:field', async (req: Request, res: Response) => {
    try {
        const resourceId = parseInt(req.params.id);
        const field = String(req.params.field);
        const newValue = String(req.query.newValue);
        res.status(200).json(await resourceService.updateField(resourceId, field, newValue));
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /resources/{resourceId}:
 *   delete:
 *     tags:
 *       - resources
 *     summary: Delete a Resource
 *     parameters:
 *       - name: resourceId
 *         in: path
 *         required: true
 *         description: The ID of the Resource.
 *         schema:
 *           type: number
 *           example: 0
 *
 *     responses:
 *       200:
 *         description: A boolean saying whether or not the Resource was deleted
 *         content:
 *           text/plain:
 *             type: boolean
 *             example: true
 */
resourceRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const resourceId = parseInt(req.params.id);
        const resource = await resourceService.getResourceById(resourceId);
        if (resource) res.status(200).json(resourceService.deleteResource(resourceId));
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { resourceRouter };
