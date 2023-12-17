import { Profile } from '../../../domain/model/profile';
import { User } from '../../../domain/model/user';
import { Role } from '../../../types';

const validEmail = 'test@ucll.be';
const validPassword = 'Password!123';
const validRole = 'user';
const user = new User({ email: 'sudo@tistudent.be', password: 'TopSecret007$' });
const user2 = new User({ email: 'profile.test@tistudent.be', password: 'ProfileTest007$' });
const username = 'sudo';
const username2 = 'profileTest';
const bio = 'The Terminator';
const bio2 = "I'll be back";

test(`given: valid values for Profile, when: Profile is created, then: Profile is created`, () => {
    // when
    const profile = new Profile({ validEmail, validPassword, validRole, username, bio });
    // then
    expect(profile instanceof Profile).toBeTruthy();
});

test(`given: no email for Profile, when: Profile is created, then: Profile is not created and an error is thrown`, () => {
    // when
    const createProfileInvalidEmail = () =>
        new Profile({ email: undefined, password: validPassword, role: validRole, username: username, bio: bio });

    // then
    expect(createProfileInvalidEmail).toThrow('Email is required');
});

test(`given: invalid email for Profile, when: Profile is created, then: Profile is not created and an error is thrown`, () => {
    // given
    const invalidEmail = 'test';

    // when
    const createProfileInvalidEmail = () =>
        new Profile({ email: invalidEmail, password: validPassword, role: validRole, username: username, bio: bio });

    // then
    expect(createProfileInvalidEmail).toThrow("Email must contain a '@'");
});

test(`given: invalid password (too short) for Profile, when: Profile is created, then: Profile is not created and error is thrown`, () => {
    // given
    const invalidPassword = 'weakest';

    // when
    const createProfileInvalidPassword = () =>
        new Profile({ email: validEmail, password: invalidPassword, role: validRole, username: username, bio: bio });
    // then
    expect(createProfileInvalidPassword).toThrow('Password must be at least 8 characters long');
});

test(`given: invalid password (no number) for Profile, when: Profile is created, then: Profile is not created and error is thrown`, () => {
    // given
    const invalidPassword = 'lessbutstillweak';

    // when
    const createProfileInvalidPassword = () =>
        new Profile({ email: validEmail, password: invalidPassword, role: validRole, username: username, bio: bio });

    // then
    expect(createProfileInvalidPassword).toThrow('Password must contain at least 1 number');
});

test(`given: invalid password (no capital letter) for Profile,  when: Profile is created, then: Profile is not created and error is thrown`, () => {
    // given
    const invalidPassword = 'veryclose1';

    // when
    const createProfileInvalidPassword = () =>
        new Profile({ email: validEmail, password: invalidPassword, role: validRole, username: username, bio: bio });

    // then
    expect(createProfileInvalidPassword).toThrow('Password must contain at least 1 capital letter');
});

test(`given: invalid password (no special sign) for Profile,  when: Profile is created, then: Profile is not created and error is thrown`, () => {
    // given
    const invalidPassword = 'Veryveryclose1';

    // when
    const createProfileInvalidPassword = () =>
        new Profile({ email: validEmail, password: invalidPassword, role: validRole, username: username, bio: bio });

    // then
    expect(createProfileInvalidPassword).toThrow(
        `Password must contain at least 1 special character (!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?)`
    );
});

// test(`given: no user, when: Profile is created, then: error is thrown`, () => {
//     // when
//     const createProfile = () => new Profile({ user: undefined, username, bio });

//     // then
//     expect(createProfile).toThrowError('user is required');
// });

test(`given: no username, when: Profile is created, then: error is thrown`, () => {
    // when
    const createProfile = () =>
        new Profile({ email: validEmail, password: validPassword, role: validRole, username: undefined, bio: bio });
    // then
    expect(createProfile).toThrowError('Username is required');
});

test(`given: too long username, when: Profile is created, then: error is thrown`, () => {
    // given
    const longUsername = 'a'.repeat(31);

    // when
    const createProfile = () =>
        new Profile({ email: validEmail, password: validPassword, role: validRole, username: longUsername, bio: bio });

    // then
    expect(createProfile).toThrowError('Username cannot be longer than 30 characters');
});

test(`given: no createdAt, when: Profile is created, then: createdAt is set to now`, () => {
    // when
    const profile = new Profile({
        email: validEmail,
        password: validPassword,
        role: validRole,
        username: username,
        bio: bio,
    });

    // then
    expect(new Date().getTime() - profile.createdAt.getTime()).toBeLessThan(1000);
});

