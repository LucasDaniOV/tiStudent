import { Category } from './category';
import { Subject } from './subject';

export class Resource {
    readonly id: number;
    readonly creatorId: number;
    readonly createdAt: Date;

    private title: string;
    private description: string;
    private category: Category;
    private subject: Subject;

    constructor(resource: {
        id: number;
        creatorId: number;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
    }) {
        const now = new Date();
        this.id = resource.id;
        this.creatorId = resource.creatorId;
        this.createdAt = now;
        this.title = resource.title;
        this.description = resource.description;
        this.category = resource.category;
        this.subject = resource.subject;
    }

    equals(otherResource: {
        id: number;
        creatorId: number;
        createdAt: Date;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
    }): boolean {
        return (
            this.id === otherResource.id &&
            this.creatorId === otherResource.creatorId &&
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
