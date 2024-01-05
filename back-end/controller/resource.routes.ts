import express, { NextFunction, Request, Response } from 'express';
import { Resource } from '../domain/model/resource';
import resourceService from '../service/resource.service';
import { AuthenticationResponse, ResourceData, ResourceInput } from '../types';

const resourceRouter = express.Router();

resourceRouter.post('/', async (req: Request & { auth: AuthenticationResponse }, res: Response, next: NextFunction) => {
    try {
        const resourceInput: ResourceInput = req.body as ResourceInput;
        const auth: AuthenticationResponse = req.auth;

        const resource: Resource = await resourceService.createResource(auth, resourceInput);

        res.status(200).json({ status: 'success', message: 'resource created', resource });
    } catch (error) {
        next(error);
    }
});

resourceRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId: number | undefined = parseInt(req.query.profileId as string);

        let resources: Resource[] | ResourceData[];

        if (profileId) {
            resources = await resourceService.getResourcesByProfileId(profileId);
        } else {
            resources = await resourceService.getAllResources();
        }

        res.status(200).json({ status: 'success', message: 'resources found', resources });
    } catch (error) {
        next(error);
    }
});

resourceRouter.get('/:resourceId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resourceId: number = parseInt(req.params.resourceId);

        const resource: ResourceData = await resourceService.getResourceById(resourceId);

        res.status(200).json({ status: 'success', message: 'resource found', resource });
    } catch (error) {
        next(error);
    }
});

resourceRouter.put(
    '/:resourceId',
    async (req: Request & { auth: AuthenticationResponse }, res: Response, next: NextFunction) => {
        try {
            const resourceId: number = parseInt(req.params.resourceId);
            const resourceInput: ResourceInput = req.body as ResourceInput;
            const auth: AuthenticationResponse = req.auth;

            const updatedResource: Resource = await resourceService.updateResource(auth, resourceId, resourceInput);

            res.status(200).json({ status: 'success', message: 'resource updated', updatedResource });
        } catch (error) {
            next(error);
        }
    }
);

resourceRouter.delete(
    '/:resourceId',
    async (req: Request & { auth: AuthenticationResponse }, res: Response, next: NextFunction) => {
        try {
            const resourceId: number = parseInt(req.params.resourceId);
            const auth: AuthenticationResponse = req.auth;

            const deletedResource: Resource = await resourceService.deleteResource(auth, resourceId);

            res.status(200).json({ status: 'success', message: 'resource deleted', deletedResource });
        } catch (error) {
            next(error);
        }
    }
);

export { resourceRouter };
