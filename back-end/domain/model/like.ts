import {
    Profile as ProfilePrisma,
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
        if (!like.resource && !like.comment) {
            throw new Error('Object of either type Resource or type Comment is required.');
        }
    }

    static from({
        id,
        upvoter,
        resource = null,
        comment = null,
    }: LikePrisma & { upvoter: ProfilePrisma } & {
        resource: (ResourcePrisma & { creator: ProfilePrisma }) | null;
    } & {
        comment?:
            | (CommentPrisma & { profile: ProfilePrisma } & {
                  resource: ResourcePrisma & { creator: ProfilePrisma };
              })
            | null;
    }) {
        return new Like({
            id,
            profile: Profile.from(upvoter),
            resource: Resource.from(resource),
            comment: comment ? Comment.from(comment) : null,
        });
    }
}
