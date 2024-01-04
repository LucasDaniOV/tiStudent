import { ResourceLike as ResourceLikePrisma } from '@prisma/client';

export class ResourceLike {
    readonly resourceId: number;
    readonly profileId: number;
    readonly createdAt: Date;

    constructor(resourceId: number, profileId: number, createdAt: Date) {
        this.resourceId = resourceId;
        this.profileId = profileId;
        this.createdAt = createdAt;
    }

    equals(other: ResourceLike): boolean {
        return this.resourceId === other.resourceId && this.profileId === other.profileId;
    }

    static from({ resourceId, profileId, createdAt }: ResourceLikePrisma) {
        return new ResourceLike(resourceId, profileId, createdAt);
    }
}
