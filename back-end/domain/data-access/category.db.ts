import database from '../../util/database';
import { Category } from '../model/category';

const createCategory = async (name: string): Promise<Category> => {
    try {
        const category = await database.category.create({
            data: {
                name,
            },
        });
        return Category.from(category);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when creating category. See server log for details.');
    }
};

const getCategoryById = async (id: number): Promise<Category> => {
    try {
        const category = await database.category.findUnique({
            where: {
                id,
            },
        });
        if (category) return Category.from(category);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting category by id. See server log for details.');
    }
};

const getCategoryByName = async (name: string): Promise<Category> => {
    try {
        const category = await database.category.findUnique({
            where: {
                name,
            },
        });
        if (category) return Category.from(category);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting category by name. See server log for details.');
    }
};

const getAllCategories = async (): Promise<Category[]> => {
    try {
        const categories = await database.category.findMany();
        return categories.map((category) => Category.from(category));
    } catch (error) {
        console.error(error);
        throw new Error('Database error when getting all categories. See server log for details.');
    }
};

const updateCategory = async (id: number, name: string): Promise<Category> => {
    try {
        const category = await database.category.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });
        return Category.from(category);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating category. See server log for details.');
    }
};

const deleteCategory = async (id: number): Promise<Category> => {
    try {
        const prismaCategory = await database.category.delete({
            where: {
                id,
            },
        });
        if (prismaCategory) return Category.from(prismaCategory);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when deleting category. See server log for details.');
    }
};

export default {
    createCategory,
    getCategoryById,
    getCategoryByName,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
