import express, { Request, Response } from 'express';
import resourceService from '../service/resource.service';
import { ResourceInput } from '../types';

const resourceRouter = express.Router();

// get all resources
resourceRouter.get('/', async (req: Request, res: Response) => {
    try {
        const resources = await resourceService.getAllResources();
        res.status(200).json(resources);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

// get resource by id
resourceRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const resource = await resourceService.getResourceById(id);
        res.status(200).json(resource);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

// create resource
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
