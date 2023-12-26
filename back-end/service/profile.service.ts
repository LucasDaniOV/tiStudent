import bcrypt from 'bcrypt';
import { UnauthorizedError } from 'express-jwt';
import likeDb from '../domain/data-access/like.db';
import profileDb from '../domain/data-access/profile.db';
import { Like } from '../domain/model/like';
import { Profile } from '../domain/model/profile';
import { AuthenticationResponse, ProfileInput, Role } from '../types';
import { generateJwtToken } from '../util/jwt';

const getAllProfiles = async (role: Role) => {
    if (role !== 'admin')
        throw new UnauthorizedError('credentials_required', {
            message: 'Only admins can get all Profiles',
        });
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
}

const createProfile = async ({ email, password, role, username, bio }: ProfileInput): Promise<Profile> => {
    // check if errors occur when creating profile object
    const profile = new Profile({ email, password, username, role, bio });

    // check if username is already taken
    if (await profileDb.getProfileByUsername(username)) throw new Error(`Username already exists`);

    // check if email is already taken
    if (await profileDb.getProfileByEmail(email)) throw new Error(`Email already exists`);

    // create profile
    return await profileDb.createProfile(
        profile.email,
        await bcrypt.hash(profile.password, 12),
        profile.username,
        profile.role,
        profile.bio
    );
};

const getProfileField = async (profile: Profile, field: string) => {
    if (field == 'username') return profile.username;
    else if (field == 'bio') return profile.bio;
    else if (field == 'latestActivity') return profile.latestActivity;
    else if (field == 'likedResources') return await likeDb.getLikesByProfile(profile.id);
};

const updateField = async (id: number, field: string, value: string): Promise<any> => {
    if (field == 'bio') return await profileDb.updateProfileBio(id, value);
    else if (field == 'likes') {
        const likeId = parseInt(value);
        const likes = await likeDb.getLikesByProfile(id);
        const like = likes.find((l) => l.id == likeId);
        if (like) {
            const removed = await likeDb.deleteLike(likeId);
            if (removed) return await likeDb.getLikesByProfile(id);
            else throw new Error('Something went wrong');
        } else {
            throw new Error('Profile has no like on this object');
        }
    } else if (field == 'email') {
        Profile.validateEmail(value);
        const profile = await profileDb.getProfileById(id);
        if (profile.email === value) throw new Error(`New email must be different from old email`);
        return await profileDb.updateEmail(id, value);
    } else if (field == 'password') {
        Profile.validatePassword(value);
        const profile = await profileDb.getProfileById(id);
        if (profile.password === value) throw new Error(`New password must be different from old password`);
        return await profileDb.updatePassword(id, value);
        // }else if (field == "role"){  // Should it be possible to change roles?
    } else {
        throw new Error('Unsupported field');
    }
};

const deleteProfile = async (profileId: number): Promise<Boolean> => {
    return await profileDb.deleteProfile(profileId);
};

const getGithubAccessToken = async (code: string): Promise<string> => {
    try {
        const client_id = process.env.GITHUB_CLIENT_ID;
        const client_secret = process.env.GITHUB_CLIENT_SECRET;
        const required_scope = 'read:user';

        const res = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id,
                client_secret,
                code,
            }),
        });

        const { access_token, scope } = await res.json();
        if (scope !== required_scope) throw new Error('Invalid scope');
        return access_token;
    } catch (error) {
        throw new Error('Failed to fetch access token');
    }
};

const getGithubUser = async (access_token: string): Promise<any> => {
    try {
        const res = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return await res.json();
    } catch (error) {
        throw new Error('Failed to fetch user');
    }
};

const authenticate = async ({ email, password }: ProfileInput): Promise<AuthenticationResponse> => {
    const profile = await getProfileByEmail(email);

    const isValidPassword = await bcrypt.compare(password, profile.password);

    if (!isValidPassword) throw new Error('Invalid password');

    return {
        token: generateJwtToken({ email, role: profile.role }),
        email,
        id: String(profile.id),
        role: profile.role,
    };
};

export default {
    getAllProfiles,
    getProfileById,
    getProfileByEmail,
    getProfileByUsername,
    createProfile,
    getProfileField,
    updateField,
    deleteProfile,
    getGithubAccessToken,
    getGithubUser,
    authenticate,
};
