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
    readonly parent?: Comment = null;
    readonly subComments?: Comment[] = null;

    constructor(comment: {
        id?: number;
        message: string;
        createdAt?: Date;
        profile: Profile;
        resource: Resource;
        parent?: Comment;
        edited?: Boolean;
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

    equals(otherComment: {
        id?: number;
        message: string;
        createdAt?: Date;
        profile: Profile;
        resource: Resource;
        parent?: Comment;
        edited?: Boolean;
    }) {
        return (
            otherComment.id == this.id &&
            otherComment.message == this.message &&
            otherComment.profile.id == this.profile.id &&
            otherComment.resource.id == this.resource.id
        );
    }

    static from({
        id,
        message,
        createdAt,
        edited,
        profile,
        resource,
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
        });
    }
}
