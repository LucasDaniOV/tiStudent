import { User } from '../../../domain/model/user';

const validEmail = 'test@ucll.be';
const validPassword = 'Password!123';

test(`given: valid values for User, when: User is created, then: User is created with those values`, () => {
    // when
    const user = new User({ email: validEmail, password: validPassword });

    // then
    expect(user.email).toEqual(validEmail);
    expect(user.password).toEqual(validPassword);
});

test(`given: invalid email for User, when: User is created, then: User is not created and an error is thrown`, () => {
    // given
    const invalidEmail = 'test';

    // when
    const createUserInvalidEmail = () => new User({ email: invalidEmail, password: validPassword });

    // then
    expect(createUserInvalidEmail).toThrow("email must contain a '@'");
});

test(`given: invalid password (too short) for User, when: User is created, then: User is not created and error is thrown`, () => {
    // given
    const invalidPassword = 'weakest';

    // when
    const createUserInvalidPassword = () => new User({ email: validEmail, password: invalidPassword });

    // then
    expect(createUserInvalidPassword).toThrow('password must be at least 8 characters long');
});

test(`given: invalid password (no number) for User,  when: User is created, then: User is not created and error is thrown`, () => {
    // given
    const invalidPassword = 'lessbutstillweak';

    // when
    const createUserInvalidPassword = () => new User({ email: validEmail, password: invalidPassword });

    // then
    expect(createUserInvalidPassword).toThrow('password must contain at least 1 number');
});

test(`given: invalid password (no capital letter) for User,  when: User is created, then: User is not created and error is thrown`, () => {
    // given
    const invalidPassword = 'veryclose1';

    // when
    const createUserInvalidPassword = () => new User({ email: validEmail, password: invalidPassword });

    // then
    expect(createUserInvalidPassword).toThrow('password must contain at least 1 capital letter');
});

test(`given: invalid password (no special sign) for User,  when: User is created, then: User is not created and error is thrown`, () => {
    // given
    const invalidPassword = 'Veryveryclose1';

    // when
    const createUserInvalidPassword = () => new User({ email: validEmail, password: invalidPassword });

    // then
    expect(createUserInvalidPassword).toThrow(
        `password must contain at least 1 special character (!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?)`
    );
});

test(`given: user, when: getting email, then: email is returned`, () => {
    // given
    const user = new User({ email: validEmail, password: validPassword });

    // when
    const email = user.email;

    // then
    expect(email).toEqual(validEmail);
});

test(`given: user, when: getting password, then: password is returned`, () => {
    // given
    const user = new User({ email: validEmail, password: validPassword });

    // when
    const password = user.password;

    // then
    expect(password).toEqual(validPassword);
});

test(`given: user, when: setting valid email, then: email is set`, () => {
    // given
    const user = new User({ email: validEmail, password: validPassword });
    const newEmail = 'newemail@test.user';

    // when
    user.email = newEmail;

    // then
    expect(user.email).toEqual(newEmail);
});

test(`given: user, when: setting valid password, then: password is set`, () => {
    // given
    const user = new User({ email: validEmail, password: validPassword });
    const newPassword = 'newPassword!123';

    // when
    user.password = newPassword;

    // then
    expect(user.password).toEqual(newPassword);
});

test(`given: user, when: setting invalid email, then: error is thrown`, () => {
    // given
    const user = new User({ email: validEmail, password: validPassword });
    const invalidEmail = 'invalidemail';

    // when
    const sut = () => (user.email = invalidEmail);

    // then
    expect(sut).toThrow("email must contain a '@'");
});

test(`given: user, when: setting already existing email, then: error is thrown`, () => {
    // given
    const user = new User({ email: validEmail, password: validPassword });

    // when
    const sut = () => (user.email = validEmail);

    // then
    expect(sut).toThrow(`new email must be different from old email`);
});

test(`given: user, when: setting invalid password, then: error is thrown`, () => {
    // given
    const user = new User({ email: validEmail, password: validPassword });
    const invalidPassword = 'invalid';

    // when
    const sut = () => (user.password = invalidPassword);

    // then
    expect(sut).toThrow('password must be at least 8 characters long');
});

test(`given: user, when: setting already existing password, then: error is thrown`, () => {
    // given
    const user = new User({ email: validEmail, password: validPassword });

    // when
    const sut = () => (user.password = validPassword);

    // then
    expect(sut).toThrow(`new password must be different from old password`);
});
