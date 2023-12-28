import express, { NextFunction, Request, Response } from 'express';
import { Subject } from '../domain/model/subject';
import subjectService from '../service/subject.service';

const subjectRouter = express.Router();

subjectRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name: string = req.body.name;

        const subject: Subject = await subjectService.createSubject(name);

        res.status(200).json({ status: 'success', message: 'subject created', subject });
    } catch (error) {
        next(error);
    }
});

subjectRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subjects: Subject[] = await subjectService.getAllSubjects();

        res.status(200).json({ status: 'success', message: 'subjects found', subjects });
    } catch (error) {
        next(error);
    }
});

subjectRouter.get('/:subjectId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subjectId: number = parseInt(req.params.subjectId);

        const subject: Subject = await subjectService.getSubjectById(subjectId);

        res.status(200).json({ status: 'success', message: 'subject found', subject });
    } catch (error) {
        next(error);
    }
});

subjectRouter.put('/:subjectId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subjectId: number = parseInt(req.params.subjectId);
        const name: string = req.body.name;

        const updatedSubject: Subject = await subjectService.updateSubject(subjectId, name);

        res.status(200).json({ status: 'success', message: 'subject updated', updatedSubject });
    } catch (error) {
        next(error);
    }
});

subjectRouter.delete('/:subjectId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subjectId: number = parseInt(req.params.subjectId);

        const deletedSubject: Subject = await subjectService.deleteSubject(subjectId);

        res.status(200).json({ status: 'success', message: 'subject deleted', deletedSubject });
    } catch (error) {
        next(error);
    }
});

export default subjectRouter;
