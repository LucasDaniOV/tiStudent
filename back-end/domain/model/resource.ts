import { Profile as ProfilePrisma, Resource as ResourcePrisma } from '@prisma/client';
import { Category } from './category';
import { Profile } from './profile';
import { Subject } from './subject';

export class Resource {
    readonly id?: number;
    readonly createdAt?: Date;
    readonly title: string;
    readonly description: string;
    readonly category: Category;
    readonly subject: Subject;
    readonly creator: Profile;

    constructor(resource: {
        id?: number;
        createdAt?: Date;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
        creator: Profile;
    }) {
        this.validate(resource);

        this.id = resource.id;
        this.createdAt = resource.createdAt ? resource.createdAt : new Date();
        this.title = resource.title;
        this.description = resource.description;
        this.category = resource.category;
        this.subject = resource.subject;
        this.creator = resource.creator;
    }

    equals(otherResource: {
        title: string;
        description: string;
        category: Category;
        subject: Subject;
        creator: Profile;
    }): boolean {
        return (
            this.title === otherResource.title &&
            this.description === otherResource.description &&
            this.category == otherResource.category &&
            this.subject == otherResource.subject &&
            this.creator === otherResource.creator
        );
    }

    validate(resource: {
        title: string;
        description: string;
        category: Category;
        subject: Subject;
        creator: Profile;
    }): void {
        this.validateTitle(resource.title);
        this.validateDescription(resource.description);
        this.validateCategory(resource.category);
        this.validateSubject(resource.subject);
        this.validateCreator(resource.creator);
    }

    validateTitle = (title: string) => {
        if (!title) throw new Error('title is required');
        if (title.length > 60) throw new Error('title cannot be longer than 60 characters');
    };

    validateDescription = (description: string) => {
        if (!description) throw new Error('description is required');
        if (description.length > 500) throw new Error('description cannot be longer than 500 characters');
    };

    validateCategory = (category: Category) => {
        if (!category) throw new Error('category is required');
        if (!Object.values(Category).includes(category as Category)) throw new Error('Invalid category');
    };

    validateSubject = (subject: Subject) => {
        if (!subject) throw new Error('subject is required');
        if (!Object.values(Subject).includes(subject as Subject)) throw new Error('Invalid subject');
    };

    validateCreator = (creator: Profile) => {
        if (!creator) throw new Error('creator Profile is required');
    };

    static from({
        id,
        creator,
        createdAt,
        title,
        description,
        category,
        subject,
    }: ResourcePrisma & { creator: ProfilePrisma }) {
        return new Resource({
            id,
            creator: Profile.from(creator),
            createdAt: createdAt,
            title,
            description,
            category: category as Category,
            subject: subject as Subject,
        });
    }
}
