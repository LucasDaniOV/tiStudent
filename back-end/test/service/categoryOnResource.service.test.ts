import categoryOnResourceDb from '../../domain/data-access/categoryOnResource.db';
import resourceDb from '../../domain/data-access/resource.db';
import categoryDb from '../../domain/data-access/category.db';
import categoryOnResourceService from '../../service/categoryOnResource.service';
import { CategoryOnResource } from '../../domain/model/categoryOnResource';
import { AuthenticationResponse } from '../../types';

const categoryId = 1;
const resourceId = 2;
const profileId = 1;

const categoryOnResourceInput = { categoryId, resourceId };
const categoryOnResource = new CategoryOnResource(categoryId, resourceId);

let mockCategoryOnResourceDbCreateCategoryOnResource: jest.Mock;
let mockCategoryOnResourceDbGetCategoriesOnResources: jest.Mock;
let mockCategoryOnResourceDbGetCategoryOnResource: jest.Mock;
let mockCategoryOnResourceDbGetCategoriesOnResourcesByCategoryId: jest.Mock;
let mockCategoryOnResourceDbGetCategoriesOnResourcesByResourceId: jest.Mock;
let mockCategoryOnResourceDbDeleteCategoryOnResource: jest.Mock;
let mockResourceDbGetResourceById: jest.Mock;
let mockCategoryDbGetCategoryById: jest.Mock;

