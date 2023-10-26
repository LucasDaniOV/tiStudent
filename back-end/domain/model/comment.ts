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
    readonly parent?: Comment = null;
    readonly subComments?: Comment[] = null;

    constructor(comment: { id?: number; profile: Profile; resource: Resource; message: string; parent?: Comment }) {
        this.id = comment.id;
        this.createdAt = new Date();
        if (comment.message.trim().length == 0) throw new Error("Message can't be empty");
        this.message = comment.message;
        this.profile = comment.profile;
        this.resource = comment.resource;
        if (comment.parent) {
            if (comment.parent.parent !== null) {
                this.parent = comment.parent.parent;
                // throw new Error("Can't comment on comment with parent (comments have max. depth of 2)")
            } else {
                this.parent = comment.parent;
            }
        } else {
            this.subComments = [];
        }
    }

    static from({
        id,
        message,
        profile,
        resource,
    }: CommentPrisma & { profile: ProfilePrisma & { user: UserPrisma } } & {
        resource: ResourcePrisma & { creator: ProfilePrisma & { user: UserPrisma } };
    }) {
        return new Comment({
            id,
            message,
            profile: Profile.from(profile),
            resource: Resource.from(resource),
        });
    }
}
