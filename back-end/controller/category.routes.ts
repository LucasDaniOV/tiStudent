import express, { NextFunction, Request, Response } from 'express';
import { Category } from '../domain/model/category';
import categoryService from '../service/category.service';

const categoryRouter = express.Router();

categoryRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name: string = req.body.name;

        const category: Category = await categoryService.createCategory(name);

        res.status(200).json({ status: 'success', message: 'category created', category });
    } catch (error) {
        next(error);
    }
});

categoryRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories: Category[] = await categoryService.getAllCategories();

        res.status(200).json({ status: 'success', message: 'categories found', categories });
    } catch (error) {
        next(error);
    }
});

categoryRouter.get('/:categoryId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId: number = parseInt(req.params.categoryId);

        const category: Category = await categoryService.getCategoryById(categoryId);

        res.status(200).json({ status: 'success', message: 'category found', category });
    } catch (error) {
        next(error);
    }
});

categoryRouter.put('/:categoryId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId: number = parseInt(req.params.categoryId);
        const name: string = req.body.name;

        const updatedCategory: Category = await categoryService.updateCategory(categoryId, name);

        res.status(200).json({ status: 'success', message: 'category updated', updatedCategory });
    } catch (error) {
        next(error);
    }
});

categoryRouter.delete('/:categoryId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId: number = parseInt(req.params.categoryId);

        const deletedCategory: Category = await categoryService.deleteCategory(categoryId);

        res.status(200).json({ status: 'success', message: 'category deleted', deletedCategory });
    } catch (error) {
        next(error);
    }
});

export default categoryRouter;
