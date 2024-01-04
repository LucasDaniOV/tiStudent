import { Subject as SubjectPrisma } from '@prisma/client';

export class Subject {
    readonly id: number;
    readonly name: string;

    constructor(subject: { id: number; name: string }) {
        Subject.validate(subject.name, subject.id);
        this.id = subject.id;
        this.name = subject.name;
    }

    equals(otherSubject: Subject): boolean {
        return this.id === otherSubject.id && this.name === otherSubject.name;
    }

    static validate(name: string, id: number): void {
        Subject.validateName(name);
        Subject.validateId(id);
    }

    static validateId = (id: number) => {
        if (!id) throw new Error('id is required');
        if (typeof id !== 'number') throw new Error('id must be a number');
        if (id < 0) throw new Error('id cannot be negative');
    };

    static validateName = (name: string) => {
        if (!name) throw new Error('name is required');
        if (typeof name !== 'string') throw new Error('name must be a string');
        if (name.length > 60) throw new Error('name cannot be longer than 60 characters');
    };

    static from({ id, name }: SubjectPrisma): Subject {
        return new Subject({
            id,
            name,
        });
    }
}
