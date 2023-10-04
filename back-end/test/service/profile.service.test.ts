import profileDb from '../../domain/data-access/profile.db';
import userDb from '../../domain/data-access/user.db';
import { Profile } from '../../domain/model/profile';
import { User } from '../../domain/model/user';
import profileService from '../../service/profile.service';

const user = new User({ id: 0, email: 'profile.service.test@tistudent.be', password: 'profileServiceT3st_;D' });
const username = 'TheProfileServiceTester';

const profileInput = { userId: 0, username };

let mockProfileDbGetAllProfiles: jest.SpyInstance<Profile[], [], any>;
let mockProfileDbGetProfileById: jest.SpyInstance<Profile, [id: number], any>;
let mockProfileDbCreateProfile: jest.SpyInstance<Profile, [user: User, username: string], any>;
let mockUserDbGetUserById: jest.SpyInstance<User, [id: number], any>;
let mockProfileDbGetProfileByUserId: jest.SpyInstance<Profile, [userId: number], any>;
let mockProfileDbGetProfileByUsername: jest.SpyInstance<Profile, [username: string], any>;

beforeEach(() => {
    mockProfileDbGetAllProfiles = jest.spyOn(profileDb, 'getAllProfiles');
    mockProfileDbGetProfileById = jest.spyOn(profileDb, 'getProfileById');
    mockProfileDbCreateProfile = jest.spyOn(profileDb, 'createProfile');
    mockUserDbGetUserById = jest.spyOn(userDb, 'getUserById');
    mockProfileDbGetProfileByUserId = jest.spyOn(profileDb, 'getProfileByUserId');
    mockProfileDbGetProfileByUsername = jest.spyOn(profileDb, 'getProfileByUsername');
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: valid values for Profile, when: Profile is created, then: Profile is created with those values`, () => {
    // given
    mockUserDbGetUserById.mockReturnValue(user);
    mockProfileDbGetProfileByUserId.mockReturnValue(undefined);
    mockProfileDbGetProfileByUsername.mockReturnValue(undefined);

    // when
    profileService.createProfile(profileInput);

    // then
    expect(mockProfileDbCreateProfile).toHaveBeenCalledTimes(1);
    expect(mockProfileDbCreateProfile).toHaveBeenCalledWith(user, username);
});

test(`given: invalid userId, when: Profile is created, then: error is thrown`, () => {
    // given
    mockUserDbGetUserById.mockReturnValue(undefined);

    // when
    const createProfile = () => profileService.createProfile({ userId: undefined, username });

    // then
    expect(createProfile).toThrowError('User with id undefined does not exist');
});

test(`given: existing Profile for User, when: Profile is created, then: error is thrown`, () => {
    // given
    const profile = new Profile({ user, username });
    mockProfileDbGetProfileByUserId.mockReturnValue(profile);
    mockUserDbGetUserById.mockReturnValue(user);

    // when
    const createProfile = () => profileService.createProfile(profileInput);

    // then
    expect(createProfile).toThrowError('User already has a profile');
});

test(`given: taken username, when: Profile is created, then: error is thrown`, () => {
    // given
    mockUserDbGetUserById.mockReturnValue(user);
    mockProfileDbGetProfileByUserId.mockReturnValue(undefined);
    mockProfileDbGetProfileByUsername.mockReturnValue(new Profile({ user, username }));

    // when
    const createProfile = () => profileService.createProfile(profileInput);

    // then
    expect(createProfile).toThrowError('Username already exists');
});

test(`given: existing profiles, when: getAllProfiles is called, then: all profiles are returned`, () => {
    // given
    const profiles = [
        new Profile({ user, username }),
        new Profile({ user, username }),
        new Profile({ user, username }),
        new Profile({ user, username }),
    ];
    mockProfileDbGetAllProfiles.mockReturnValue(profiles);

    // when
    const sut = profileService.getAllProfiles();

    // then
    expect(sut).toEqual(profiles);
});

test(`given: existing profile, when: getProfileById is called, then: profile is returned`, () => {
    // given
    const profile = new Profile({ user, username });
    mockProfileDbGetProfileById.mockReturnValue(profile);

    // when
    const sut = profileService.getProfileById(0);

    // then
    expect(sut).toEqual(profile);
});

test(`given: non-existing profile, when: getProfileById is called, then: error is thrown`, () => {
    // given
    mockProfileDbGetProfileById.mockReturnValue(undefined);

    // when
    const getProfileById = () => profileService.getProfileById(0);

    // then
    expect(getProfileById).toThrowError('Profile with id 0 does not exist');
});
