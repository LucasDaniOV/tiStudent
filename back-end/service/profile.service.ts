import { UnauthorizedError } from 'express-jwt';
import profileDb from '../domain/data-access/profile.db';
import { Profile } from '../domain/model/profile';
import { AuthenticationResponse, ProfileInput, ProfileLikes, Role } from '../types';
import { generateJwtToken } from '../util/jwt';
import { comparePasswordWithHash, hashPassword } from '../util/password';

const createProfile = async (profileInput: ProfileInput): Promise<Profile> => {
    const { email, username, password, role, picture, bio } = profileInput;
    Profile.validate(email, username, password, role, picture, bio);

    if (await profileDb.getProfileByUsername(username)) throw new Error(`Username already exists`);

    if (await profileDb.getProfileByEmail(email)) throw new Error(`Email already exists`);

    const hashedPassword = await hashPassword(password);

    return await profileDb.createProfile(email, hashedPassword, username, role, bio, picture);
};

const getAllProfiles = async (role: Role): Promise<Profile[]> => {
    if (role !== 'ADMIN') {
        throw new UnauthorizedError('credentials_required', {
            message: 'Only admins can get all Profiles',
        });
    }
    return await profileDb.getAllProfiles();
};

const getProfileById = async (id: number): Promise<Profile> => {
    const profile = await profileDb.getProfileById(id);
    if (!profile) throw new Error(`Profile with id ${id} does not exist`);
    return profile;
};

const getProfileByEmail = async (email: string): Promise<Profile> => {
    const profile = await profileDb.getProfileByEmail(email);
    if (!profile) throw new Error(`Profile with email "${email}" does not exist`);
    return profile;
};

const getProfileByUsername = async (username: string): Promise<Profile> => {
    const profile = await profileDb.getProfileByUsername(username);
    if (!profile) throw new Error(`Profile with username "${username}" does not exist`);
    return profile;
};

const getProfileLikes = async (profileId: number): Promise<ProfileLikes> => {
    await getProfileById(profileId);
    return await profileDb.getProfileLikes(profileId);
};

const updateBio = async (profile: Profile, bio: string): Promise<Profile> => {
    Profile.validateBio(bio);
    if (profile.bio === bio) throw new Error(`New bio must be different from old bio`);
    return await profileDb.updateBio(profile.id, bio);
};

const updateEmail = async (profile: Profile, email: string): Promise<Profile> => {
    Profile.validateEmail(email);
    if (profile.email === email) throw new Error(`New email must be different from old email`);
    if (await profileDb.getProfileByEmail(email)) throw new Error(`Email already exists`);
    return await profileDb.updateEmail(profile.id, email);
};

const updatePassword = async (profile: Profile, password: string): Promise<Profile> => {
    Profile.validatePassword(password);

    if (await comparePasswordWithHash(password, profile.password)) {
        throw new Error(`New password must be different from old password`);
    }

    const hashedPassword = await hashPassword(password);
    return await profileDb.updatePassword(profile.id, hashedPassword);
};

const updateUsername = async (profile: Profile, username: string): Promise<Profile> => {
    Profile.validateUsername(username);
    if (profile.username === username) throw new Error(`New username must be different from old username`);
    if (await profileDb.getProfileByUsername(username)) throw new Error(`Username already exists`);
    return await profileDb.updateUsername(profile.id, username);
};

const updateRole = async (profile: Profile, role: Role): Promise<Profile> => {
    Profile.validateRole(role);
    if (profile.role === role) throw new Error(`New role must be different from old role`);
    return await profileDb.updateRole(profile.id, role);
};

const updateProfile = async (id: number, profileInput: ProfileInput): Promise<Profile> => {
    const profile = await getProfileById(id);
    const { bio, email, password, role, username } = profileInput;
    let result: Profile;

    if (bio) {
        result = await updateBio(profile, bio);
    }

    if (email) {
        result = await updateEmail(profile, email);
    }

    if (password) {
        result = await updatePassword(profile, password);
    }

    if (role) {
        result = await updateRole(profile, role);
    }

    if (username) {
        result = await updateUsername(profile, username);
    }

    return result;
};

const deleteProfile = async (profileId: number): Promise<Profile> => {
    await getProfileById(profileId);
    return await profileDb.deleteProfile(profileId);
};

const authenticate = async (email: string, password: string): Promise<AuthenticationResponse> => {
    const profile = await getProfileByEmail(email);

    const isValidPassword = await comparePasswordWithHash(password, profile.password);

    if (!isValidPassword) throw new Error('Invalid password');

    return {
        token: generateJwtToken({ email, role: profile.role }),
        email,
        id: String(profile.id),
        role: profile.role,
    };
};

export default {
    createProfile,
    getAllProfiles,
    getProfileById,
    getProfileByEmail,
    getProfileByUsername,
    getProfileLikes,
    updateBio,
    updateEmail,
    updatePassword,
    updateUsername,
    updateRole,
    updateProfile,
    deleteProfile,
    authenticate,
};
