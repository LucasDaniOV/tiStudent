import { CategoryOnResource } from '../model/categoryOnResource';
import database from '../../util/database';

const createCategoryOnResource = async (categoryId: number, resourceId: number): Promise<CategoryOnResource> => {
    try {
        const categoryOnResourcePrisma = await database.categoryOnResource.create({
            data: {
                categoryId,
                resourceId,
            },
        });
        if (categoryOnResourcePrisma) return CategoryOnResource.from(categoryOnResourcePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when creating category on resource. See server log for details.');
    }
};

const getCategoriesOnResources = async (): Promise<CategoryOnResource[]> => {
    try {
        const categoriesOnResourcesPrisma = await database.categoryOnResource.findMany();
        if (categoriesOnResourcesPrisma) {
            return categoriesOnResourcesPrisma.map((categoryOnResourcePrisma) =>
                CategoryOnResource.from(categoryOnResourcePrisma)
            );
        }
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting categories on resources. See server log for details.');
    }
};

const getCategoryOnResource = async (categoryId: number, resourceId: number): Promise<CategoryOnResource> => {
    try {
        const categoryOnResourcePrisma = await database.categoryOnResource.findUnique({
            where: {
                categoryId_resourceId: {
                    categoryId,
                    resourceId,
                },
            },
        });
        if (categoryOnResourcePrisma) return CategoryOnResource.from(categoryOnResourcePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting category on resource. See server log for details.');
    }
};

const getCategoriesOnResourcesByCategoryId = async (categoryId: number): Promise<CategoryOnResource[]> => {
    try {
        const categoriesOnResourcesPrisma = await database.categoryOnResource.findMany({
            where: {
                categoryId,
            },
        });
        if (categoriesOnResourcesPrisma) {
            return categoriesOnResourcesPrisma.map((categoryOnResourcePrisma) =>
                CategoryOnResource.from(categoryOnResourcePrisma)
            );
        }
    } catch (error) {
        console.error(error);
        throw new Error(
            'Database error when getting categories on resources by category id. See server log for details.'
        );
    }
};

const getCategoriesOnResourcesByResourceId = async (resourceId: number): Promise<CategoryOnResource[]> => {
    try {
        const categoriesOnResourcesPrisma = await database.categoryOnResource.findMany({
            where: {
                resourceId,
            },
        });
        if (categoriesOnResourcesPrisma) {
            return categoriesOnResourcesPrisma.map((categoryOnResourcePrisma) =>
                CategoryOnResource.from(categoryOnResourcePrisma)
            );
        }
    } catch (error) {
        console.error(error);
        throw new Error(
            'Database error when getting categories on resources by resource id. See server log for details.'
        );
    }
};

const deleteCategoryOnResource = async (categoryId: number, resourceId: number): Promise<CategoryOnResource> => {
    try {
        const categoryOnResourcePrisma = await database.categoryOnResource.delete({
            where: {
                categoryId_resourceId: {
                    categoryId,
                    resourceId,
                },
            },
        });
        if (categoryOnResourcePrisma) {
            return CategoryOnResource.from(categoryOnResourcePrisma);
        }
    } catch (error) {
        console.error(error);
        throw new Error('Database error when deleting category on resource. See server log for details.');
    }
};

export default {
    createCategoryOnResource,
    getCategoriesOnResources,
    getCategoryOnResource,
    getCategoriesOnResourcesByCategoryId,
    getCategoriesOnResourcesByResourceId,
    deleteCategoryOnResource,
};
