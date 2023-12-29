import profileDb from '../../domain/data-access/profile.db';
import { Profile } from '../../domain/model/profile';
import profileService from '../../service/profile.service';
import { ProfileInput, Role } from '../../types';

const id = 1;
const createdAt = new Date();
const updatedAt = new Date();
const latestActivity = new Date();
const email = 'profile.service.test@tistudent.be';
const password = 'profileServiceT3st_;D';
const role = 'USER';
const username = 'TheProfileServiceTester';

const updatedEmail = 'profile.service.test@tistudent.be2';
const updatedUsername = 'TheGodfather';

const profile = new Profile({
    id,
    createdAt,
    updatedAt,
    latestActivity,
    email,
    password,
    role,
    username,
});

const profileInput: ProfileInput = {
    email,
    password,
    role,
    username,
};

let mockProfileDbGetAllProfiles: jest.Mock;
let mockProfileDbGetProfileById: jest.Mock;
let mockProfileDbGetProfileByEmail: jest.Mock;
let mockProfileDbCreateProfile: jest.Mock;
let mockProfileDbGetProfileByUsername: jest.Mock;
let mockProfileDbUpdateEmail: jest.Mock;
let mockProfileDbUpdateUsername: jest.Mock;

beforeEach(() => {
    mockProfileDbGetAllProfiles = jest.fn();
    mockProfileDbGetProfileById = jest.fn();
    mockProfileDbGetProfileByEmail = jest.fn();
    mockProfileDbCreateProfile = jest.fn();
    mockProfileDbGetProfileByUsername = jest.fn();
    mockProfileDbUpdateEmail = jest.fn();
    mockProfileDbUpdateUsername = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: existing Profile, when: getProfileByUsername is called, then: existing Profile is returned`, async () => {
    // given
    profileDb.getProfileByUsername = mockProfileDbGetProfileByUsername.mockResolvedValue(profile);

    // when
    const sut = await profileService.getProfileByUsername(username);

    // then
    expect(sut).toEqual(profile);
});

test(`given: non-existing Profile, when: getProfileByUsername is called, then: error is thrown`, () => {
    // given
    profileDb.getProfileByUsername = mockProfileDbGetProfileByUsername.mockResolvedValue(undefined);

    // when
    const sut = async () => await profileService.getProfileByUsername(username);

    // then
    expect(sut).rejects.toThrowError(`Profile with username "${username}" does not exist`);
});

test(`given: valid values for Profile, when: Profile is created, then: Profile is created with those values`, async () => {
    // given
    profileDb.getProfileByUsername = mockProfileDbGetProfileByUsername.mockResolvedValue(undefined);
    profileDb.getProfileByEmail = mockProfileDbGetProfileByEmail.mockResolvedValue(undefined);
    profileDb.createProfile = mockProfileDbCreateProfile.mockResolvedValue(profile);

    // when
    const sut = await profileService.createProfile(profileInput);

    // then
    expect(mockProfileDbCreateProfile).toHaveBeenCalledTimes(1);
    expect(sut.username).toEqual(username);
});

test(`given: taken username, when: Profile is created, then: error is thrown`, () => {
    // given
    profileDb.getProfileByUsername = mockProfileDbGetProfileByUsername.mockResolvedValue(profile);

    // when
    const createProfile = async () => await profileService.createProfile(profileInput);

    // then
    expect(createProfile).rejects.toThrowError('Username already exists');
});

test(`given: taken email, when: Profile is created, then: error is thrown`, () => {
    // given
    profileDb.getProfileByUsername = mockProfileDbGetProfileByUsername.mockResolvedValue(undefined);
    profileDb.getProfileByEmail = mockProfileDbGetProfileByEmail.mockResolvedValue(profile);

    // when
    const createProfile = async () => await profileService.createProfile(profileInput);

    // then
    expect(createProfile).rejects.toThrowError('Email already exists');
});

test(`given: existing profiles, when: getAllProfiles is called, then: all profiles are returned`, async () => {
    // given
    profileDb.getAllProfiles = mockProfileDbGetAllProfiles.mockResolvedValue([profile]);

    // when
    const sut = await profileService.getAllProfiles('ADMIN');

    // then
    expect(sut).toEqual([profile]);
});

test(`given: existing profile, when: getProfileById is called, then: profile is returned`, async () => {
    // given
    profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue(profile);

    // when
    const sut = await profileService.getProfileById(1);

    // then
    expect(sut).toEqual(profile);
});

test(`given: non-existing profile, when: getProfileById is called, then: error is thrown`, () => {
    // given
    profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue(undefined);

    // when
    const getProfileById = async () => await profileService.getProfileById(69420);

    // then
    expect(getProfileById).rejects.toThrowError('Profile with id 69420 does not exist');
});

test(`given: existing email, when: updateEmail is called, then: error is thrown`, () => {
    // given
    profileDb.getProfileByEmail = mockProfileDbGetProfileByEmail.mockResolvedValue(profile);

    // when
    const sut = async () => await profileService.updateEmail(profile, updatedEmail);

    // then
    expect(sut).rejects.toThrowError('Email already exists');
});

test(`given: existing username, when: updateUsername is called, then: error is thrown`, () => {
    // given
    profileDb.getProfileByUsername = mockProfileDbGetProfileByUsername.mockResolvedValue(profile);

    // when
    const sut = async () => await profileService.updateUsername(profile, updatedUsername);

    // then
    expect(sut).rejects.toThrowError('Username already exists');
});

test(`given: invalid role, when: creating Profile, then: Profile is not created and error is thrown`, async () => {
    // given
    const invalidRole = 'invalidRole';
    profileDb.getProfileByEmail = mockProfileDbGetProfileByEmail.mockResolvedValue(undefined);

    // when
    const sut = async () =>
        await profileService.createProfile({
            email: profileInput.email,
            password: profileInput.password,
            username: profileInput.username,
            role: invalidRole as Role,
        });

    // then
    expect(sut).rejects.toThrowError('Role must be one of "ADMIN", "USER"');
});

test(`given: unauthorized role, when: requesting all Profiles, then: Error is thrown`, () => {
    // given
    const unauthorizedRole = 'USER';

    // when
    const sut = async () => await profileService.getAllProfiles(unauthorizedRole);

    // then
    expect(sut).rejects.toThrowError('Only admins can get all Profiles');
});

test(`given: existing Profile, when: getProfileByEmail, then: existing Profile is returned`, async () => {
    // given
    profileDb.getProfileByEmail = mockProfileDbGetProfileByEmail.mockResolvedValue(profile);

    // when
    const sut = await profileService.getProfileByEmail(email);

    // then
    expect(sut).toEqual(profile);
});

test(`given: non-existing Profile, when: getProfileByEmail, then: error is thrown`, () => {
    // given
    profileDb.getProfileByEmail = mockProfileDbGetProfileByEmail.mockResolvedValue(undefined);

    // when
    const sut = async () => await profileService.getProfileByEmail(email);

    // then
    expect(sut).rejects.toThrowError(`Profile with email "${email}" does not exist`);
});
