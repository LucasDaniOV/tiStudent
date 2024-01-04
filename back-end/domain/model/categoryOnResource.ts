import { CategoryOnResource as CategoryOnResourcePrisma } from '@prisma/client';

export class CategoryOnResource {
    readonly categoryId: number;
    readonly resourceId: number;

    constructor(categoryId: number, resourceId: number) {
        this.categoryId = categoryId;
        this.resourceId = resourceId;
    }

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
