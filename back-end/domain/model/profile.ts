import { Profile as ProfilePrisma, User as UserPrisma } from '@prisma/client';
import { User } from './user';

export class Profile {
    readonly id?: number;
    readonly username: string;
    readonly bio?: string;
    readonly createdAt?: Date;
    readonly latestActivity?: Date;
    readonly user: User;

    constructor(profile: {
        id?: number;
        username: string;
        bio?: string;
        createdAt?: Date;
        latestActivity?: Date;
        user: User;
    }) {
        this.validate(profile);

        this.id = profile.id;
        this.username = profile.username;
        this.bio = profile.bio;
        this.createdAt = profile.createdAt ? profile.createdAt : new Date();
        this.latestActivity = profile.latestActivity ? profile.latestActivity : this.createdAt;
        this.user = profile.user;
    }

    equals(otherProfile: { user: User; username: string; bio?: string }): boolean {
        return (
            this.username === otherProfile.username && this.bio === otherProfile.bio && this.user === otherProfile.user
        );
    }

    validateUsername = (username: string): void => {
        if (username.length > 30) throw new Error('username cannot be longer than 30 characters');
    };

    validateBio = (bio: string): void => {
        if (bio.length > 200) throw new Error('bio cannot be longer than 200 characters');
    };

    validate(profile: { user: User; username: string; bio?: string }): void {
        if (!profile.user) throw new Error('user is required');
        if (!profile.username) throw new Error('username is required');
        this.validateUsername(profile.username);
        if (profile.bio) this.validateBio(profile.bio);
    }

    static from({ id, username, bio, createdAt, latestActivity, user }: ProfilePrisma & { user: UserPrisma }): Profile {
        return new Profile({
            id,
            username,
            bio,
            createdAt: createdAt ? createdAt : null,
            latestActivity,
            user: User.from(user),
        });
    }
}
