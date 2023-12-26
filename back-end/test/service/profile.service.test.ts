import profileDb from '../../domain/data-access/profile.db';
import { Profile } from '../../domain/model/profile';
import profileService from '../../service/profile.service';
import { Role } from '../../types';

const validEmail = 'profile.service.test@tistudent.be';
const validPassword = 'profileServiceT3st_;D';
const validRole = 'user';
const username = 'TheProfileServiceTester';
const profileInput = { userId: 0, email: validEmail, password: validPassword, username, role: validRole as Role };

let mockProfileDbGetAllProfiles: jest.Mock;
let mockProfileDbGetProfileById: jest.Mock;
let mockProfileDbGetProfileByEmail: jest.Mock;
let mockProfileDbCreateProfile: jest.Mock;
let mockProfileDbUpdateEmail: jest.Mock;
let mockProfileDbGetProfileByUsername: jest.Mock;

beforeEach(() => {
    mockProfileDbGetAllProfiles = jest.fn();
    mockProfileDbGetProfileById = jest.fn();
    mockProfileDbGetProfileByEmail = jest.fn();
    mockProfileDbCreateProfile = jest.fn();
    mockProfileDbUpdateEmail = jest.fn();
    mockProfileDbGetProfileByUsername = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: existing Profile, when: getProfileByUsername is called, then: existing Profile is returned`, async () => {
    // given
    const profile = new Profile({ email: validEmail, password: validPassword, role: validRole, username: username });
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
})

test(`given: valid values for Profile, when: Profile is created, then: Profile is created with those values`, async () => {
    // given
    const profile = new Profile({ email: validEmail, password: validPassword, role: validRole, username: username });
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
    profileDb.getProfileByUsername = mockProfileDbGetProfileByUsername.mockResolvedValue(
        new Profile({ email: validEmail, password: validPassword, role: validRole, username: username })
    );
    // when
    const createProfile = async () => await profileService.createProfile(profileInput);

    // then
    expect(createProfile).rejects.toThrowError('Username already exists');
});

test(`given: taken email, when: Profile is created, then: error is thrown`, () => {
    // given
    const profile = new Profile({ email: validEmail, password: validPassword, role: validRole, username: username });
    profileDb.getProfileByUsername = mockProfileDbGetProfileByUsername.mockResolvedValue(undefined);
    profileDb.getProfileByEmail = mockProfileDbGetProfileByEmail.mockResolvedValue(profile);

    // when
    const createProfile = async () => await profileService.createProfile(profileInput);

    // then
    expect(createProfile).rejects.toThrowError('Email already exists');
});

test(`hash password`, async () =>  {
    // given
    const password = 'password';

    // when
    const hashedPassword = await profileService.hashPassword(password);
    
    // then
    expect(hashedPassword).not.toEqual(password);
});

test(`given: existing profiles, when: getAllProfiles is called, then: all profiles are returned`, async () => {
    // given
    const profiles = [
        new Profile({ email: validEmail, password: validPassword, role: validRole, username: username }),
    ];
    profileDb.getAllProfiles = mockProfileDbGetAllProfiles.mockResolvedValue(profiles);

    // when
    const sut = await profileService.getAllProfiles('admin');

    // then
    expect(sut).toEqual(profiles);
});

test(`given: existing profile, when: getProfileById is called, then: profile is returned`, async () => {
    // given
    const profile = new Profile({ email: validEmail, password: validPassword, role: validRole, username: username });
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

test(`given: valid values, when: updating Profile, then: Profile is updated`, async () => {
    // given
    const validId = 42;
    const validProfile = new Profile({
        id: validId,
        email: validEmail,
        password: validPassword,
        role: validRole,
        username: username,
    });
    const validNewEmail = 'newemail@tistudent.be';
    profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue(validProfile);
    profileDb.updateEmail = mockProfileDbUpdateEmail.mockResolvedValue(
        new Profile({ id: validId, email: validNewEmail, password: validPassword, role: validRole, username: username })
    );

    //when
    const sut = await profileService.updateField(validProfile.id, 'email', validNewEmail);

    //then
    expect(sut.email).toBe(validNewEmail);
    expect(mockProfileDbGetProfileById).toHaveBeenCalledTimes(1);
    expect(mockProfileDbGetProfileById).toHaveBeenCalledWith(validId);
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
    expect(sut).rejects.toThrowError('Role must be one of "admin", "user", or "guest"');
});

test(`given: unauthorized role, when: requesting all Profiles, then: Error is thrown`, () => {
    // given
    const unauthorizedRole = 'guest';

    // when
    const sut = async () => await profileService.getAllProfiles(unauthorizedRole);

    // then
    expect(sut).rejects.toThrowError('Only admins can get all Profiles');
});

test(`given: existing Profile, when: getProfileByEmail, then: existing Profile is returned`, async () => {
    // given
    const profile = new Profile({ email: validEmail, password: validPassword, role: validRole, username: username });
    profileDb.getProfileByEmail = mockProfileDbGetProfileByEmail.mockResolvedValue(profile);

    // when
    const sut = await profileService.getProfileByEmail(validEmail);

    // then
    expect(sut).toEqual(profile);
});

test(`given: non-existing Profile, when: getProfileByEmail, then: error is thrown`, () => {
    // given
    profileDb.getProfileByEmail = mockProfileDbGetProfileByEmail.mockResolvedValue(undefined);

    // when
    const sut = async () => await profileService.getProfileByEmail(validEmail);

    // then
    expect(sut).rejects.toThrowError(`Profile with email "${validEmail}" does not exist`);
});
