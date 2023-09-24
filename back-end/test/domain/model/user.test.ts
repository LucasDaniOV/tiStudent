import { User } from '../../../domain/model/user';

test(`given: valid values for user, when: user is created, then: user is created with those values`, () => {
    // given
    const username = 'test';
    const password = 'test';

    // when
    const user = new User({ username, password });

    // then
    expect(user.username).toEqual(username);
    expect(user.password).toEqual(password);
});
