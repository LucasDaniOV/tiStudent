import { Category } from './category';
import { Subject } from './subject';
import { Profile } from './profile';
import { Profile as ProfilePrisma, User as UserPrisma, Resource as ResourcePrisma } from '@prisma/client';

export class Resource {
    readonly id?: number;
    readonly creator: Profile;
    readonly createdAt: Date;
    readonly title: string;
    readonly description: string;
    readonly category: Category;
    readonly subject: Subject;

    constructor(resource: {
        id?: number;
        creator: Profile;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
    }) {
        this.validate(resource);

        this.id = resource.id;
        this.creator = resource.creator;
        this.createdAt = new Date();
        this.title = resource.title;
        this.description = resource.description;
        this.category = resource.category;
        this.subject = resource.subject;
    }

    equals(otherResource: {
        id: number;
        creator: Profile;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
    }): boolean {
        return (
            this.id === otherResource.id &&
            this.creator === otherResource.creator &&
            this.title === otherResource.title &&
            this.description === otherResource.description &&
            this.category == otherResource.category &&
            this.subject == otherResource.subject
        );
    }

    validate(resource: {
        id?: number;
        creator: Profile;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
    }): void {
        this.validateCreator(resource.creator);
        this.validateTitle(resource.title);
        this.validateDescription(resource.description);
        this.validateCategory(resource.category);
        this.validateSubject(resource.subject);
    }

    validateCreator = (creator: Profile) => {
        if (!creator) throw new Error('creator Profile is required');
    };

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
        if (!Object.values(Category).includes(category)) throw new Error('Invalid category');
    };

    validateSubject = (subject: Subject) => {
        if (!subject) throw new Error('subject is required');
        if (!Object.values(Subject).includes(subject)) throw new Error('Invalid subject');
    };

    static from({
        id,
        profile,
        title,
        description,
        category,
        subject,
    }: ResourcePrisma & { profile: ProfilePrisma & { user: UserPrisma } }) {
        return new Resource({
            id,
            creator: Profile.from(profile),
            title,
            description,
            category: category as Category,
            subject: subject as Subject,
        });
    }
}
