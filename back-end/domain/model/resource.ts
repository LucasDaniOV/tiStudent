import { User } from './user';
import { Category } from './category';
import { Subject } from './subject';

export class Resource {
    readonly creator: User;
    readonly createdAt: Date;

    private title: string;
    private description: string;
    private category: Category;
    private subject: Subject;

    constructor(resource: {
        creator: User;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
    }) {
        const now = new Date();
        this.creator = resource.creator;
        this.createdAt = now;
        this.title = resource.title;
        this.description = resource.description;
        this.category = resource.category;
        this.subject = resource.subject;
    }

    equals(otherResource: {
        creator: User;
        createdAt: Date;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
    }): boolean {
        return (
            this.creator === otherResource.creator &&
            this.createdAt === otherResource.createdAt &&
            this.title === otherResource.title &&
            this.description === otherResource.description &&
            this.category == otherResource.category &&
            this.subject == otherResource.subject
        );
    }

    getTitle = (): string => this.title;
    getDescription = (): string => this.description;
    getCategory = (): string => this.category; //returning string because easier for frontend to work with string than enum
    getSubject = (): string => this.subject; // idem, same as above
}
