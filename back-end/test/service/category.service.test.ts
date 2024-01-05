import categoryDb from '../../domain/data-access/category.db';
import { Category } from '../../domain/model/category';
import categoryService from '../../service/category.service';
import { AuthenticationResponse } from '../../types';

const name = 'name';
const id = 1;
const newName = 'newName';

const category = new Category({
    id,
    name,
});

let mockCategoryDbCreateCategory = jest.fn();
let mockCategoryDbGetCategoryByName = jest.fn();
let mockCategoryDbGetCategoryById = jest.fn();
let mockCategoryDbGetAllCategories = jest.fn();
let mockCategoryDbUpdateCategory = jest.fn();
let mockCategoryDbDeleteCategory = jest.fn();

beforeEach(() => {
    mockCategoryDbCreateCategory = jest.fn();
    mockCategoryDbGetCategoryByName = jest.fn();
    mockCategoryDbGetCategoryById = jest.fn();
    mockCategoryDbGetAllCategories = jest.fn();
    mockCategoryDbUpdateCategory = jest.fn();
    mockCategoryDbDeleteCategory = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: valid values for category, when: creating a category, then: should create a category`, async () => {
    // given
    mockCategoryDbCreateCategory.mockReturnValue(category);
    categoryDb.createCategory = mockCategoryDbCreateCategory;

    // when
    const result = await categoryService.createCategory(name, { role: 'ADMIN' } as AuthenticationResponse);

    // then
    expect(result).toBeDefined();
    expect(result).toBe(category);
    expect(mockCategoryDbCreateCategory).toHaveBeenCalledWith(name);
});

test(`given: invalid role, when: creating a category, then: error is thrown`, async () => {
    // given
    // when
    const sut = async () => await categoryService.createCategory(name, { role: 'USER' } as AuthenticationResponse);

    // then
    await expect(sut).rejects.toThrowError('Only admins can create categories');
    expect(mockCategoryDbCreateCategory).not.toHaveBeenCalled();
});

test(`given: valid id for category, when: category is requested, then: category is returned`, async () => {
    // given
    mockCategoryDbGetCategoryById.mockReturnValue(category);
    categoryDb.getCategoryById = mockCategoryDbGetCategoryById;

    // when
    const result = await categoryService.getCategoryById(id);

    // then
    expect(result).toBeDefined();
    expect(result).toBe(category);
    expect(mockCategoryDbGetCategoryById).toHaveBeenCalledWith(id);
});

test(`given: invalid id for category, when: category is requested, then: error is thrown`, async () => {
    // given
    mockCategoryDbGetCategoryById.mockReturnValue(undefined);
    categoryDb.getCategoryById = mockCategoryDbGetCategoryById;

    // when
    const sut = async () => await categoryService.getCategoryById(id);

    // then
    await expect(sut).rejects.toThrowError('Category not found');
    expect(mockCategoryDbGetCategoryById).toHaveBeenCalledWith(id);
});

test(`given: valid name for category, when: category is requested, then: category is returned`, async () => {
    // given
    mockCategoryDbGetCategoryByName.mockReturnValue(category);
    categoryDb.getCategoryByName = mockCategoryDbGetCategoryByName;

    // when
    const result = await categoryService.getCategoryByName(name);

    // then
    expect(result).toBeDefined();
    expect(result).toBe(category);
    expect(mockCategoryDbGetCategoryByName).toHaveBeenCalledWith(name);
});

test(`given: invalid name for category, when: category is requested, then: error is thrown`, async () => {
    // given
    mockCategoryDbGetCategoryByName.mockReturnValue(undefined);
    categoryDb.getCategoryByName = mockCategoryDbGetCategoryByName;

    // when
    const sut = async () => await categoryService.getCategoryByName(name);

    // then
    await expect(sut).rejects.toThrowError('Category not found');
    expect(mockCategoryDbGetCategoryByName).toHaveBeenCalledWith(name);
});

test(`given: existing categories, when: all categories are requested, then: all categories are returned`, async () => {
    // given
    mockCategoryDbGetAllCategories.mockReturnValue([category]);
    categoryDb.getAllCategories = mockCategoryDbGetAllCategories;

    // when
    const result = await categoryService.getAllCategories();

    // then
    expect(result).toBeDefined();
    expect(result).toEqual([category]);
    expect(mockCategoryDbGetAllCategories).toHaveBeenCalledTimes(1);
});

test(`given: no categories, when: all categories are requested, then: empty array is returned`, async () => {
    // given
    mockCategoryDbGetAllCategories.mockReturnValue([]);
    categoryDb.getAllCategories = mockCategoryDbGetAllCategories;

    // when
    const result = await categoryService.getAllCategories();

    // then
    expect(result).toBeDefined();
    expect(result).toEqual([]);
    expect(mockCategoryDbGetAllCategories).toHaveBeenCalledTimes(1);
});

test(`given: valid values for category, when: category is updated, then: category is updated`, async () => {
    // given
    mockCategoryDbUpdateCategory.mockReturnValue(category);
    mockCategoryDbGetCategoryByName.mockReturnValue(undefined);
    mockCategoryDbGetCategoryById.mockReturnValue(category);
    categoryDb.getCategoryByName = mockCategoryDbGetCategoryByName;
    categoryDb.updateCategory = mockCategoryDbUpdateCategory;
    categoryDb.getCategoryById = mockCategoryDbGetCategoryById;

    // when
    const result = await categoryService.updateCategory(id, newName, { role: 'ADMIN' } as AuthenticationResponse);

    // then
    expect(result).toBeDefined();
    expect(result).toBe(category);
    expect(mockCategoryDbUpdateCategory).toHaveBeenCalledTimes(1);
    expect(mockCategoryDbUpdateCategory).toHaveBeenCalledWith(id, newName);
});

test(`given: invalid id for category, when: category is updated, then: error is thrown`, async () => {
    // given
    mockCategoryDbGetCategoryById.mockReturnValue(undefined);
    categoryDb.getCategoryById = mockCategoryDbGetCategoryById;

    // when
    const sut = async () =>
        await categoryService.updateCategory(id, newName, { role: 'ADMIN' } as AuthenticationResponse);

    // then
    await expect(sut).rejects.toThrowError('Category not found');
    expect(mockCategoryDbGetCategoryById).toHaveBeenCalledWith(id);
});

test(`given: existing category with new name, when: category is updated, then: error is thrown`, async () => {
    // given
    mockCategoryDbGetCategoryByName.mockReturnValue(category);
    mockCategoryDbGetCategoryById.mockReturnValue(category);
    categoryDb.getCategoryByName = mockCategoryDbGetCategoryByName;
    categoryDb.getCategoryById = mockCategoryDbGetCategoryById;

    // when
    const sut = async () =>
        await categoryService.updateCategory(id, newName, { role: 'ADMIN' } as AuthenticationResponse);

    // then
    await expect(sut).rejects.toThrowError('Category already exists');
    expect(mockCategoryDbGetCategoryByName).toHaveBeenCalledWith(newName);
});

test(`given: invalid role, when: category is updated, then: error is thrown`, async () => {
    // given
    // when
    const sut = async () => await categoryService.updateCategory(id, newName, { role: 'USER' } as AuthenticationResponse);

    // then
    await expect(sut).rejects.toThrowError('Only admins can update categories');
    expect(mockCategoryDbUpdateCategory).not.toHaveBeenCalled();
});

test(`given: valid id for category, when: category is deleted, then: category is deleted`, async () => {
    // given
    mockCategoryDbGetCategoryById.mockReturnValue(category);
    mockCategoryDbDeleteCategory.mockReturnValue(category);
    categoryDb.getCategoryById = mockCategoryDbGetCategoryById;
    categoryDb.deleteCategory = mockCategoryDbDeleteCategory;

    // when
    const result = await categoryService.deleteCategory(id, { role: 'ADMIN' } as AuthenticationResponse);

    // then
    expect(result).toBeDefined();
    expect(result).toBe(category);
    expect(mockCategoryDbGetCategoryById).toHaveBeenCalledWith(id);
    expect(mockCategoryDbDeleteCategory).toHaveBeenCalledWith(id);
});

test(`given: invalid id for category, when: category is deleted, then: error is thrown`, async () => {
    // given
    mockCategoryDbGetCategoryById.mockReturnValue(undefined);
    categoryDb.getCategoryById = mockCategoryDbGetCategoryById;

    // when
    const sut = async () => await categoryService.deleteCategory(id, { role: 'ADMIN' } as AuthenticationResponse);

    // then
    await expect(sut).rejects.toThrowError('Category not found');
    expect(mockCategoryDbGetCategoryById).toHaveBeenCalledWith(id);
});

test(`given: invalid role, when: category is deleted, then: error is thrown`, async () => {
    // given
    // when
    const sut = async () => await categoryService.deleteCategory(id, { role: 'USER' } as AuthenticationResponse);

    // then
    await expect(sut).rejects.toThrowError('Only admins can delete categories');
    expect(mockCategoryDbDeleteCategory).not.toHaveBeenCalled();
});
