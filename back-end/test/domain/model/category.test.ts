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
