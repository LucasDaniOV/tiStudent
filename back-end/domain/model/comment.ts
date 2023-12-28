import { Comment as CommentPrisma } from '@prisma/client';

export class Comment {
    readonly id: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly message: string;
    readonly profileId: number;
    readonly resourceId: number;

    constructor(id: number, createdAt: Date, updatedAt: Date, message: string, profileId: number, resourceId: number) {
        Comment.validateMessage(message);
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.message = message;
        this.profileId = profileId;
        this.resourceId = resourceId;
    }

    equals(other: Comment): boolean {
        return (
            this.id === other.id &&
            this.createdAt === other.createdAt &&
            this.updatedAt === other.updatedAt &&
            this.message === other.message &&
            this.profileId === other.profileId &&
            this.resourceId === other.resourceId
        );
    }

    static validateMessage(message: string): void {
        if (!message) throw new Error('Message cannot be null or undefined');
        if (typeof message !== 'string') throw new Error('Message must be a string');
        if (message.length < 1) throw new Error('Message cannot be empty');
        if (message.length > 1000) throw new Error('Message cannot be longer than 1000 characters');
    }

    static from = ({ id, createdAt, updatedAt, message, profileId, resourceId }: CommentPrisma): Comment => {
        return new Comment(id, createdAt, updatedAt, message, profileId, resourceId);
    };
}
