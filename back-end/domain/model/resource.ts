import { User } from './user';
import { Category } from './category';
import { Subject } from './subject';
import { ProfileInput } from '../../types';

export class Resource {
    readonly id?: number;
    private _creator: User;
    readonly createdAt: Date;
    private _title: string;
    private _description: string;
    private _category: Category;
    private _subject: Subject;
    // private _isEdited: Boolean; // misschien een boolean om aan te duiden of een Resource is aangepast geweest
    private _upvoters: ProfileInput[] = []; // profileInput ipv profile anders infinite reference loop

    constructor(resource: {
        id?: number;
        creator: User;
        createdAt: Date;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
    }) {
        this.validate(resource);

        this.id = resource.id;
        this._creator = resource.creator;
        this.createdAt = resource.createdAt;
        this._title = resource.title;
        this._description = resource.description;
        this._category = resource.category;
        this._subject = resource.subject;
    }

    equals(otherResource: {
        id: number;
        creator: User;
        createdAt: Date;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
    }): boolean {
        return (
            this.id === otherResource.id &&
            this._creator === otherResource.creator &&
            this.createdAt === otherResource.createdAt &&
            this._title === otherResource.title &&
            this._description === otherResource.description &&
            this._category == otherResource.category &&
            this._subject == otherResource.subject
        );
    }

    validate(resource: {
        id?: number;
        creator: User;
        createdAt: Date;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
    }): void {
        this.validateCreator(resource.creator);
        if (!resource.createdAt) throw new Error('CreatedAt is required');
        this.validateTitle(resource.title);
        this.validateDescription(resource.description);
        this.validateCategory(resource.category);
        this.validateSubject(resource.subject);
    }

    validateCreator = (creator: User) => {
        if (!creator) throw new Error('Creator User is required');
    };

    validateTitle = (title: string) => {
        if (!title) throw new Error('Title is required');
        if (title.length > 60) throw new Error('Title cannot be longer than 60 characters');
    };

    validateDescription = (description: string) => {
        if (!description) throw new Error('Description is required');
        if (description.length > 500) throw new Error('Description cannot be longer than 500 characters');
    };

    validateCategory = (category: Category) => {
        if (!category) throw new Error('Category is required');
        if (!Object.values(Category).includes(category)) throw new Error('Invalid Category');
    };

    validateSubject = (subject: Subject) => {
        if (!subject) throw new Error('Subject is required');
        if (!Object.values(Subject).includes(subject)) throw new Error('Invalid Subject');
    };

    public get likes(): number {
        return this._upvoters.length;
    }

    public get creator(): User {
        return this._creator;
    }

    public get title(): string {
        return this._title;
    }

    public get description(): string {
        return this._description;
    }

    public get category(): Category {
        return this._category;
    }

    public get subject(): Subject {
        return this._subject;
    }

    public get upvoters(): ProfileInput[] {
        return this._upvoters;
    }

    // check if new value != current value
    // eventueel alle "update-" methods vervangen met public setters (might be more professional)
    updateCreator = (newCreator: User): Resource => {
        this.validateCreator(newCreator);
        this._creator = newCreator;
        return this;
    };

    updateTitle = (newTitle: string): Resource => {
        this.validateTitle(newTitle);
        this._title = newTitle;
        return this;
    };

    updateDescription = (newDescription: string): Resource => {
        this.validateDescription(newDescription);
        this._description = newDescription;
        return this;
    };

    updateCategory = (newCategory: Category): Resource => {
        this.validateCategory(newCategory);
        this._category = newCategory;
        return this;
    };

    updateSubject = (newSubject: Subject): Resource => {
        this.validateSubject(newSubject);
        this._subject = newSubject;
        return this;
    };

    updateUpvoters = (newUpvoters: ProfileInput[]): Resource => {
        this._upvoters = newUpvoters;
        return this;
    };

    removeUpvoter = (profile: ProfileInput): ProfileInput[] => {
        const newUpvoters = this.upvoters.filter((u) => u.userId != profile.userId);
        this.updateUpvoters(newUpvoters);
        return newUpvoters;
    };

    addUpvoter = (profile: ProfileInput): void => {
        //currently using profile input because otherwise generates infinite reference loop
        if (!this._upvoters.includes(profile)) {
            this._upvoters.push(profile);
        } else {
            throw new Error(`Resource already has upvoter with id ${profile.userId}`);
        }
    };
}
