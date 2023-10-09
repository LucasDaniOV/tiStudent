import { ProfileInput } from '../../types';
import { Profile } from '../model/profile';
import { User } from '../model/user';

let currentId = 0;

let profiles: Profile[] = [];

const getAllProfiles = (): Profile[] => profiles;

const getProfileById = (id: number): Profile => profiles.find((profile) => profile.id === id);

const getProfileByUserId = (userId: number): Profile => profiles.find((profile) => profile.user.id === userId);

const getProfileByUsername = (username: string): Profile => profiles.find((profile) => profile.username === username);

const createProfile = (user: User, username: string): Profile => {
    const profile = new Profile({
        id: currentId++,
        user,
        username,
    });
    profiles.push(profile);
    return profile;
};

const deleteProfile = (profile: Profile): Boolean => {
    profiles = profiles.filter((p) => p.id != profile.id);
    return true;
};

export default {
    getAllProfiles,
    getProfileById,
    createProfile,
    getProfileByUserId,
    getProfileByUsername,
    deleteProfile,
};
