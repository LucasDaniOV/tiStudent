import { Category as CategoryPrisma } from '@prisma/client';

export class Category {
    readonly id: number;
    readonly name: string;

    constructor(category: { id: number; name: string }) {
        Category.validate(category.name);
        this.id = category.id;
        this.name = category.name;
    }

    equals(otherCategory: Category): boolean {
        return this.id === otherCategory.id && this.name === otherCategory.name;
    }

    static validate(name: string): void {
        Category.validateName(name);
    }

    static validateName = (name: string) => {
        if (!name) throw new Error('name is required');
        if (name.length > 60) throw new Error('name cannot be longer than 60 characters');
    };

    static from({ id, name }: CategoryPrisma): Category {
        return new Category({
            id,
            name,
        });
    }
}
