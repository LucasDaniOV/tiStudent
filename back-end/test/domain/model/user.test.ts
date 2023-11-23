import { User } from '../../../domain/model/user';
import { Role } from '../../../types';

const validEmail = 'test@ucll.be';
const validPassword = 'Password!123';
const validRole = 'user';

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

test(`given valid role, when: creating user, then: user is created with that role`, () => {
    // given
    const user = new User({ email: validEmail, password: validPassword, role: validRole });

    // when
    const role = user.role;

    // then
    expect(role).toEqual(validRole);
});

test(`given invalid role, when: creating user, then: user is not created and error is thrown`, () => {
    // given
    const invalidRole = 'invalid';

    // when
    const createUserInvalidRole = () => new User({ email: validEmail, password: validPassword, role: invalidRole as Role });

    // then
    expect(createUserInvalidRole).toThrow('role must be one of admin, user, or guest');
});
