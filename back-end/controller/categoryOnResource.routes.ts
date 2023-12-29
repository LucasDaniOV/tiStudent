import express, { NextFunction, Request, Response } from 'express';
import categoryOnResourceService from '../service/categoryOnResource.service';
import { CategoryOnResource } from '@prisma/client';

const categoryOnResourceRouter = express.Router();

categoryOnResourceRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId: number = parseInt(req.body.categoryId);
        const resourceId: number = parseInt(req.body.resourceId);

        const categoryOnResource: CategoryOnResource = await categoryOnResourceService.createCategoryOnResource(
            categoryId,
            resourceId
        );

        res.status(200).json({ status: 'success', message: 'category created on resource', categoryOnResource });
    } catch (error) {
        next(error);
    }
});

categoryOnResourceRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId: number | undefined = parseInt(req.query.categoryId as string);
        const resourceId: number | undefined = parseInt(req.query.resourceId as string);
        let categoriesOnResources: CategoryOnResource[];

        if (categoryId) {
            categoriesOnResources = await categoryOnResourceService.getCategoriesOnResourcesByCategoryId(categoryId);
        } else if (resourceId) {
            categoriesOnResources = await categoryOnResourceService.getCategoriesOnResourcesByResourceId(resourceId);
        } else {
            categoriesOnResources = await categoryOnResourceService.getCategoriesOnResources();
        }

        res.status(200).json({ status: 'success', message: 'categories on resources found', categoriesOnResources });
    } catch (error) {
        next(error);
    }
});

categoryOnResourceRouter.get('/category/:categoryId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId: number = parseInt(req.params.categoryId);

        const categoriesOnResources: CategoryOnResource[] =
            await categoryOnResourceService.getCategoriesOnResourcesByCategoryId(categoryId);

        res.status(200).json({
            status: 'success',
            message: 'categories on resource for category id found',
            categoriesOnResources,
        });
    } catch (error) {
        next(error);
    }
});

categoryOnResourceRouter.get('/resource/:resourceId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resourceId: number = parseInt(req.params.resourceId);

        const categoriesOnResources: CategoryOnResource[] =
            await categoryOnResourceService.getCategoriesOnResourcesByResourceId(resourceId);

        res.status(200).json({
            status: 'success',
            message: 'categories on resource for resource id found',
            categoriesOnResources,
        });
    } catch (error) {
        next(error);
    }
});

categoryOnResourceRouter.delete('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId: number = parseInt(req.query.categoryId as string);
        const resourceId: number = parseInt(req.query.resourceId as string);

        const deletedCategoryOnResource = await categoryOnResourceService.deleteCategoryOnResource(
            categoryId,
            resourceId
        );

        res.status(200).json({
            status: 'success',
            message: 'category on resource deleted',
            deletedCategoryOnResource,
        });
    } catch (error) {
        next(error);
    }
});

export { categoryOnResourceRouter };
