import database from '../../util/database';
import { Subject } from '../model/subject';

const createSubject = async (name: string): Promise<Subject> => {
    try {
        const subject = await database.subject.create({
            data: {
                name,
            },
        });
        return Subject.from(subject);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when creating subject. See server log for details.');
    }
};

const getSubjectById = async (id: number): Promise<Subject> => {
    try {
        const subject = await database.subject.findUnique({
            where: {
                id,
            },
        });
        if (subject) return Subject.from(subject);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting subject by id. See server log for details.');
    }
};

const getSubjectByName = async (name: string): Promise<Subject> => {
    try {
        const subject = await database.subject.findUnique({
            where: {
                name,
            },
        });
        if (subject) return Subject.from(subject);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting subject by name. See server log for details.');
    }
};

const getAllSubjects = async (): Promise<Subject[]> => {
    try {
        const subjects = await database.subject.findMany();
        return subjects.map((subject) => Subject.from(subject));
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting all subjects. See server log for details.');
    }
};

const updateSubject = async (id: number, name: string): Promise<Subject> => {
    try {
        const subject = await database.subject.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });
        return Subject.from(subject);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating subject. See server log for details.');
    }
};

const deleteSubject = async (id: number): Promise<Subject> => {
    try {
        const prismaSubject = await database.subject.delete({
            where: {
                id,
            },
        });
        if (prismaSubject) return Subject.from(prismaSubject);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when deleting subject. See server log for details.');
    }
};

export default {
    createSubject,
    getSubjectById,
    getSubjectByName,
    getAllSubjects,
    updateSubject,
    deleteSubject,
};
