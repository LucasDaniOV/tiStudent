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
    readonly createdAt: Date;
    readonly profile: Profile;
    readonly resource: Resource;

    constructor(comment: { id?: number; profile: Profile; resource: Resource; message: string }) {
        this.id = comment.id;
        this.createdAt = new Date();
        if (comment.message.trim().length == 0) throw new Error("Message can't be empty");
        this.message = comment.message;
        this.profile = comment.profile;
        this.resource = comment.resource;
    }

    static from(
        {
            id,
            message,
            resource,
        }: CommentPrisma & {
            resource: ResourcePrisma & { profile: ProfilePrisma & { user: UserPrisma } };
        },
        profile: ProfilePrisma & { user: UserPrisma }
    ) {
        return new Comment({
            id,
            message,
            profile: Profile.from(profile),
            resource: Resource.from(resource),
        });
    }
}
