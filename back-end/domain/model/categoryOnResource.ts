import { CategoryOnResource as CategoryOnResourcePrisma } from '@prisma/client';

export class CategoryOnResource {
    readonly categoryId: number;
    readonly resourceId: number;

    constructor(categoryId: number, resourceId: number) {
        CategoryOnResource.validate(categoryId, resourceId);
        this.categoryId = categoryId;
        this.resourceId = resourceId;
    }

    static validate(categoryId: number, resourceId: number): void {
        CategoryOnResource.validateCategoryId(categoryId);
        CategoryOnResource.validateResourceId(resourceId);
    }

    static validateCategoryId = (categoryId: number) => {
        if (!categoryId) throw new Error('categoryId is required');
        if (categoryId < 0) throw new Error('categoryId cannot be negative');
        if (typeof categoryId !== 'number') throw new Error('categoryId must be a number');
    };

    static validateResourceId = (resourceId: number) => {
        if (!resourceId) throw new Error('resourceId is required');
        if (resourceId < 0) throw new Error('resourceId cannot be negative');
        if (typeof resourceId !== 'number') throw new Error('resourceId must be a number');
    };

    equals(otherCategoryOnResource: CategoryOnResource): boolean {
        return (
            this.categoryId === otherCategoryOnResource.categoryId &&
            this.resourceId === otherCategoryOnResource.resourceId
        );
    }

    static from({ categoryId, resourceId }: CategoryOnResourcePrisma): CategoryOnResource {
        return new CategoryOnResource(categoryId, resourceId);
    }
}
