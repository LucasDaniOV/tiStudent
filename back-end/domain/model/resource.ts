import { User } from './user';

export class Resource {
    readonly creator: User;
    readonly createdAt: Date;

    private updatedAt: Date;
    private title: string;
    private description: string;
    private thumbnail?: File;
    private files?: FileList;

    constructor(resource: {
        creator: User;
        title: string;
        description: string;
        thumbnail?: File;
        files?: FileList;
    }) {
        const now = new Date();
        this.creator = resource.creator;
        this.createdAt = now;
        this.updatedAt = now;
        this.title = resource.title;
        this.description = resource.description;
        this.thumbnail = resource.thumbnail;
        this.files = resource.files;
    }

    equals(otherResource: {
        creator: User;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        thumbnail?: File;
        files?: FileList;
    }): boolean {
        return (
            this.creator === otherResource.creator &&
            this.createdAt === otherResource.createdAt &&
            this.updatedAt === otherResource.updatedAt &&
            this.title === otherResource.title &&
            this.description === otherResource.description &&
            this.thumbnail === otherResource.thumbnail &&
            this.files === otherResource.files
        );
    }
}
