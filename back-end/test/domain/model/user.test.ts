import { User } from '../../../domain/model/user';

test(`given: valid values for User, when: User is created, then: User is created with those values`, () => {
    // given
    const email = 'test';
    const password = 'test';

    // when
    const user = new User({ email, password });

    // then
    expect(user.email).toEqual(email);
    expect(user.password).toEqual(password);
});
