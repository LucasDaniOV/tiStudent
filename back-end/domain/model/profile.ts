import { Resource } from './resource';
import { User } from './user';

export class Profile {
    readonly id?: number;
    readonly user: User;
    private _username: string;
    private _bio?: string;
    readonly createdAt: Date;

    private _latestActivity: Date;
    private _likedResources?: Resource[];

    constructor(profile: { id?: number; user: User; username: string; bio?: string }) {
        this.validate(profile);

        const now = new Date(); //is in foute time zone

        this.id = profile.id;
        this.user = profile.user;
        this._username = profile.username;
        this._bio = profile.bio;
        this.createdAt = now;
        this._latestActivity = now;
        this._likedResources = [];
    }

    equals(otherProfile: { user: User; username: string; bio?: string }): boolean {
        return (
            this.user === otherProfile.user &&
            this._username === otherProfile.username &&
            this._bio === otherProfile.bio
        );
    }

    validateUsername = (username: string): void => {
        if (!username) throw new Error('username is required');
        if (username.length > 30) throw new Error('username cannot be longer than 30 characters');
        if (username == this._username) throw new Error("New username can't be same as old username");
    };

    validateBio = (bio: string): void => {
        if (bio.length > 200) throw new Error('bio cannot be longer than 200 characters');
        if (bio == this._bio) throw new Error("New bio can't be same as old bio");
    };

    validate(profile: { user: User; username: string; bio?: string }): void {
        if (!profile.user) throw new Error('user is required');
        this.validateUsername(profile.username);
        if (profile.bio) this.validateBio(profile.bio);
    }

    public get username(): string {
        return this._username;
    }

    public get bio(): string | undefined {
        return this._bio;
    }

    public get latestActivity(): Date {
        return this._latestActivity;
    }

    public get likedResources(): Resource[] {
        return this._likedResources;
    }

    updateLatestActivity = (): Profile => {
        this._latestActivity = new Date(); // is in foute timezone
        return this;
    };

    updateUsername = (username: string): Profile => {
        this.validateUsername(username);
        this._username = username;
        this.updateLatestActivity();
        return this;
    };

    updateBio = (bio: string): Profile => {
        if (!bio) throw new Error('bio is required');
        this.validateBio(bio);
        this._bio = bio;
        this.updateLatestActivity();
        return this;
    };

    updateLikedResources = (resources: Resource[]): void => {
        this._likedResources = resources;
    };

    unLikeResource = (resource: Resource): Profile => {
        if (!this._likedResources.includes(resource))
            throw new Error(`User with this Profile doesn't have a like on this Resource`);
        this.updateLikedResources(this._likedResources.filter((r) => r.id != resource.id));
        this.updateLatestActivity();
        return this;
    };

    likeResource = (resource: Resource): void => {
        if (!this._likedResources.includes(resource)) {
            this._likedResources.push(resource);
        } else {
            throw new Error(`User with this Profile already likes Resource with id ${resource.id}`);
        }
        this.updateLatestActivity();
    };
}
