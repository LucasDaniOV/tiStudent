import { CategoryOnResource } from '../domain/model/categoryOnResource';
import categoryOnResourceDb from '../domain/data-access/categoryOnResource.db';
import resourceService from './resource.service';
import categoryService from './category.service';
import { AuthenticationResponse, CategoryOnResourceInput, ResourceData } from '../types';
import { UnauthorizedError } from 'express-jwt';

const createCategoryOnResource = async (
    auth: AuthenticationResponse,
    categoryOnResourceInput: CategoryOnResourceInput
): Promise<CategoryOnResource> => {
    const resourceId: number = parseInt(categoryOnResourceInput.resourceId as string);
    const categoryId: number = parseInt(categoryOnResourceInput.categoryId as string);

    const resource: ResourceData = await resourceService.getResourceById(resourceId);
    const realProfileId: number = parseInt(auth.id as string);

    if (resource.profileId !== realProfileId) {
        throw new UnauthorizedError('invalid_token', { message: 'Not your resource' });
    }

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

const deleteCategoryOnResource = async (
    auth: AuthenticationResponse,
    categoryId: number,
    resourceId: number
): Promise<CategoryOnResource> => {
    const resource: ResourceData = await resourceService.getResourceById(resourceId);
    const realProfileId: number = parseInt(auth.id as string);

    if (resource.profileId !== realProfileId) {
        throw new UnauthorizedError('invalid_token', { message: 'Not your resource' });
    }

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
