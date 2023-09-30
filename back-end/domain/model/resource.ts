import { User } from './user';
import { Category } from './category';
import { Subject } from './subject';

export class Resource {
    readonly id?: number;
    readonly creator: User;
    readonly createdAt: Date;
    readonly title: string;
    readonly description: string;
    readonly category: Category;
    readonly subject: Subject;

    constructor(resource: {
        id?: number;
        creator: User;
        createdAt: Date;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
    }) {
        this.validate(resource);

        this.id = resource.id;
        this.creator = resource.creator;
        this.createdAt = resource.createdAt;
        this.title = resource.title;
        this.description = resource.description;
        this.category = resource.category;
        this.subject = resource.subject;
    }

    equals(otherResource: {
        id: number;
        creator: User;
        createdAt: Date;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
    }): boolean {
        return (
            this.id === otherResource.id &&
            this.creator === otherResource.creator &&
            this.createdAt === otherResource.createdAt &&
            this.title === otherResource.title &&
            this.description === otherResource.description &&
            this.category == otherResource.category &&
            this.subject == otherResource.subject
        );
    }

    validate(resource: {
        id?: number;
        creator: User;
        createdAt: Date;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
    }): void {
        if (resource.title === '') throw new Error('Title cannot be empty');
        if (resource.title.length > 30) throw new Error('Title cannot be longer than 30 characters');
        if (resource.description === '') throw new Error('Description cannot be empty');
        if (resource.description.length > 500) throw new Error('Description cannot be longer than 500 characters');
        if (!Object.values(Category).includes(resource.category)) throw new Error('Invalid category');
        if (!Object.values(Subject).includes(resource.subject)) throw new Error('Invalid subject');
    }
}
