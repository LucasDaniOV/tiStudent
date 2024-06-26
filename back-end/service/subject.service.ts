import { UnauthorizedError } from 'express-jwt';
import subjectDb from '../domain/data-access/subject.db';
import { Subject } from '../domain/model/subject';
import { AuthenticationResponse } from '../types';

const createSubject = async (name: string, auth: AuthenticationResponse): Promise<Subject> => {
    if (auth.role !== 'ADMIN') {
        throw new UnauthorizedError('invalid_token', { message: 'Only admins can create subjects' });
    }

    Subject.validateName(name);

    if (await subjectDb.getSubjectByName(name)) throw new Error('Subject already exists');

    const subject = await subjectDb.createSubject(name);
    return subject;
};

const getSubjectByName = async (name: string): Promise<Subject> => {
    const subject = await subjectDb.getSubjectByName(name);
    if (!subject) throw new Error('Subject not found');
    return subject;
};

const getSubjectById = async (id: number): Promise<Subject> => {
    const subject = await subjectDb.getSubjectById(id);
    if (!subject) throw new Error('Subject not found');
    return subject;
};

const getAllSubjects = async (): Promise<Subject[]> => await subjectDb.getAllSubjects();

const updateSubject = async (id: number, name: string, auth: AuthenticationResponse): Promise<Subject> => {
    if (auth.role !== 'ADMIN') {
        throw new UnauthorizedError('invalid_token', { message: 'Only admins can update subjects' });
    }

    Subject.validateName(name);

    await getSubjectById(id);

    if (await subjectDb.getSubjectByName(name)) throw new Error('Subject already exists');

    const subject = await subjectDb.updateSubject(id, name);
    return subject;
};

const deleteSubject = async (id: number, auth: AuthenticationResponse): Promise<Subject> => {
    if (auth.role !== 'ADMIN') {
        throw new UnauthorizedError('invalid_token', { message: 'Only admins can delete subjects' });
    }
    await getSubjectById(id);

    return subjectDb.deleteSubject(id);
};

export default {
    createSubject,
    getSubjectById,
    getSubjectByName,
    getAllSubjects,
    updateSubject,
    deleteSubject,
};
