import { Category } from './category';
import { Subject } from './subject';
import { Profile } from './profile';

export class Resource {
    readonly id?: number;
    readonly creator: Profile;
    readonly createdAt: Date;
    private _title: string;
    private _description: string;
    private _category: Category;
    private _subject: Subject;

    constructor(resource: {
        id?: number;
        creator: Profile;
        createdAt: Date;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
    }) {
        this.validate(resource);

        this.id = resource.id;
        this.creator = resource.creator;
        this.createdAt = resource.createdAt;
        this._title = resource.title;
        this._description = resource.description;
        this._category = resource.category;
        this._subject = resource.subject;
    }

    equals(otherResource: {
        id: number;
        creator: Profile;
        createdAt: Date;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
    }): boolean {
        return (
            this.id === otherResource.id &&
            this.creator === otherResource.creator &&
            this.createdAt === otherResource.createdAt &&
            this._title === otherResource.title &&
            this._description === otherResource.description &&
            this._category == otherResource.category &&
            this._subject == otherResource.subject
        );
    }

    validate(resource: {
        id?: number;
        creator: Profile;
        createdAt: Date;
        title: string;
        description: string;
        category: Category;
        subject: Subject;
    }): void {
        this.validateCreator(resource.creator);
        if (!resource.createdAt) throw new Error('createdAt is required');
        this.validateTitle(resource.title);
        this.validateDescription(resource.description);
        this.validateCategory(resource.category);
        this.validateSubject(resource.subject);
    }

    validateCreator = (creator: Profile) => {
        if (!creator) throw new Error('creator Profile is required');
    };

    validateTitle = (title: string) => {
        if (!title) throw new Error('title is required');
        if (title.length > 60) throw new Error('title cannot be longer than 60 characters');
    };

    validateDescription = (description: string) => {
        if (!description) throw new Error('description is required');
        if (description.length > 500) throw new Error('description cannot be longer than 500 characters');
    };

    validateCategory = (category: Category) => {
        if (!category) throw new Error('category is required');
        if (!Object.values(Category).includes(category)) throw new Error('Invalid category');
    };

    validateSubject = (subject: Subject) => {
        if (!subject) throw new Error('subject is required');
        if (!Object.values(Subject).includes(subject)) throw new Error('Invalid subject');
    };

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

    public set title(newTitle: string) {
        this.validateTitle(newTitle);
        if (newTitle == this._title) throw new Error(`new title must be different from old title`);
        this._title = newTitle;
    }

    public set description(newDescription: string) {
        this.validateDescription(newDescription);
        if (newDescription == this._description)
            throw new Error(`new description must be different from old description`);
        this._description = newDescription;
    }

    public set category(newCategory: Category) {
        this.validateCategory(newCategory);
        if (newCategory == this._category) throw new Error(`new category must be different from old category`);
        this._category = newCategory;
    }

    public set subject(newSubject: Subject) {
        this.validateSubject(newSubject);
        if (newSubject == this._subject) throw new Error(`new subject must be different from old subject`);
        this._subject = newSubject;
    }
}
