import { Profile } from './profile';
import { Resource } from './resource';
import {
    Profile as ProfilePrisma,
    User as UserPrisma,
    Resource as ResourcePrisma,
    Comment as CommentPrisma,
} from '@prisma/client';

export class Comment {
    readonly id?: number;
    readonly message: string;
    readonly createdAt?: Date;
    readonly profile: Profile;
    readonly resource: Resource;
    readonly edited?: Boolean = false;
    readonly parentId?: number | null = null;

    constructor(comment: {
        id?: number;
        message: string;
        createdAt?: Date;
        profile: Profile;
        resource: Resource;
        edited?: Boolean;
        parentId?: number;
    }) {
        this.id = comment.id;
        if (comment.createdAt) {
            this.createdAt = comment.createdAt;
        } else {
            this.createdAt = new Date();
        }
        if (comment.message.trim().length == 0) throw new Error("Message can't be empty");
        this.message = comment.message;
        this.profile = comment.profile;
        this.resource = comment.resource;
        if (this.parentId) this.parentId = comment.parentId;
    }

    static from({
        id,
        message,
        createdAt,
        edited,
        profile,
        resource,
        parentId,
    }: CommentPrisma & { profile: ProfilePrisma & { user: UserPrisma } } & {
        resource: ResourcePrisma & { creator: ProfilePrisma & { user: UserPrisma } };
    }) {
        return new Comment({
            id,
            message,
            createdAt: createdAt ? createdAt : new Date(),
            edited,
            profile: Profile.from(profile),
            resource: Resource.from(resource),
            parentId: parentId ? parentId : null,
        });
    }
}
