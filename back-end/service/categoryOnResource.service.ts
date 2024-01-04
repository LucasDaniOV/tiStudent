import { CategoryOnResource } from '../domain/model/categoryOnResource';
import categoryOnResourceDb from '../domain/data-access/categoryOnResource.db';
import resourceService from './resource.service';
import categoryService from './category.service';

const createCategoryOnResource = async (categoryId: number, resourceId: number): Promise<CategoryOnResource> => {
    await resourceService.getResourceById(resourceId);
    await categoryService.getCategoryById(categoryId);
    if (await categoryOnResourceDb.getCategoryOnResource(categoryId, resourceId)) {
        throw new Error('Category on resource already exists');
    }
    const categoryOnResource = await categoryOnResourceDb.createCategoryOnResource(categoryId, resourceId);
    return categoryOnResource;
};

const getCategoryOnResource = async (categoryId: number, resourceId: number): Promise<CategoryOnResource> => {
    await resourceService.getResourceById(resourceId);
    await categoryService.getCategoryById(categoryId);
    const categoryOnResource = await categoryOnResourceDb.getCategoryOnResource(categoryId, resourceId);
    if (!categoryOnResource) throw new Error('Category on resource not found');
    return categoryOnResource;
};

const getCategoriesOnResources = async (): Promise<CategoryOnResource[]> => {
    return await categoryOnResourceDb.getCategoriesOnResources();
};

const getCategoriesOnResourcesByCategoryId = async (categoryId: number): Promise<CategoryOnResource[]> => {
    await categoryService.getCategoryById(categoryId);
    const categoriesOnResources = await categoryOnResourceDb.getCategoriesOnResourcesByCategoryId(categoryId);
    return categoriesOnResources;
};

const getCategoriesOnResourcesByResourceId = async (resourceId: number): Promise<CategoryOnResource[]> => {
    await resourceService.getResourceById(resourceId);
    const categoriesOnResources = await categoryOnResourceDb.getCategoriesOnResourcesByResourceId(resourceId);
    return categoriesOnResources;
};

const deleteCategoryOnResource = async (categoryId: number, resourceId: number): Promise<CategoryOnResource> => {
    await getCategoryOnResource(categoryId, resourceId);
    return await categoryOnResourceDb.deleteCategoryOnResource(categoryId, resourceId);
};

export default {
    createCategoryOnResource,
    getCategoryOnResource,
    getCategoriesOnResources,
    getCategoriesOnResourcesByCategoryId,
    getCategoriesOnResourcesByResourceId,
    deleteCategoryOnResource,
};
