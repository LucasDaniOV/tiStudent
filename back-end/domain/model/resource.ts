import { Resource as ResourcePrisma } from '@prisma/client';

export class Resource {
    readonly id: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly title: string;
    readonly description: string;
    readonly profileId: number;

    constructor(resource: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        profileId: number;
    }) {
        Resource.validate(resource.title, resource.description);
        this.id = resource.id;
        this.createdAt = resource.createdAt;
        this.updatedAt = resource.updatedAt;
        this.title = resource.title;
        this.description = resource.description;
        this.profileId = resource.profileId;
    }

    equals(otherResource: Resource): boolean {
        return (
            this.id === otherResource.id &&
            this.createdAt === otherResource.createdAt &&
            this.updatedAt === otherResource.updatedAt &&
            this.title === otherResource.title &&
            this.description === otherResource.description &&
            this.profileId === otherResource.profileId
        );
    }

    static validate(title: string, description: string): void {
        Resource.validateTitle(title);
        Resource.validateDescription(description);
    }

    static validateTitle = (title: string) => {
        if (!title) throw new Error('title is required');
        if (title.length > 60) throw new Error('title cannot be longer than 60 characters');
    };

    static validateDescription = (description: string) => {
        if (!description) throw new Error('description is required');
        if (description.length > 500) throw new Error('description cannot be longer than 500 characters');
    };

    static from({ id, createdAt, updatedAt, title, description, profileId }: ResourcePrisma): Resource {
        return new Resource({
            id,
            createdAt,
            updatedAt,
            title,
            description,
            profileId,
        });
    }
}
