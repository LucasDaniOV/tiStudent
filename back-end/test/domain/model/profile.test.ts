import { Profile } from '../../../domain/model/profile';
import { User } from '../../../domain/model/user';

const user = new User({ email: 'sudo@tistudent.be', password: 'TopSecret007$' });
const user2 = new User({ email: 'profile.test@tistudent.be', password: 'ProfileTest007$' });
const username = 'sudo';
const username2 = 'profileTest';
const bio = 'The Terminator';
const bio2 = "I'll be back";

test(`given: valid values for Profile, when: Profile is created, then: Profile is created`, () => {
    // when
    const profile = new Profile({ user, username, bio });

    // then
    expect(profile instanceof Profile).toBeTruthy();
    expect(profile.user).toEqual(user);
});

test(`given: no user, when: Profile is created, then: error is thrown`, () => {
    // when
    const createProfile = () => new Profile({ user: undefined, username, bio });

    // then
    expect(createProfile).toThrowError('user is required');
});

test(`given: no username, when: Profile is created, then: error is thrown`, () => {
    // when
    const createProfile = () => new Profile({ user, username: undefined, bio });

    // then
    expect(createProfile).toThrowError('username is required');
});

test(`given: too long username, when: Profile is created, then: error is thrown`, () => {
    // given
    const longUsername = 'a'.repeat(31);

    // when
    const createProfile = () => new Profile({ user, username: longUsername, bio });

    // then
    expect(createProfile).toThrowError('username cannot be longer than 30 characters');
});

test(`given: no createdAt, when: Profile is created, then: createdAt is set to now`, () => {
    // when
    const profile = new Profile({ user, username, bio });

    // then
    expect(new Date().getTime() - profile.createdAt.getTime()).toBeLessThan(1000);
});

test(`given: valid values for Profile, when: Profile is created, then: latestActivity is set to now`, () => {
    // when
    const profile = new Profile({ user, username, bio });

    // then
    expect(new Date().getTime() - profile.getLatestActivity().getTime()).toBeLessThan(1000);
});

test(`given: valid values for Profile, when: Profile is created, then: latestActivity equals createdAt`, () => {
    // when
    const profile = new Profile({ user, username, bio });

    // then
    expect(profile.getLatestActivity()).toEqual(profile.createdAt);
});

test(`given: no bio, when: Profile is created, then: bio is undefined`, () => {
    // when
    const profile = new Profile({ user, username });

    // then
    expect(profile.getBio()).toBeUndefined();
});

test(`given: too long bio, when: Profile is created, then: error is thrown`, () => {
    // given
    const longBio = 'a'.repeat(201);

    // when
    const createProfile = () => new Profile({ user, username, bio: longBio });

    // then
    expect(createProfile).toThrowError('bio cannot be longer than 200 characters');
});

test(`given: existing profile, when: getLatestActivity is called, then: latestActivity is returned`, () => {
    // given
    const profile = new Profile({ user, username, bio });

    // when
    const sut = profile.getLatestActivity();

    // then
    expect(sut instanceof Date).toBeTruthy();
    expect(sut).toEqual(profile.getLatestActivity());
});

test(`given: existing profile, when: getUsername is called, then: username is returned`, () => {
    // given
    const un = 'profileTest';
    const profile = new Profile({ user, username: un, bio });

    // when
    const sut = profile.getUsername();

    // then
    expect(sut).toEqual(un);
});

test(`given: existing profile, when: getBio is called, then: bio is returned`, () => {
    // given
    const b = 'profileTest';

    // when
    const sut = new Profile({ user, username, bio: b });

    // then
    expect(sut.getBio()).toEqual(b);
});

test(`given: existing profile, when: equals is called with same profile, then: true is returned`, () => {
    // given
    const profile = new Profile({ user, username, bio });
    const profile2 = new Profile({ user, username, bio });

    // when
    const sut = profile.equals({ user: profile2.user, username: profile2.getUsername(), bio: profile2.getBio() });

    // then
    expect(sut).toBeTruthy();
});

