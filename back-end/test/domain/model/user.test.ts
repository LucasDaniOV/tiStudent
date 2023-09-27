import { User } from '../../../domain/model/user';

test(`given: valid values for user, when: user is created, then: user is created with those values`, () => {
    // given
    const email = 'test';
    const password = 'test';

    // when
    const user = new User({ email, password });

    // then
    expect(user.email).toEqual(email);
    expect(user.password).toEqual(password);
});
