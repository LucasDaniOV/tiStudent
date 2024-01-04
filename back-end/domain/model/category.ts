import { Category as CategoryPrisma } from '@prisma/client';

export class Category {
    readonly id: number;
    readonly name: string;

    constructor(category: { id: number; name: string }) {
        Category.validate(category.name, category.id);
        this.id = category.id;
        this.name = category.name;
    }

    equals(otherCategory: Category): boolean {
        return this.id === otherCategory.id && this.name === otherCategory.name;
    }

    static validate(name: string, id: number): void {
        Category.validateName(name);
        Category.validateId(id);
    }

    static validateId = (id: number) => {
        if (!id) throw new Error('id is required');
        if (typeof id !== 'number') throw new Error('id must be a number');
        if (id < 0) throw new Error('id cannot be negative');
    };

    static validateName = (name: string) => {
        if (!name) throw new Error('name is required');
        if (typeof name !== 'string') throw new Error('name must be a string');
        if (name.length > 60) throw new Error('name cannot be longer than 60 characters');
    };

    static from({ id, name }: CategoryPrisma): Category {
        return new Category({
            id,
            name,
        });
    }
}
