import categoryDb from '../domain/data-access/category.db';
import { Category } from '../domain/model/category';

const createCategory = async (name: string): Promise<Category> => {
    Category.validateName(name);
    if (await categoryDb.getCategoryByName(name)) throw new Error('Category already exists');
    const category = await categoryDb.createCategory(name);
    return category;
};

const getCategoryByName = async (name: string): Promise<Category> => {
    const category = await categoryDb.getCategoryByName(name);
    if (!category) throw new Error('Category not found');
    return category;
};

const getCategoryById = async (id: number): Promise<Category> => {
    const category = await categoryDb.getCategoryById(id);
    if (!category) throw new Error('Category not found');
    return category;
};

const getAllCategories = async (): Promise<Category[]> => await categoryDb.getAllCategories();

const updateCategory = async (id: number, name: string): Promise<Category> => {
    Category.validateName(name);
    if (await categoryDb.getCategoryByName(name)) throw new Error('Category already exists');
    const category = await categoryDb.updateCategory(id, name);
    return category;
};

const deleteCategory = async (id: number): Promise<Category> => {
    await getCategoryById(id);
    return categoryDb.deleteCategory(id);
};

export default {
    createCategory,
    getCategoryById,
    getCategoryByName,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
