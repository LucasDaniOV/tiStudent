import express, { NextFunction, Request, Response } from 'express';
import subjectOnResourceService from '../service/subjectOnResource.service';
import { SubjectOnResource } from '@prisma/client';
import { AuthenticationResponse, SubjectOnResourceInput } from '../types';

const subjectOnResourceRouter = express.Router();

subjectOnResourceRouter.post(
    '/',
    async (req: Request & { auth: AuthenticationResponse }, res: Response, next: NextFunction) => {
        try {
            const subjectOnResourceInput: SubjectOnResourceInput = req.body;
            const auth: AuthenticationResponse = req.auth;

            const subjectOnResource: SubjectOnResource = await subjectOnResourceService.createSubjectOnResource(
                auth,
                subjectOnResourceInput
            );

            res.status(200).json({ status: 'success', message: 'subject created on resource', subjectOnResource });
        } catch (error) {
            next(error);
        }
    }
);

subjectOnResourceRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subjectId: number | undefined = parseInt(req.query.subjectId as string);
        const resourceId: number | undefined = parseInt(req.query.resourceId as string);
        let subjectsOnResources: SubjectOnResource[];

        if (subjectId) {
            subjectsOnResources = await subjectOnResourceService.getSubjectsOnResourcesBySubjectId(subjectId);
        } else if (resourceId) {
            subjectsOnResources = await subjectOnResourceService.getSubjectsOnResourcesByResourceId(resourceId);
        } else {
            subjectsOnResources = await subjectOnResourceService.getSubjectsOnResources();
        }

        res.status(200).json({ status: 'success', message: 'subjects on resources found', subjectsOnResources });
    } catch (error) {
        next(error);
    }
});

subjectOnResourceRouter.get('/subject/:subjectId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subjectId: number = parseInt(req.params.subjectId);

        const subjectsOnResources: SubjectOnResource[] =
            await subjectOnResourceService.getSubjectsOnResourcesBySubjectId(subjectId);

        res.status(200).json({
            status: 'success',
            message: 'subjects on resource for subject id found',
            subjectsOnResources,
        });
    } catch (error) {
        next(error);
    }
});

subjectOnResourceRouter.get('/resource/:resourceId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resourceId: number = parseInt(req.params.resourceId);

        const subjectsOnResources: SubjectOnResource[] =
            await subjectOnResourceService.getSubjectsOnResourcesByResourceId(resourceId);

        res.status(200).json({
            status: 'success',
            message: 'subjects on resource for resource id found',
            subjectsOnResources,
        });
    } catch (error) {
        next(error);
    }
});

subjectOnResourceRouter.delete(
    '/',
    async (req: Request & { auth: AuthenticationResponse }, res: Response, next: NextFunction) => {
        try {
            const subjectId: number = parseInt(req.query.subjectId as string);
            const resourceId: number = parseInt(req.query.resourceId as string);
            const auth: AuthenticationResponse = req.auth;

            const deletedSubjectOnResource = await subjectOnResourceService.deleteSubjectOnResource(
                auth,
                subjectId,
                resourceId
            );

            res.status(200).json({
                status: 'success',
                message: 'subject on resource deleted',
                deletedSubjectOnResource,
            });
        } catch (error) {
            next(error);
        }
    }
);

export { subjectOnResourceRouter };
