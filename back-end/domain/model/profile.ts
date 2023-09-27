import { User } from './user';

export class Profile {
    readonly user: User;
    readonly createdAt: Date;

    private updatedAt: Date;
    private latestActivity: Date;
    private username: string;
    private bio?: string;
    private avatar?: File;

    constructor(profile: { user: User; username: string; bio?: string; avatar?: File }) {
        const now = new Date();
        this.user = profile.user;
        this.createdAt = now;
        this.updatedAt = now;
        this.latestActivity = now;
        this.username = profile.username;
        this.bio = profile.bio;
        this.avatar = profile.avatar;
    }

    equals(otherProfile: {
        user: User;
        createdAt: Date;
        updatedAt: Date;
        latestActivity: Date;
        username: string;
        bio?: string;
        avatar?: File;
    }): boolean {
        return (
            this.user === otherProfile.user &&
            this.createdAt === otherProfile.createdAt &&
            this.updatedAt === otherProfile.updatedAt &&
            this.latestActivity === otherProfile.latestActivity &&
            this.username === otherProfile.username &&
            this.bio === otherProfile.bio &&
            this.avatar === otherProfile.avatar
        );
    }
}
