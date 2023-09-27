import { Category } from '../../../domain/model/category';

test(`given: valid values for category, when: category is created, then: category is created with those values`, () => {
    // given
    const name = 'Summary';

    // when
    const category = new Category({ name });

    // then
    expect(category.name).toEqual(name);
});
