import { User } from './user';
import { Category } from './category';
import { Subject } from './subject';
import { ProfileInput } from '../../types';

export class Resource {
    readonly id?: number;
    readonly creator: User;
    readonly createdAt: Date;
    readonly title: string;
    readonly description: string;
    readonly category: Category;
    readonly subject: Subject;
    private upvoters: ProfileInput[]; // profileInput ipv profile anders infinite reference loop

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
        this.upvoters = [];
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
        if (!resource.creator) throw new Error('creator User is required');
        if (!resource.createdAt) throw new Error('createdAt is required');
        if (!resource.title) throw new Error('title is required');
        if (!resource.description) throw new Error('description is required');
        if (!resource.category) throw new Error('category is required');
        if (!resource.subject) throw new Error('subject is required');
        if (resource.title.length > 60) throw new Error('title cannot be longer than 60 characters');
        if (resource.description.length > 500) throw new Error('description cannot be longer than 500 characters');
        if (!Object.values(Category).includes(resource.category)) throw new Error('Invalid category');
        if (!Object.values(Subject).includes(resource.subject)) throw new Error('Invalid subject');
    }

    getLikes = (): number => {
        return this.upvoters.length;
    };

    addUpvoter = (profile: ProfileInput): void => {
        //currently using profile input because otherwise generates infinite reference loop
        if (!this.upvoters.includes(profile)) {
            this.upvoters.push(profile);
        } else {
            throw new Error(`Resource already has upvoter with id ${profile.userId}`);
        }
    };
}
