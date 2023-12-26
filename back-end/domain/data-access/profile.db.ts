import { Role } from '../../types';
import database from '../../util/database';
import { Profile } from '../model/profile';
import { Resource } from '../model/resource';
import likeDb from './like.db';
import resourceDb from './resource.db';

const getAllProfiles = async (): Promise<Profile[]> => {
    try {
        const profilesPrisma = await database.profile.findMany();
        if (profilesPrisma) return profilesPrisma.map((profilePrisma) => Profile.from(profilePrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Database error when getting all profiles. See server log for details.');
    }
};
const getProfileById = async (id: number): Promise<Profile> => {
    try {
        const profilePrisma = await database.profile.findUnique({
            where: {
                id: id,
            },
        });
        if (profilePrisma) return Profile.from(profilePrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error when getting profile by id. See server log for details.');
    }
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
        throw new Error('Database error when getting profile by username. See server log for details.');
    }
};

const getProfileByEmail = async (email: string): Promise<Profile> => {
    try {
        const profilePrisma = await database.profile.findUnique({
            where: {
                email: email,
            },
        });
        if (profilePrisma) return Profile.from(profilePrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error when getting profile by email. See server log for details.');
    }
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
        throw new Error('Database error when creating profile. See server log for details.');
    }
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
        throw new Error('Database error when deleting profile. See server log for details.');
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
        throw new Error('Database error when updating profile bio. See server log for details.');
    }
};
const updateEmail = async (id: number, newEmail: string): Promise<Profile> => {
    try {
        const updatedProfile = await database.profile.update({
            where: { id: id },
            data: { email: newEmail, latestActivity: new Date() },
        });
        return Profile.from(updatedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating profile email. See server log for details.');
    }
};
const updatePassword = async (id: number, newPassword: string): Promise<Profile> => {
    try {
        const updatedProfile = await database.profile.update({
            where: { id: id },
            data: { password: newPassword, latestActivity: new Date() },
        });
        return Profile.from(updatedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating profile password. See server log for details.');
    }
};

const getProfilesWithLikeOnResource = async (resource: Resource): Promise<Profile[]> => {
    const profiles = await getAllProfiles();
    const likes = await likeDb.getLikesOnResource(resource.id);
    return profiles.filter((p) => likes.filter((like) => like.profile.id == p.id));
};

const getLeaderboard = async () => {
    try {
        const profiles = await getAllProfiles();

        const ordered = await Promise.all(
            profiles.map(async (profile) => {
                const resourceCount = (await resourceDb.getResourcesByProfile(profile.id)).length;
                return { profile, resourceCount };
            })
        );
        ordered.sort((a, b) => b.resourceCount - a.resourceCount);
        return ordered.slice(0, 10);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllProfiles,
    getProfileById,
    getProfileByUsername,
    getProfileByEmail,
    createProfile,
    deleteProfile,
    updateProfileBio,
    updateEmail,
    updatePassword,
    getProfilesWithLikeOnResource,
    getLeaderboard,
};
