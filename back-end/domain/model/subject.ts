import { Subject as SubjectPrisma } from '@prisma/client';

export class Subject {
    readonly id: number;
    readonly name: string;

    constructor(subject: { id: number; name: string }) {
        Subject.validate(subject.name);
        this.id = subject.id;
        this.name = subject.name;
    }

    equals(otherSubject: Subject): boolean {
        return this.id === otherSubject.id && this.name === otherSubject.name;
    }

    static validate(name: string): void {
        Subject.validateName(name);
    }

    static validateName = (name: string) => {
        if (!name) throw new Error('name is required');
        if (name.length > 60) throw new Error('name cannot be longer than 60 characters');
    };

    static from({ id, name }: SubjectPrisma): Subject {
        return new Subject({
            id,
            name,
        });
    }
}
