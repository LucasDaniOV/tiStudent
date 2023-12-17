import { Role } from '../../types';
import database from '../../util/database';
import { Profile } from '../model/profile';
import { Resource } from '../model/resource';
import likeDb from './like.db';

const getAllProfiles = async (): Promise<Profile[]> => {
    try {
        const profilesPrisma = await database.profile.findMany();
        if (profilesPrisma) return profilesPrisma.map((profilePrisma) => Profile.from(profilePrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.');
    }
};
const getProfileById = async (id: number): Promise<Profile> => {
    try {
        const profilePrisma = await database.profile.findUnique({
            where: {
                id,
            },
        });
        if (profilePrisma) return Profile.from(profilePrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.');
    }
    return;
};

const getProfileByUsername = async (username: string): Promise<Profile> => {
    try {
        const profilePrisma = await database.profile.findUnique({
            where: {
                username: username,
            },
        });
        if (profilePrisma) return Profile.from(profilePrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.');
    }
    return;
};

const createProfile = async (
    email: string,
    password: string,
    username: string,
    role?: Role,
    bio?: string
): Promise<Profile> => {
    try {
        const profile = new Profile({ email, password, role, username, bio });
        const profilePrisma = await database.profile.create({
            data: {
                email: profile.email,
                password: profile.password,
                role: profile.role,
                username: profile.username,
                bio: profile.bio,
                createdAt: new Date(),
                latestActivity: new Date(),
            },
        });
        if (profilePrisma) return Profile.from(profilePrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.');
    }
    return;
};

const deleteProfile = async (id: number): Promise<Boolean> => {
    try {
        await database.profile.delete({
            where: {
                id,
            },
        });
        return true;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateProfileBio = async (id: number, newBio: string): Promise<Profile> => {
    try {
        const updatedProfile = await database.profile.update({
            where: { id: id },
            data: { bio: newBio, latestActivity: new Date() },
        });
        return Profile.from(updatedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getProfilesWithLikeOnResource = async (resource: Resource): Promise<Profile[]> => {
    const profiles = await getAllProfiles();
    const likes = await likeDb.getLikesOnResource(resource.id);
    return profiles.filter((p) => likes.filter((like) => like.profile.id == p.id));
};

export default {
    getAllProfiles,
    getProfileById,
    createProfile,
    getProfileByUsername,
    deleteProfile,
    updateProfileBio,
    getProfilesWithLikeOnResource,
};
