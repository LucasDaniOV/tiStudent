import { CommentLike as CommentLikePrisma } from '@prisma/client';

export class CommentLike {
    readonly commentId: number;
    readonly profileId: number;
    readonly createdAt: Date;

    constructor(commentId: number, profileId: number, createdAt: Date) {
        this.commentId = commentId;
        this.profileId = profileId;
        this.createdAt = createdAt;
    }

    equals(other: CommentLike): boolean {
        return this.commentId === other.commentId && this.profileId === other.profileId;
    }

    static from({ commentId, profileId, createdAt }: CommentLikePrisma) {
        return new CommentLike(commentId, profileId, createdAt);
    }
}
