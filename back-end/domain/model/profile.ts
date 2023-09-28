import { User } from './user';

export class Profile {
    readonly id?: number;
    readonly user: User;
    readonly createdAt: Date;

    private latestActivity: Date;
    private username: string;
    private bio?: string;

    constructor(profile: { user: User; username: string; bio?: string }) {
        const now = new Date();
        this.user = profile.user;
        this.createdAt = now;
        this.latestActivity = now;
        this.username = profile.username;
        this.bio = profile.bio;
    }

    equals(otherProfile: {
        user: User;
        createdAt: Date;
        updatedAt: Date;
        latestActivity: Date;
        username: string;
        bio?: string;
    }): boolean {
        return (
            this.user === otherProfile.user &&
            this.createdAt === otherProfile.createdAt &&
            this.latestActivity === otherProfile.latestActivity &&
            this.username === otherProfile.username &&
            this.bio === otherProfile.bio
        );
    }

    getLatestActivity = (): Date => this.latestActivity;
    getUsername = (): string => this.username;
    getBio = (): string | undefined => this.bio;
}
