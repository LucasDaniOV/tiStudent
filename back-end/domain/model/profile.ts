import { Profile as ProfilePrisma, User as UserPrisma } from '@prisma/client';
import { User } from './user';

export class Profile {
    readonly id: number;
    readonly user: User;
    readonly username: string;
    readonly bio: string = undefined;
    readonly createdAt?: Date;
    readonly latestActivity: Date;

    constructor(profile: {
        id?: number;
        user: User;
        username: string;
        bio?: string;
        createdAt: Date;
        latestActivity: Date;
    }) {
        this.validate(profile);

        this.id = profile.id;
        this.username = profile.username;
        this.user = profile.user;
        this.bio = profile.bio;

        this.createdAt = profile.createdAt;
        this.latestActivity = profile.latestActivity;
    }

    equals(otherProfile: { user: User; username: string; bio?: string }): boolean {
        return (
            this.user === otherProfile.user && this.username === otherProfile.username && this.bio === otherProfile.bio
        );
    }

    validateUsername = (username: string): void => {
        if (!username) throw new Error('username is required');
        if (username.length > 30) throw new Error('username cannot be longer than 30 characters');
        if (username == this.username) throw new Error("New username can't be same as old username");
    };

    validateBio = (bio: string): void => {
        if (bio.length > 200) throw new Error('bio cannot be longer than 200 characters');
        if (bio == this.bio) throw new Error("New bio can't be same as old bio");
    };

    validate(profile: { user: User; username: string; bio?: string }): void {
        if (!profile.user) throw new Error('user is required');
        this.validateUsername(profile.username);
        if (profile.bio) this.validateBio(profile.bio);
    }

    static from({ id, username, bio, createdAt, latestActivity, user }: ProfilePrisma & { user: UserPrisma }): Profile {
        return new Profile({
            id,
            username,
            bio,
            createdAt,
            latestActivity,
            user: User.from(user),
        });
    }
}
