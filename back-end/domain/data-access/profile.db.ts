import { Profile } from '../model/profile';
import { ProfileInput } from '../../types';
import { User } from '../model/user';
import { Resource } from '../model/resource';

let currentId = 0;

let profiles: Profile[] = [];

const getAllProfiles = (): Profile[] => profiles;

const getProfileById = (id: number): Profile => profiles.find((profile) => profile.id === id);

const getProfileByUserId = (userId: number): Profile => profiles.find((profile) => profile.user.id === userId);

const getProfileByUsername = (username: string): Profile => profiles.find((profile) => profile.username === username);

const createProfile = (user: User, username: string, bio: string, createdAt: Date, latestActivity: Date): Profile => {
    const profile = new Profile({
        id: currentId++,
        user,
        username,
        bio,
        createdAt,
        latestActivity,
    });
    profiles.push(profile);
    return profile;
};

const deleteProfile = (profile: Profile): Boolean => {
    profiles = profiles.filter((p) => p.id != profile.id);
    return true;
};

// const getProfilesWithLikeOnResource = (resource: Resource): Profile[] => {
//     const upvoters = profiles.filter((p) => p.likedResources.includes(resource));
//     return upvoters;
// };

export default {
    getAllProfiles,
    getProfileById,
    createProfile,
    getProfileByUserId,
    getProfileByUsername,
    deleteProfile,
    // getProfilesWithLikeOnResource,
};
