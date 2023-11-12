import likeDb from '../domain/data-access/like.db';
import profileDb from '../domain/data-access/profile.db';
import userDb from '../domain/data-access/user.db';
import { Like } from '../domain/model/like';
import { Profile } from '../domain/model/profile';
import { ProfileInput } from '../types';

const getAllProfiles = async () => await profileDb.getAllProfiles();

const getProfileById = async (id: number): Promise<Profile> => {
    const profile = await profileDb.getProfileById(id);
    if (!profile) throw new Error(`Profile with id ${id} does not exist`);
    return profile;
};

const getProfileByEmail = async (email: string): Promise<Profile> => {
    const profiles = await profileDb.getAllProfiles();
    const profile = profiles.find((p) => p.user.email === email);
    if (!profile) throw new Error(`Profile with email "${email}" does not exist`);
    return profile;
};

const createProfile = async ({ username, bio, userId }: ProfileInput): Promise<Profile> => {
    // check that userID is a number
    if (typeof userId !== 'number') throw new Error('userId must be a number');

    // check if user with userId exists
    const user = await userDb.getUserById(userId);
    if (!user) throw new Error(`User with id ${userId} does not exist`);

    // check if user already has a profile
    if (await profileDb.getProfileByUserId(userId)) throw new Error(`User already has a profile`);

    // check if errors occur when creating profile object
    const profile = new Profile({ username, bio, user });

    // check if username is already taken
    if (await profileDb.getProfileByUsername(username)) throw new Error(`Username already exists`);

    // create profile
    return await profileDb.createProfile(profile.user, profile.username, profile.bio);
};

const getProfileField = async (profile: Profile, field: string) => {
    if (field == 'username') return profile.username;
    else if (field == 'bio') return profile.bio;
    else if (field == 'latestActivity') return profile.latestActivity;
    else if (field == 'likedResources') return await likeDb.getLikesByProfile(profile.id);
};

const updateField = async (profile: Profile, field: string, value: string): Promise<Profile | Like[]> => {
    if (field == 'bio') return await profileDb.updateProfileBio(profile.id, value);
    else if (field == 'likes') {
        const likeId = parseInt(value);
        const likes = await likeDb.getLikesByProfile(profile.id);
        const like = likes.findIndex((l) => l.id == likeId);
        if (like) {
            const removed = await likeDb.deleteLike(likeId);
            if (removed) return await likeDb.getLikesByProfile(profile.id);
            else throw new Error('Something went wrong');
        } else {
            throw new Error('Profile has no like on this object');
        }
    } else {
        throw new Error('Unsupported field');
    }
};

const deleteProfile = async (profileId: number): Promise<Boolean> => {
    return await profileDb.deleteProfile(profileId);
};

export default {
    getAllProfiles,
    getProfileById,
    getProfileByEmail,
    createProfile,
    getProfileField,
    updateField,
    deleteProfile,
};
