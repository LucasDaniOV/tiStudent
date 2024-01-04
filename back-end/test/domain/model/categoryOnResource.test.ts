import { CategoryOnResource } from '../../../domain/model/categoryOnResource';

const categoryId: number = 1;
const resourceId: number = 1;

test(`given: valid values for categoryOnResource, when: creating a categoryOnResource, then: should create a categoryOnResource`, () => {
    // given
    // when
    const categoryOnResource = new CategoryOnResource(categoryId, resourceId);

    // then
    expect(categoryOnResource.categoryId).toBe(categoryId);
    expect(categoryOnResource.resourceId).toBe(resourceId);
});

test(`given: valid values for categoryOnResource, when: comparing two categoryOnResources, then: should return true`, () => {
    // given
    const categoryOnResource = new CategoryOnResource(categoryId, resourceId);

    // when
    const equals = categoryOnResource.equals(categoryOnResource);

    // then
    expect(equals).toBe(true);
});

test(`given: valid values for categoryOnResource, when: comparing two categoryOnResources, then: should return false`, () => {
    // given
    const categoryOnResource = new CategoryOnResource(categoryId, resourceId);
    const otherCategoryOnResource = new CategoryOnResource(2, 2);

    // when
    const equals = categoryOnResource.equals(otherCategoryOnResource);

    // then
    expect(equals).toBe(false);
});

test(`given: valid values for categoryOnResource, when: creating a categoryOnResource from prisma, then: should create a categoryOnResource`, () => {
    // given
    const categoryOnResourcePrisma = {
        categoryId,
        resourceId,
    };

    // when
    const categoryOnResource = CategoryOnResource.from(categoryOnResourcePrisma);

    // then
    expect(categoryOnResource.categoryId).toBe(categoryId);
    expect(categoryOnResource.resourceId).toBe(resourceId);
});

test(`given: empty categoryId for categoryOnResource, when: creating a categoryOnResource, then: should throw an error`, () => {
    // given
    // when
    const createCategoryOnResource = () => new CategoryOnResource(null, resourceId);

    // then
    expect(createCategoryOnResource).toThrowError('categoryId is required');
});

test(`given: empty resourceId for categoryOnResource, when: creating a categoryOnResource, then: should throw an error`, () => {
    // given
    // when
    const createCategoryOnResource = () => new CategoryOnResource(categoryId, null);

    // then
    expect(createCategoryOnResource).toThrowError('resourceId is required');
});

test(`given: negative categoryId for categoryOnResource, when: creating a categoryOnResource, then: should throw an error`, () => {
    // given
    // when
    const createCategoryOnResource = () => new CategoryOnResource(-1, resourceId);

    // then
    expect(createCategoryOnResource).toThrowError('categoryId cannot be negative');
});

test(`given: negative resourceId for categoryOnResource, when: creating a categoryOnResource, then: should throw an error`, () => {
    // given
    // when
    const createCategoryOnResource = () => new CategoryOnResource(categoryId, -1);

    // then
    expect(createCategoryOnResource).toThrowError('resourceId cannot be negative');
});

test(`given: string categoryId for categoryOnResource, when: creating a categoryOnResource, then: should throw an error`, () => {
    // given
    // when
    const createCategoryOnResource = () => new CategoryOnResource('1' as unknown as number, resourceId);

    // then
    expect(createCategoryOnResource).toThrowError('categoryId must be a number');
});

test(`given: string resourceId for categoryOnResource, when: creating a categoryOnResource, then: should throw an error`, () => {
    // given
    // when
    const createCategoryOnResource = () => new CategoryOnResource(categoryId, '1' as unknown as number);

    // then
    expect(createCategoryOnResource).toThrowError('resourceId must be a number');
});
