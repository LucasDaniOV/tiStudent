import { Profile } from './profile';
import { Resource } from './resource';
import { User } from './user';

export class Comment {
    readonly id?: number;
    readonly profile: Profile;
    readonly resource: Resource;
    readonly message: string;
    readonly createdAt: Date;
    private _upvoters?: Profile[];

    constructor(comment: { id?: number; profile: Profile; resource: Resource; message: string }) {
        this.id = comment.id;
        // validation gebeurt hogerop
        this.profile = comment.profile;
        this.resource = comment.resource;
        if (comment.message.trim().length == 0) throw new Error("Message can't be empty");
        this.message = comment.message;
        this.resource = comment.resource;
        this.createdAt = new Date();
        this._upvoters = [];
    }

    public get upvoters(): Profile[] {
        return this._upvoters;
    }
}
