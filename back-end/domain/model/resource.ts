import { User } from './user';

export class Resource {
    readonly creator: User;
    readonly createdAt: Date;

    private updatedAt: Date;
    private title: string;
    private description: string;

    constructor(resource: { creator: User; title: string; description: string }) {
        const now = new Date();
        this.creator = resource.creator;
        this.createdAt = now;
        this.updatedAt = now;
        this.title = resource.title;
        this.description = resource.description;
    }

    equals(otherResource: {
        creator: User;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
    }): boolean {
        return (
            this.creator === otherResource.creator &&
            this.createdAt === otherResource.createdAt &&
            this.updatedAt === otherResource.updatedAt &&
            this.title === otherResource.title &&
            this.description === otherResource.description
        );
    }
}