test(`given: existing profile, when: equals is called with different profile, then: false is returned`, () => {
    // given
    const profile = new Profile({ user, username, bio });
    const profile2 = new Profile({ user: user2, username: username2, bio: bio2 });

    // when
    const sut = profile.equals({ user: profile2.user, username: profile2.getUsername(), bio: profile2.getBio() });

    // then
    expect(sut).toBeFalsy();
});

test(`given: existing profile, when: updateLatestActivity is called, then: latestActivity is updated`, async () => {
    // given
    const profile = new Profile({ user, username, bio });
    const oldLatestActivity = profile.getLatestActivity();

    // when
    await new Promise((resolve) => setTimeout(resolve, 1000));
    profile.updateLatestActivity();
    const newLatestActivity = profile.getLatestActivity();

    // then
    expect(newLatestActivity.getTime()).toBeGreaterThan(oldLatestActivity.getTime());
});

test(`given: existing profile, when: updateUsername is called, then: username is updated`, () => {
    // given
    const profile = new Profile({ user, username, bio });
    const oldUsername = profile.getUsername();

    // when
    profile.updateUsername(username2);
    const newUsername = profile.getUsername();

    // then
    expect(newUsername).not.toEqual(oldUsername);
    expect(newUsername).toEqual(username2);
});

test(`given: existing profile, when: updateBio is called, then: bio is updated`, () => {
    // given
    const profile = new Profile({ user, username, bio });
    const oldBio = profile.getBio();

    // when
    profile.updateBio(bio2);
    const newBio = profile.getBio();

    // then
    expect(newBio).not.toEqual(oldBio);
    expect(newBio).toEqual(bio2);
});

test(`given: existing profile, when: updateUsername is called with too long username, then: error is thrown`, () => {
    // given
    const profile = new Profile({ user, username, bio });

    // when
    const updateUsername = () => profile.updateUsername('a'.repeat(31));

    // then
    expect(updateUsername).toThrowError('username cannot be longer than 30 characters');
});

test(`given: existing profile, when: updateBio is called with too long bio, then: error is thrown`, () => {
    // given
    const profile = new Profile({ user, username, bio });

    // when
    const updateBio = () => profile.updateBio('a'.repeat(201));

    // then
    expect(updateBio).toThrowError('bio cannot be longer than 200 characters');
});

test(`given: existing profile, when: updateUsername is called with undefined username, then: error is thrown`, () => {
    // given
    const profile = new Profile({ user, username, bio });

    // when
    const updateUsername = () => profile.updateUsername(undefined);

    // then
    expect(updateUsername).toThrowError('username is required');
});

test(`given: existing profile, when: updateBio is called with undefined bio, then: error is thrown`, () => {
    // given
    const profile = new Profile({ user, username, bio });

    // when
    const updateBio = () => profile.updateBio(undefined);

    // then
    expect(updateBio).toThrowError('bio is required');
});

test(`given: existing profile, when: username is succesfully updated, then: latestActivity is updated`, async () => {
    // given
    const profile = new Profile({ user, username, bio });

    // when
    await new Promise((resolve) => setTimeout(resolve, 1000));
    profile.updateUsername(username2);
    const latestActivity = profile.getLatestActivity();

    // then
    expect(new Date().getTime() - latestActivity.getTime()).toBeLessThan(1000);
    expect(latestActivity.getTime()).toBeGreaterThan(profile.createdAt.getTime());
});

test(`given: existing profile, when: bio is succesfully updated, then: latestActivity is updated`, async () => {
    // given
    const profile = new Profile({ user, username, bio });

    // when
    await new Promise((resolve) => setTimeout(resolve, 1000));
    profile.updateBio(bio2);
    const latestActivity = profile.getLatestActivity();

    // then
    expect(new Date().getTime() - latestActivity.getTime()).toBeLessThan(1000);
    expect(latestActivity.getTime()).toBeGreaterThan(profile.createdAt.getTime());
});
