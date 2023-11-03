import profileDb from '../../domain/data-access/profile.db';
import userDb from '../../domain/data-access/user.db';
import { Profile } from '../../domain/model/profile';
import { User } from '../../domain/model/user';
import profileService from '../../service/profile.service';

const user = new User({ id: 0, email: 'profile.service.test@tistudent.be', password: 'profileServiceT3st_;D' });
const username = 'TheProfileServiceTester';

const profileInput = { userId: 0, username };

let mockProfileDbGetAllProfiles: jest.Mock;
let mockProfileDbGetProfileById: jest.Mock;
let mockProfileDbCreateProfile: jest.Mock;
let mockUserDbGetUserById: jest.Mock;
let mockProfileDbGetProfileByUserId: jest.Mock;
let mockProfileDbGetProfileByUsername: jest.Mock;

beforeEach(() => {
    mockProfileDbGetAllProfiles = jest.fn();
    mockProfileDbGetProfileById = jest.fn();
    mockProfileDbCreateProfile = jest.fn();
    mockUserDbGetUserById = jest.fn();
    mockProfileDbGetProfileByUserId = jest.fn();
    mockProfileDbGetProfileByUsername = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: valid values for Profile, when: Profile is created, then: Profile is created with those values`, async () => {
    // given
    const profile = new Profile({ user, username });
    userDb.getUserById = mockUserDbGetUserById.mockResolvedValue(user);
    profileDb.getProfileByUserId = mockProfileDbGetProfileByUserId.mockResolvedValue(undefined);
    profileDb.getProfileByUsername = mockProfileDbGetProfileByUsername.mockResolvedValue(undefined);
    profileDb.createProfile = mockProfileDbCreateProfile.mockResolvedValue(profile);
    // when
    const sut = await profileService.createProfile(profileInput);

    // then
    expect(mockProfileDbCreateProfile).toHaveBeenCalledTimes(1);
    expect(sut.username).toEqual(username);
    expect(sut.user).toEqual(user);
});

test(`given: invalid userId, when: Profile is created, then: error is thrown`, () => {
    // given
    userDb.getUserById = mockUserDbGetUserById.mockResolvedValue(undefined);

    // when
    const createProfile = async () => await profileService.createProfile({ userId: undefined, username });

    // then
    expect(createProfile).rejects.toThrowError('User with id undefined does not exist');
});

test(`given: existing Profile for User, when: Profile is created, then: error is thrown`, () => {
    // given
    const profile = new Profile({ user, username });
    profileDb.getProfileByUserId = mockProfileDbGetProfileByUserId.mockResolvedValue(profile);
    userDb.getUserById = mockUserDbGetUserById.mockResolvedValue(user);

    // when
    const createProfile = async () => await profileService.createProfile(profileInput);

    // then
    expect(createProfile).rejects.toThrowError('User already has a profile');
});

test(`given: taken username, when: Profile is created, then: error is thrown`, () => {
    // given
    userDb.getUserById = mockUserDbGetUserById.mockResolvedValue(user);
    profileDb.getProfileByUserId = mockProfileDbGetProfileByUserId.mockResolvedValue(undefined);
    profileDb.getProfileByUsername = mockProfileDbGetProfileByUsername.mockResolvedValue(new Profile({ user, username }));

    // when
    const createProfile = async () => await profileService.createProfile(profileInput);

    // then
    expect(createProfile).rejects.toThrowError('Username already exists');
});

test(`given: existing profiles, when: getAllProfiles is called, then: all profiles are returned`, async () => {
    // given
    const profiles = [
        new Profile({ user, username }),
        new Profile({ user, username }),
        new Profile({ user, username }),
        new Profile({ user, username }),
    ];
    profileDb.getAllProfiles = mockProfileDbGetAllProfiles.mockResolvedValue(profiles);

    // when
    const sut = await profileService.getAllProfiles();

    // then
    expect(sut).toEqual(profiles);
});

test(`given: existing profile, when: getProfileById is called, then: profile is returned`, async () => {
    // given
    const profile = new Profile({ user, username });
    profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue(profile);

    // when
    const sut = await profileService.getProfileById(0);

    // then
    expect(sut).toEqual(profile);
});

test(`given: non-existing profile, when: getProfileById is called, then: error is thrown`, () => {
    // given
    profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue(undefined);

    // when
    const getProfileById = async () => await profileService.getProfileById(0);

    // then
    expect(getProfileById).rejects.toThrowError('Profile with id 0 does not exist');
});
