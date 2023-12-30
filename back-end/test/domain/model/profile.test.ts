import { Profile } from '../../../domain/model/profile';
import { Role } from '../../../types';

const validId = 1;
const validCreatedAt = new Date();
const validUpdatedAt = new Date();
const validLatestActivity = new Date();
const validEmail = 'test@ucll.be';
const validUsername = 'sudo';
const validPassword = 'Password!123';
const validRole = 'USER';
const validBio = 'The Terminator';

const username2 = 'profileTest';
const bio2 = "I'll be back";

test(`given: valid values for Profile, when: Profile is created, then: Profile is created`, () => {
    // when
    const profile = new Profile({
        id: validId,
        createdAt: validCreatedAt,
        updatedAt: validUpdatedAt,
        latestActivity: validLatestActivity,
        email: validEmail,
        username: validUsername,
        password: validPassword,
        role: validRole,
        bio: validBio,
    });

    // then
    expect(profile instanceof Profile).toBeTruthy();
});

test(`given: no email for Profile, when: Profile is created, then: Profile is not created and an error is thrown`, () => {
    // when
    const createProfileInvalidEmail = () =>
        new Profile({
            id: validId,
            createdAt: validCreatedAt,
            updatedAt: validUpdatedAt,
            latestActivity: validLatestActivity,
            email: undefined,
            username: validUsername,
            password: validPassword,
            role: validRole,
            bio: validBio,
        });

    // then
    expect(createProfileInvalidEmail).toThrow('Email is required');
});

test(`given: invalid email for Profile, when: Profile is created, then: Profile is not created and an error is thrown`, () => {
    // given
    const invalidEmail = 'test';

    // when
    const createProfileInvalidEmail = () =>
        new Profile({
            id: validId,
            createdAt: validCreatedAt,
            updatedAt: validUpdatedAt,
            latestActivity: validLatestActivity,
            email: invalidEmail,
            username: validUsername,
            password: validPassword,
            role: validRole,
            bio: validBio,
        });

    // then
    expect(createProfileInvalidEmail).toThrow("Email must contain a '@'");
});

test(`given: invalid password (too short) for Profile, when: Profile is created, then: Profile is not created and error is thrown`, () => {
    // given
    const invalidPassword = 'weakest';

    // when
    const createProfileInvalidPassword = () =>
        new Profile({
            id: validId,
            createdAt: validCreatedAt,
            updatedAt: validUpdatedAt,
            latestActivity: validLatestActivity,
            email: validEmail,
            username: validUsername,
            password: invalidPassword,
            role: validRole,
            bio: validBio,
        });

    // then
    expect(createProfileInvalidPassword).toThrow('Password must be at least 8 characters long');
});

test(`given: invalid password (no number) for Profile, when: Profile is created, then: Profile is not created and error is thrown`, () => {
    // given
    const invalidPassword = 'lessbutstillweak';

    // when
    const createProfileInvalidPassword = () =>
        new Profile({
            id: validId,
            createdAt: validCreatedAt,
            updatedAt: validUpdatedAt,
            latestActivity: validLatestActivity,
            email: validEmail,
            username: validUsername,
            password: invalidPassword,
            role: validRole,
            bio: validBio,
        });

    // then
    expect(createProfileInvalidPassword).toThrow('Password must contain at least 1 number');
});

test(`given: invalid password (no capital letter) for Profile,  when: Profile is created, then: Profile is not created and error is thrown`, () => {
    // given
    const invalidPassword = 'veryclose1';

    // when
    const createProfileInvalidPassword = () =>
        new Profile({
            id: validId,
            createdAt: validCreatedAt,
            updatedAt: validUpdatedAt,
            latestActivity: validLatestActivity,
            email: validEmail,
            username: validUsername,
            password: invalidPassword,
            role: validRole,
            bio: validBio,
        });

    // then
    expect(createProfileInvalidPassword).toThrow('Password must contain at least 1 capital letter');
});

test(`given: invalid password (no special sign) for Profile,  when: Profile is created, then: Profile is not created and error is thrown`, () => {
    // given
    const invalidPassword = 'Veryveryclose1';

    // when
    const createProfileInvalidPassword = () =>
        new Profile({
            id: validId,
            createdAt: validCreatedAt,
            updatedAt: validUpdatedAt,
            latestActivity: validLatestActivity,
            email: validEmail,
            username: validUsername,
            password: invalidPassword,
            role: validRole,
            bio: validBio,
        });

    // then
    expect(createProfileInvalidPassword).toThrow(
        `Password must contain at least 1 special character (!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?)`
    );
});

