import { Category } from './category';
import { Subject } from './subject';
import { Profile } from './profile';
import { Profile as ProfilePrisma, User as UserPrisma, Resource as ResourcePrisma } from '@prisma/client';

export class Resource {
    readonly id?: number;
    readonly creator: Profile;
    readonly createdAt?: Date;
    readonly title: string;
    readonly description: string;
    readonly category: Category;
    readonly subject: Subject;
    // readonly filePath: string;

    constructor(resource: {
        id?: number;
        creator: Profile;
        createdAt?: Date;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
        // filePath: string;
    }) {
        this.validate(resource);

        this.id = resource.id;
        this.creator = resource.creator;
        if (resource.createdAt) {
            this.createdAt = resource.createdAt;
        }
        this.createdAt = new Date();
        this.title = resource.title;
        this.description = resource.description;
        this.category = resource.category;
        this.subject = resource.subject;
        // this.filePath = resource.filePath;
    }

    equals(otherResource: {
        id: number;
        creator: Profile;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
        // filePath: string;
    }): boolean {
        return (
            this.id === otherResource.id &&
            this.creator === otherResource.creator &&
            this.title === otherResource.title &&
            this.description === otherResource.description &&
            this.category == otherResource.category &&
            this.subject == otherResource.subject
            // && this.filePath == otherResource.filePath
        );
    }

    validate(resource: {
        id?: number;
        creator: Profile;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
        // filePath: string;
    }): void {
        this.validateCreator(resource.creator);
        this.validateTitle(resource.title);
        this.validateDescription(resource.description);
        this.validateCategory(resource.category);
        this.validateSubject(resource.subject);
        // this.validateFilePath(resource.filePath);
    }

    // validateFilePath(filePath: string) {
    //     if (!filePath) throw new Error('Filepath is required');
    //     if (filePath.trim() === '') throw new Error("Filepath can't be empty");
    // }

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
        if (!Object.values(Category).includes(category as Category)) throw new Error('Invalid category');
    };

    validateSubject = (subject: Subject) => {
        if (!subject) throw new Error('subject is required');
        if (!Object.values(Subject).includes(subject as Subject)) throw new Error('Invalid subject');
    };

    static from({
        id,
        creator,
        createdAt,
        title,
        description,
        category,
        subject,
    }: // filePath,
    ResourcePrisma & { creator: ProfilePrisma & { user: UserPrisma } }) {
        return new Resource({
            id,
            creator: Profile.from(creator),
            createdAt: createdAt ? createdAt : null,
            title,
            description,
            category: category as Category,
            subject: subject as Subject,
            // filePath,
        });
    }
}
