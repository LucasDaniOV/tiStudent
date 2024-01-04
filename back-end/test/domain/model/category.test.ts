import { Category } from '../../../domain/model/category';

const id: number = 1;
const name: string = 'name';

test(`given: valid values for category, when: creating a category, then: should create a category`, () => {
    // given
    // when
    const category = new Category({ id, name });

    // then
    expect(category.id).toBe(id);
    expect(category.name).toBe(name);
});

test(`given: empty name for category, when: creating a category, then: should throw an error`, () => {
    // given
    const invalidName = '';

    // when
    const createCategory = () => new Category({ id, name: invalidName });

    // then
    expect(createCategory).toThrowError('name is required');
});

test(`given: too long name for category, when: creating a category, then: should throw an error`, () => {
    // given
    const invalidName = 'a'.repeat(61);

    // when
    const createCategory = () => new Category({ id, name: invalidName });

    // then
    expect(createCategory).toThrowError('name cannot be longer than 60 characters');
});

test(`given: not a string for category, when: creating a category, then: should throw an error`, () => {
    // given
    const invalidName = 1;

    // when
    const createCategory = () => new Category({ id, name: invalidName as unknown as string });

    // then
    expect(createCategory).toThrowError('name must be a string');
});

test(`given: null for category id, when: creating a category, then: should throw an error`, () => {
    // given
    // when
    const createCategory = () => new Category({ id: null, name });

    // then
    expect(createCategory).toThrowError('id is required');
});

test(`given: undefined for category id, when: creating a category, then: should throw an error`, () => {
    // given
    // when
    const createCategory = () => new Category({ id: undefined, name });

    // then
    expect(createCategory).toThrowError('id is required');
});

test(`given: not a number for category id, when: creating a category, then: should throw an error`, () => {
    // given
    const invalidId = '1';

    // when
    const createCategory = () => new Category({ id: invalidId as unknown as number, name });

    // then
    expect(createCategory).toThrowError('id must be a number');
});

test(`given: negative number for category id, when: creating a category, then: should throw an error`, () => {
    // given
    const invalidId = -1;

    // when
    const createCategory = () => new Category({ id: invalidId, name });

    // then
    expect(createCategory).toThrowError('id cannot be negative');
});

test(`given: valid values for category, when: comparing two categories, then: should return true`, () => {
    // given
    const category = new Category({ id, name });

    // when
    const equals = category.equals(category);

    // then
    expect(equals).toBe(true);
});

test(`given: valid values for category, when: comparing two categories, then: should return false`, () => {
    // given
    const category = new Category({ id, name });
    const otherCategory = new Category({ id: 2, name: 'otherName' });

    // when
    const equals = category.equals(otherCategory);

    // then
    expect(equals).toBe(false);
});

test(`given: valid values for category, when: creating a category from a prisma category, then: should create a category`, () => {
    // given
    const categoryPrisma = { id, name };

    // when
    const category = Category.from(categoryPrisma);

    // then
    expect(category.id).toBe(id);
    expect(category.name).toBe(name);
});