test(`given: valid values for Profile, when: Profile is created, then: latestActivity is set to now`, () => {
    // when
    const profile = new Profile({
        email: validEmail,
        password: validPassword,
        role: validRole,
        username: username,
        bio: bio,
    });

    // then
    expect(new Date().getTime() - profile.latestActivity.getTime()).toBeLessThan(1000);
});

test(`given: valid values for Profile, when: Profile is created, then: latestActivity equals createdAt`, () => {
    // when
    const profile = new Profile({
        email: validEmail,
        password: validPassword,
        role: validRole,
        username: username,
        bio: bio,
    });

    // then
    expect(profile.latestActivity).toEqual(profile.createdAt);
});

test(`given: no bio, when: Profile is created, then: bio is undefined`, () => {
    // when
    const profile = new Profile({ email: validEmail, password: validPassword, role: validRole, username: username });

    // then
    expect(profile.bio).toBeUndefined();
});

test(`given: too long bio, when: Profile is created, then: error is thrown`, () => {
    // given
    const longBio = 'a'.repeat(201);

    // when
    const createProfile = () =>
        new Profile({ email: validEmail, password: validPassword, role: validRole, username: username, bio: longBio });

    // then
    expect(createProfile).toThrowError('bio cannot be longer than 200 characters');
});

test(`given: existing Profile, when: getLatestActivity is called, then: latestActivity is returned`, () => {
    // given
    const profile = new Profile({
        email: validEmail,
        password: validPassword,
        role: validRole,
        username: username,
        bio: bio,
    });

    // when
    const sut = profile.latestActivity;

    // then
    expect(sut instanceof Date).toBeTruthy();
    expect(sut).toEqual(profile.latestActivity);
});

test(`given: existing Profile, when: getUsername is called, then: username is returned`, () => {
    // given
    const un = 'profileTest';
    const profile = new Profile({
        email: validEmail,
        password: validPassword,
        role: validRole,
        username: un,
        bio: bio,
    });
    // when
    const sut = profile.username;

    // then
    expect(sut).toEqual(un);
});

test(`given: existing Profile, when: getBio is called, then: bio is returned`, () => {
    // given
    const b = 'profileTest';

    // when
    const sut = new Profile({ user, username, bio: b });
    new Profile({ email: validEmail, password: validPassword, role: validRole, username: username, bio: b });

    // then
    expect(sut.bio).toEqual(b);
});

test(`given: existing Profile, when: equals is called with same Profile, then: true is returned`, () => {
    // given
    const profile = new Profile({
        email: validEmail,
        password: validPassword,
        role: validRole,
        username: username,
        bio: bio,
    });
    const profile2 = new Profile({
        email: validEmail,
        password: validPassword,
        role: validRole,
        username: username,
        bio: bio,
    });

    // when
    const sut = profile.equals(profile2);

    // then
    expect(sut).toBeTruthy();
});

test(`given: existing Profile, when: equals is called with different Profile, then: false is returned`, () => {
    // given
    const profile = new Profile({
        email: validEmail,
        password: validPassword,
        role: validRole,
        username: username,
        bio: bio,
    });
    const profile2 = new Profile({
        email: validEmail,
        password: validPassword,
        role: validRole,
        username: username2,
        bio: bio2,
    });

    // when
    const sut = profile.equals(profile2);

    // then
    expect(sut).toBeFalsy();
});

test(`given: Profile, when: getting email, then: email is returned`, () => {
    // given
    const profile = new Profile({
        email: validEmail,
        password: validPassword,
        role: validRole,
        username: username,
        bio: bio,
    });

    // when
    const email = Profile.email;

    // then
    expect(email).toEqual(validEmail);
});

test(`given: Profile, when: getting password, then: password is returned`, () => {
    // given
    const profile = new Profile({
        email: validEmail,
        password: validPassword,
        role: validRole,
        username: username,
        bio: bio,
    });

    // when
    const password = Profile.password;

    // then
    expect(password).toEqual(validPassword);
});

test(`given valid role, when: creating Profile, then: Profile is created with that role`, () => {
    // given
    const profile = new Profile({
        email: validEmail,
        password: validPassword,
        role: validRole,
        username: username2,
        bio: bio2,
    });
    // when
    const role = Profile.role;

    // then
    expect(role).toEqual(validRole);
});

test(`given invalid role, when: creating Profile, then: Profile is not created and error is thrown`, () => {
    // given
    const invalidRole = 'invalid';

    // when
    const createProfileInvalidRole = () =>
        new Profile({
            email: validEmail,
            password: validPassword,
            role: invalidRole as Role,
            username: username2,
            bio: bio2,
        });

    // then
    expect(createProfileInvalidRole).toThrow('Role must be one of "admin", "user", or "guest"');
});
