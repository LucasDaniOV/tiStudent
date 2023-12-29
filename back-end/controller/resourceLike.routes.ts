import { ResourceLike } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import resourceLikeService from '../service/resourceLike.service';

const resourceLikeRouter = express.Router();

resourceLikeRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId: number = parseInt(req.body.profileId);
        const resourceId: number = parseInt(req.body.resourceId);

        const resourceLike: ResourceLike = await resourceLikeService.createResourceLike(profileId, resourceId);

        res.status(200).json({ status: 'success', message: 'resource like created', resourceLike });
    } catch (error) {
        next(error);
    }
});

resourceLikeRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId: number | undefined = parseInt(req.query.profileId as string);
        const resourceId: number | undefined = parseInt(req.query.resourceId as string);

        let resourceLikes: ResourceLike[];

        if (profileId && resourceId) {
            resourceLikes = [await resourceLikeService.getResourceLikeByProfileIdAndResourceId(profileId, resourceId)];
        } else if (profileId) {
            resourceLikes = await resourceLikeService.getResourceLikesByProfileId(profileId);
        } else if (resourceId) {
            resourceLikes = await resourceLikeService.getResourceLikesByResourceId(resourceId);
        } else {
            resourceLikes = await resourceLikeService.getResourceLikes();
        }

        res.status(200).json({ status: 'success', message: 'resource likes found', resourceLikes });
    } catch (error) {
        next(error);
    }
});

resourceLikeRouter.delete('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileId: number = parseInt(req.query.profileId as string);
        const resourceId: number = parseInt(req.query.resourceId as string);

        const deletedResourceLike: ResourceLike = await resourceLikeService.deleteResourceLike(profileId, resourceId);

        res.status(200).json({ status: 'success', message: 'resource like deleted', deletedResourceLike });
    } catch (error) {
        next(error);
    }
});

export { resourceLikeRouter };
