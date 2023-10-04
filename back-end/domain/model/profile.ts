import { User } from './user';

export class Profile {
    readonly id?: number;
    readonly user: User;
    readonly createdAt: Date;

    private latestActivity: Date;
    private username: string;
    private bio?: string;

    constructor(profile: { id?: number; user: User; username: string; bio?: string }) {
        this.validate(profile);

        const now = new Date();

        this.id = profile.id;
        this.user = profile.user;
        this.createdAt = now;
        this.latestActivity = now;
        this.username = profile.username;
        this.bio = profile.bio;
    }

    equals(otherProfile: { user: User; username: string; bio?: string }): boolean {
        return (
            this.user === otherProfile.user && this.username === otherProfile.username && this.bio === otherProfile.bio
        );
    }

    valiateUsername = (username: string): void => {
        if (!username) throw new Error('username is required');
        if (username.length > 30) throw new Error('username cannot be longer than 30 characters');
    };

    validateBio = (bio: string): void => {
        if (bio.length > 200) throw new Error('bio cannot be longer than 200 characters');
    };

    validate(profile: { user: User; username: string; bio?: string }): void {
        if (!profile.user) throw new Error('user is required');
        this.valiateUsername(profile.username);
        if (profile.bio) this.validateBio(profile.bio);
    }

    getLatestActivity = (): Date => this.latestActivity;
    getUsername = (): string => this.username;
    getBio = (): string | undefined => this.bio;

    updateLatestActivity = (): void => {
        this.latestActivity = new Date();
    };

    updateUsername = (username: string): void => {
        this.valiateUsername(username);
        this.username = username;
        this.updateLatestActivity();
    };

    updateBio = (bio: string): void => {
        if (!bio) throw new Error('bio is required');
        this.validateBio(bio);
        this.bio = bio;
        this.updateLatestActivity();
    };
}
