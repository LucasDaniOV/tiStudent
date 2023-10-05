import profileDb from '../domain/data-access/profile.db';
import resourceService from './resource.service';
import userDb from '../domain/data-access/user.db';
import { Profile } from '../domain/model/profile';
import { Resource } from '../domain/model/resource';
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

const likeResource = async ({ profileId, resourceId }): Promise<Resource> => {
    const profile = getProfileById(profileId);
    if (!profile) throw new Error(`Profile with id ${profileId} does not exist`);
    const resource = await resourceService.getResourceById(resourceId);
    if (!resource) throw new Error(`Resource with id ${resourceId} does not exist`);
    profile.likeResource(resource);
    resource.addUpvoter({ userId: profile.id, username: profile.getUsername() });
    return resource;
};

const getLikedResources = (profileId: number): Resource[] => {
    const profile = profileDb.getProfileById(profileId);
    return profile.getLikedResources();
};

export default { getAllProfiles, getProfileById, createProfile, likeResource, getLikedResources };
