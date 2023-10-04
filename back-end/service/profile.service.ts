import profileDb from '../domain/data-access/profile.db';
import userDb from '../domain/data-access/user.db';
import { Profile } from '../domain/model/profile';
import { ProfileInput } from '../types';

const getAllProfiles = () => profileDb.getAllProfiles();

const getProfileById = (id: number) => {
    const profile = profileDb.getProfileById(id);
    if (!profile) throw new Error(`Profile with id ${id} does not exist`);
    return profile;
};

const createProfile = ({ userId, username }: ProfileInput): Profile => {
    const user = userDb.getUserById(userId);
    if (!user) throw new Error(`User with id ${userId} does not exist`);
    if (profileDb.getProfileByUserId(userId)) throw new Error(`User already has a profile`);
    const profile = new Profile({ user, username });
    if (profileDb.getProfileByUsername(username)) throw new Error(`Username already exists`);

    return profileDb.createProfile(profile.user, profile.getUsername());
};

export default { getAllProfiles, getProfileById, createProfile };
