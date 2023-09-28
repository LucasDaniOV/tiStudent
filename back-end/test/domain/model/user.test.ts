import { error } from 'console';
import { User } from '../../../domain/model/user';
const validEmail = 'test@ucll.be';
const validPassword = 'Password!123';

test(`given: valid values for User, when: User is created, then: User is created with those values`, () => {
    // given

    // when
    const user = new User({ email: validEmail, password: validPassword });

    // then
    expect(user.email).toEqual(validEmail);
    expect(user.password).toEqual(validPassword);
});

test(`given: invalid email for User, when: User is created, then: User is not created and an error is thrown`, () => {
    //given
    const invalidEmail = 'test';

    //when
    const createUserInvalidEmail = () => new User({ email: invalidEmail, password: validPassword });

    //then
    expect(createUserInvalidEmail).toThrow("Email must contain a '@'.");
});

//tests for password

test(`given: invalid password (too short) for User, when: User is created, then: User is not created and error is thrown`, () => {
    //given
    const invalidPassword = 'weakest';
    //when
    const createUserInvalidPassword = () =>
        new User({ email: validEmail, password: invalidPassword });
    //then

    expect(createUserInvalidPassword).toThrow('Password must be at least 8 characters long.');
});

test(`given: invalid password (no number) for User,  when: User is created, then: User is not created and error is thrown`, () => {
    //given
    const invalidPassword = 'lessbutstillweak';
    //when
    const createUserInvalidPassword = () =>
        new User({ email: validEmail, password: invalidPassword });
    //then

    expect(createUserInvalidPassword).toThrow('Password must contain at least 1 number.');
});

test(`given: invalid password (no capital letter) for User,  when: User is created, then: User is not created and error is thrown`, () => {
    //given
    const invalidPassword = 'veryclose1';
    //when
    const createUserInvalidPassword = () =>
        new User({ email: validEmail, password: invalidPassword });
    //then

    expect(createUserInvalidPassword).toThrow('Password must contain at least 1 capital letter.');
});

test(`given: invalid password (no special sign) for User,  when: User is created, then: User is not created and error is thrown`, () => {
    //given
    const invalidPassword = 'Veryveryclose1';
    //when
    const createUserInvalidPassword = () =>
        new User({ email: validEmail, password: invalidPassword });
    //then
    expect(createUserInvalidPassword).toThrow(
        `Password must contain at least 1 special sign (!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?).`
    );
});
