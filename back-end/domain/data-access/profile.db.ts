import { Profile } from '../model/profile';
import { ProfileInput } from '../../types';
import { User } from '../model/user';
import { Resource } from '../model/resource';
import database from '../../util/database';

const getAllProfiles = async (): Promise<Profile[]> => {
    try {
        const profilesPrisma = await database.profile.findMany({
            include: {
                user: true,
            },
        });
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
            include: {
                user: true,
            },
        });
        if (profilePrisma) return Profile.from(profilePrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error. See server log for details.');
    }
    return;
};

const getProfileByUserId = async (userId: number): Promise<Profile> => {
    try {
        const profilePrisma = await database.profile.findUnique({
            where: {
                userId: userId,
            },
            include: {
                user: true,
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
                username,
            },
            include: {
                user: true,
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
    user: User,
    username: string,
    bio: string,
    createdAt: Date,
    latestActivity: Date
): Promise<Profile> => {
    try {
        const profile = new Profile({ user, username, bio, createdAt, latestActivity });
        const profilePrisma = await database.profile.create({
            data: {
                user: {
                    connect: {
                        id: user.id,
                    },
                },
                username: profile.username,
                bio: profile.bio,
                createdAt: new Date(),
                latestActivity: new Date(),
            },
            include: {
                user: true,
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
            where: { id },
            data: { bio: newBio, latestActivity: new Date() },
            include: { user: true },
        });
        return Profile.from(updatedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
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
    updateProfileBio,
    // getProfilesWithLikeOnResource,
};