test(`given: no username, when: Profile is created, then: error is thrown`, () => {
    // when
    const createProfile = () =>
        new Profile({
            id: validId,
            createdAt: validCreatedAt,
            updatedAt: validUpdatedAt,
            latestActivity: validLatestActivity,
            email: validEmail,
            username: undefined,
            password: validPassword,
            role: validRole,
            bio: validBio,
        });

    // then
    expect(createProfile).toThrowError('Username is required');
});

test(`given: too long username, when: Profile is created, then: error is thrown`, () => {
    // given
    const longUsername = 'a'.repeat(31);

    // when
    const createProfile = () =>
        new Profile({
            id: validId,
            createdAt: validCreatedAt,
            updatedAt: validUpdatedAt,
            latestActivity: validLatestActivity,
            email: validEmail,
            username: longUsername,
            password: validPassword,
            role: validRole,
            bio: validBio,
        });

    // then
    expect(createProfile).toThrowError('Username cannot be longer than 30 characters');
});

test(`given: no bio, when: Profile is created, then: bio is undefined`, () => {
    // when
    const profile = new Profile({
        id: validId,
        createdAt: validCreatedAt,
        updatedAt: validUpdatedAt,
        latestActivity: validLatestActivity,
        email: validEmail,
        username: validUsername,
        password: validPassword,
        role: validRole,
    });

    // then
    expect(profile.bio).toBeUndefined();
});

test(`given: too long bio, when: Profile is created, then: error is thrown`, () => {
    // given
    const longBio = 'a'.repeat(201);

    // when
    const createProfile = () =>
        new Profile({
            id: validId,
            createdAt: validCreatedAt,
            updatedAt: validUpdatedAt,
            latestActivity: validLatestActivity,
            email: validEmail,
            username: validUsername,
            password: validPassword,
            role: validRole,
            bio: longBio,
        });

    // then
    expect(createProfile).toThrowError('Bio cannot be longer than 200 characters');
});

test(`given: existing Profile, when: equals is called with same Profile, then: true is returned`, () => {
    // given
    const profile = new Profile({
        id: validId,
        createdAt: validCreatedAt,
        updatedAt: validUpdatedAt,
        latestActivity: validLatestActivity,
        email: validEmail,
        username: validUsername,
        password: validPassword,
        role: validRole,
        bio: validBio,
    });

    const profile2 = new Profile({
        id: validId,
        createdAt: validCreatedAt,
        updatedAt: validUpdatedAt,
        latestActivity: validLatestActivity,
        email: validEmail,
        username: validUsername,
        password: validPassword,
        role: validRole,
        bio: validBio,
    });

    // when
    const sut = profile.equals(profile2);

    // then
    expect(sut).toBeTruthy();
});

test(`given: existing Profile, when: equals is called with different Profile, then: false is returned`, () => {
    // given
    const profile = new Profile({
        id: validId,
        createdAt: validCreatedAt,
        updatedAt: validUpdatedAt,
        latestActivity: validLatestActivity,
        email: validEmail,
        username: validUsername,
        password: validPassword,
        role: validRole,
        bio: validBio,
    });

    const profile2 = new Profile({
        id: validId,
        createdAt: validCreatedAt,
        updatedAt: validUpdatedAt,
        latestActivity: validLatestActivity,
        email: validEmail,
        username: username2,
        password: validPassword,
        role: validRole,
        bio: bio2,
    });

    // when
    const sut = profile.equals(profile2);

    // then
    expect(sut).toBeFalsy();
});

test(`given invalid role, when: creating Profile, then: Profile is not created and error is thrown`, () => {
    // given
    const invalidRole = 'invalid';

    // when
    const createProfileInvalidRole = () =>
        new Profile({
            id: validId,
            createdAt: validCreatedAt,
            updatedAt: validUpdatedAt,
            latestActivity: validLatestActivity,
            email: validEmail,
            username: validUsername,
            password: validPassword,
            role: invalidRole as Role,
            bio: validBio,
        });

    // then
    expect(createProfileInvalidRole).toThrow('Role must be one of "ADMIN", "USER"');
});
