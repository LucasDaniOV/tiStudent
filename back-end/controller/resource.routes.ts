import express, { NextFunction, Request, Response } from 'express';
import { Resource } from '../domain/model/resource';
import resourceService from '../service/resource.service';
import { ResourceInput } from '../types';

const resourceRouter = express.Router();

resourceRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resourceInput: ResourceInput = req.body as ResourceInput;

        const resource: Resource = await resourceService.createResource(resourceInput);

        res.status(200).json({ status: 'success', message: 'resource created', resource });
    } catch (error) {
        next(error);
    }
});

resourceRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resources: Resource[] = await resourceService.getAllResources();

        res.status(200).json({ status: 'success', message: 'resources found', resources });
    } catch (error) {
        next(error);
    }
});

resourceRouter.get('/:resourceId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resourceId: number = parseInt(req.params.resourceId);

        const resource: Resource = await resourceService.getResourceById(resourceId);

        res.status(200).json({ status: 'success', message: 'resource found', resource });
    } catch (error) {
        next(error);
    }
});

resourceRouter.put('/:resourceId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resourceId: number = parseInt(req.params.resourceId);
        const resourceInput: ResourceInput = req.body as ResourceInput;

        const updatedResource: Resource = await resourceService.updateResource(resourceId, resourceInput);

        res.status(200).json({ status: 'success', message: 'resource updated', updatedResource });
    } catch (error) {
        next(error);
    }
});

resourceRouter.delete('/:resourceId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resourceId: number = parseInt(req.params.resourceId);

        const deletedResource: Resource = await resourceService.deleteResource(resourceId);

        res.status(200).json({ status: 'success', message: 'resource deleted', deletedResource });
    } catch (error) {
        next(error);
    }
});

export { resourceRouter };
