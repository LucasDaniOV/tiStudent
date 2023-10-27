import {
    Profile as ProfilePrisma,
    User as UserPrisma,
    Resource as ResourcePrisma,
    Comment as CommentPrisma,
    Like as LikePrisma,
} from '@prisma/client';
import { Profile } from './profile';
import { Resource } from './resource';
import { Comment } from './comment';

export class Like {
    readonly id: number;
    readonly createdAt: Date;
    readonly profile: Profile;
    readonly resource?: Resource;
    readonly comment?: Comment;

    constructor(like: { id?: number; profile: Profile; resource?: Resource; comment?: Comment }) {
        this.validate(like);
        this.id = like.id;
        this.createdAt = new Date();
        this.profile = like.profile;
        this.resource = like.resource;
        this.comment = like.comment;
    }

    validate(like: { id?: number; profile: Profile; resource?: Resource; comment?: Comment }) {
        if (!like.profile) throw new Error('Profile is required.');
        if ((!like.resource && !like.comment) || (like.resource && like.comment)) {
            throw new Error('Object of EITHER: type Resource or type Comment is required.');
        }
    }

    static from({
        id,
        upvoter,
        resource,
        comment,
    }: LikePrisma & { upvoter: ProfilePrisma & { user: UserPrisma } } & {
        resource: ResourcePrisma & { creator: ProfilePrisma & { user: UserPrisma } };
    } & {
        comment: CommentPrisma & { profile: ProfilePrisma & { user: UserPrisma } } & {
            resource: ResourcePrisma & { creator: ProfilePrisma & { user: UserPrisma } };
        };
    }) {
        return new Like({
            id,
            profile: Profile.from(upvoter),
            resource: Resource.from(resource),
            comment: Comment.from(comment),
        });
    }
}

// // misschien voor like te fixen
// export enum Type {
//     Resource,
//     Comment,
// }