beforeEach(() => {
    mockCategoryOnResourceDbCreateCategoryOnResource = jest.fn();
    mockCategoryOnResourceDbGetCategoriesOnResources = jest.fn();
    mockCategoryOnResourceDbGetCategoryOnResource = jest.fn();
    mockCategoryOnResourceDbGetCategoriesOnResourcesByCategoryId = jest.fn();
    mockCategoryOnResourceDbGetCategoriesOnResourcesByResourceId = jest.fn();
    mockCategoryOnResourceDbDeleteCategoryOnResource = jest.fn();
    mockResourceDbGetResourceById = jest.fn();
    mockCategoryDbGetCategoryById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: valid values for categoryOnResource, when: creating a categoryOnResource, then: should create a categoryOnResource`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({ profileId });
    categoryDb.getCategoryById = mockCategoryDbGetCategoryById.mockReturnValue({});
    categoryOnResourceDb.getCategoryOnResource = mockCategoryOnResourceDbGetCategoryOnResource.mockReturnValue(null);
    categoryOnResourceDb.createCategoryOnResource =
        mockCategoryOnResourceDbCreateCategoryOnResource.mockReturnValue(categoryOnResource);

    // when
    const result = await categoryOnResourceService.createCategoryOnResource(
        { id: String(profileId) } as AuthenticationResponse,
        categoryOnResourceInput
    );

    // then
    expect(result).toBeDefined();
    expect(result).toBe(categoryOnResource);
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(resourceId);
    expect(mockCategoryDbGetCategoryById).toHaveBeenCalledWith(categoryId);
    expect(mockCategoryOnResourceDbCreateCategoryOnResource).toHaveBeenCalledWith(categoryId, resourceId);
});

test(`given: invalid resourceId, when: creating a categoryOnResource, then: should throw error`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue(null);

    // when
    const sut = async () =>
        await categoryOnResourceService.createCategoryOnResource(
            { id: String(profileId) } as AuthenticationResponse,
            categoryOnResourceInput
        );

    // then
    await expect(sut).rejects.toThrowError('Resource with id 2 does not exist');
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(resourceId);
});

test(`given: invalid categoryId, when: creating a categoryOnResource, then: should throw error`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({ profileId });
    categoryDb.getCategoryById = mockCategoryDbGetCategoryById.mockReturnValue(null);

    // when
    const sut = async () =>
        await categoryOnResourceService.createCategoryOnResource(
            { id: String(profileId) } as AuthenticationResponse,
            categoryOnResourceInput
        );

    // then
    await expect(sut).rejects.toThrowError('Category not found');
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(resourceId);
    expect(mockCategoryDbGetCategoryById).toHaveBeenCalledWith(categoryId);
});

test(`given: already existing categoryOnResource, when: creating a categoryOnResource, then: should throw error`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({ profileId });
    categoryDb.getCategoryById = mockCategoryDbGetCategoryById.mockReturnValue({});
    categoryOnResourceDb.getCategoryOnResource =
        mockCategoryOnResourceDbGetCategoryOnResource.mockReturnValue(categoryOnResource);

    // when
    const sut = async () =>
        await categoryOnResourceService.createCategoryOnResource(
            { id: String(profileId) } as AuthenticationResponse,
            categoryOnResourceInput
        );

    // then
    await expect(sut).rejects.toThrowError('Category on resource already exists');
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(resourceId);
    expect(mockCategoryDbGetCategoryById).toHaveBeenCalledWith(categoryId);
});

test(`given: not owner of resource, when: creating a categoryOnResource, then: should throw error`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({ profileId: 2 });

    // when
    const sut = async () =>
        await categoryOnResourceService.createCategoryOnResource(
            { id: String(profileId) } as AuthenticationResponse,
            categoryOnResourceInput
        );

    // then
    await expect(sut).rejects.toThrowError('Not your resource');
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(resourceId);
});

test(`given: valid categoryId and resourceId, when: getting a categoryOnResource, then: should return a categoryOnResource`, async () => {
    // given
    categoryOnResourceDb.getCategoryOnResource =
        mockCategoryOnResourceDbGetCategoryOnResource.mockReturnValue(categoryOnResource);
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({});
    categoryDb.getCategoryById = mockCategoryDbGetCategoryById.mockReturnValue({});

    // when
    const result = await categoryOnResourceService.getCategoryOnResource(categoryId, resourceId);

    // then
    expect(result).toBeDefined();
    expect(result).toBe(categoryOnResource);
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(resourceId);
    expect(mockCategoryDbGetCategoryById).toHaveBeenCalledWith(categoryId);
    expect(mockCategoryOnResourceDbGetCategoryOnResource).toHaveBeenCalledWith(categoryId, resourceId);
});

test(`given: non existing categoryOnResource, when: getting a categoryOnResource, then: should throw error`, async () => {
    // given
    categoryOnResourceDb.getCategoryOnResource = mockCategoryOnResourceDbGetCategoryOnResource.mockReturnValue(null);
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({});
    categoryDb.getCategoryById = mockCategoryDbGetCategoryById.mockReturnValue({});

    // when
    const sut = async () => await categoryOnResourceService.getCategoryOnResource(categoryId, resourceId);

    // then
    await expect(sut).rejects.toThrowError('Category on resource not found');
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(resourceId);
    expect(mockCategoryDbGetCategoryById).toHaveBeenCalledWith(categoryId);
    expect(mockCategoryOnResourceDbGetCategoryOnResource).toHaveBeenCalledWith(categoryId, resourceId);
});

test(`given: existing categories on resources, when: getting all categories on resources, then: should return all categories on resources`, async () => {
    // given
    categoryOnResourceDb.getCategoriesOnResources = mockCategoryOnResourceDbGetCategoriesOnResources.mockReturnValue([
        categoryOnResource,
    ]);

    // when
    const result = await categoryOnResourceService.getCategoriesOnResources();

    // then
    expect(result).toBeDefined();
    expect(result).toEqual([categoryOnResource]);
    expect(mockCategoryOnResourceDbGetCategoriesOnResources).toHaveBeenCalledTimes(1);
});

test(`given: existing categories on resources, when: getting all categories on resources by categoryId, then: should return all categories on resources by categoryId`, async () => {
    // given
    categoryOnResourceDb.getCategoriesOnResourcesByCategoryId =
        mockCategoryOnResourceDbGetCategoriesOnResourcesByCategoryId.mockReturnValue([categoryOnResource]);
    categoryDb.getCategoryById = mockCategoryDbGetCategoryById.mockReturnValue({});

    // when
    const result = await categoryOnResourceService.getCategoriesOnResourcesByCategoryId(categoryId);

    // then
    expect(result).toBeDefined();
    expect(result).toEqual([categoryOnResource]);
    expect(mockCategoryOnResourceDbGetCategoriesOnResourcesByCategoryId).toHaveBeenCalledWith(categoryId);
});

test(`given: existing categories on resources, when: getting all categories on resources by resourceId, then: should return all categories on resources by resourceId`, async () => {
    // given
    categoryOnResourceDb.getCategoriesOnResourcesByResourceId =
        mockCategoryOnResourceDbGetCategoriesOnResourcesByResourceId.mockReturnValue([categoryOnResource]);
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({});

    // when
    const result = await categoryOnResourceService.getCategoriesOnResourcesByResourceId(resourceId);

    // then
    expect(result).toBeDefined();
    expect(result).toEqual([categoryOnResource]);
    expect(mockCategoryOnResourceDbGetCategoriesOnResourcesByResourceId).toHaveBeenCalledWith(resourceId);
});

test(`given: valid categoryId and resourceId, when: deleting a categoryOnResource, then: should delete a categoryOnResource`, async () => {
    // given
    categoryDb.getCategoryById = mockCategoryDbGetCategoryById.mockReturnValue({});
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({ profileId });
    categoryOnResourceDb.getCategoryOnResource =
        mockCategoryOnResourceDbGetCategoryOnResource.mockReturnValue(categoryOnResource);
    categoryOnResourceDb.deleteCategoryOnResource =
        mockCategoryOnResourceDbDeleteCategoryOnResource.mockReturnValue(categoryOnResource);

    // when
    const result = await categoryOnResourceService.deleteCategoryOnResource(
        { id: String(profileId) } as AuthenticationResponse,
        categoryId,
        resourceId
    );

    // then
    expect(result).toBeDefined();
    expect(result).toBe(categoryOnResource);
    expect(mockCategoryDbGetCategoryById).toHaveBeenCalledWith(categoryId);
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(resourceId);
    expect(mockCategoryOnResourceDbGetCategoryOnResource).toHaveBeenCalledWith(categoryId, resourceId);
    expect(mockCategoryOnResourceDbDeleteCategoryOnResource).toHaveBeenCalledWith(categoryId, resourceId);
});

test(`given: Not owner of resource, when: deleting a categoryOnResource, then: should throw error`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({ profileId: 2 });

    // when
    const sut = async () =>
        await categoryOnResourceService.deleteCategoryOnResource(
            { id: String(profileId) } as AuthenticationResponse,
            categoryId,
            resourceId
        );

    // then
    await expect(sut).rejects.toThrowError('Not your resource');
});
