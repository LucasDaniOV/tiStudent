import { ProfileLikes, Role } from '../../types';
import database from '../../util/database';
import { Profile } from '../model/profile';
import { ResourceLike } from '../model/resourceLike';
import { CommentLike } from '../model/commentLike';

const createProfile = async (
    email: string,
    password: string,
    username: string,
    role: Role,
    bio?: string,
    picture?: string
): Promise<Profile> => {
    try {
        const profilePrisma = await database.profile.create({
            data: {
                email,
                password,
                username,
                role,
                bio,
                picture,
            },
        });
        if (profilePrisma) return Profile.from(profilePrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error when creating profile. See server log for details.');
    }
};

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
                id,
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
                username,
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
                email,
            },
        });
        if (profilePrisma) return Profile.from(profilePrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error when getting profile by email. See server log for details.');
    }
};

const getProfileLikes = async (id: number): Promise<ProfileLikes> => {
    try {
        const res: ProfileLikes = await database.profile.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                username: true,
                resourceLikes: true,
                commentLikes: true,
            },
        });

        let profileLikes: ProfileLikes;

        if (res) {
            const resourceLikesPrisma = res.resourceLikes;
            const commentLikesPrisma = res.commentLikes;

            let resourceLikes: ResourceLike[];
            let commentLikes: CommentLike[];

            if (resourceLikesPrisma) {
                resourceLikes = resourceLikesPrisma.map((resourceLikePrisma) => ResourceLike.from(resourceLikePrisma));
            }

            if (commentLikesPrisma) {
                commentLikes = commentLikesPrisma.map((commentLikePrisma) => CommentLike.from(commentLikePrisma));
            }

            profileLikes = {
                id: res.id,
                username: res.username,
                resourceLikes,
                commentLikes,
            };

            return profileLikes;
        }
    } catch (error) {
        console.log(error);
        throw new Error('Database error when getting profile likes. See server log for details.');
    }
};

const updateBio = async (id: number, newBio: string): Promise<Profile> => {
    try {
        const updatedProfile = await database.profile.update({
            where: { id },
            data: { bio: newBio },
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
            where: { id },
            data: { email: newEmail },
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
            where: { id },
            data: { password: newPassword },
        });
        return Profile.from(updatedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating profile password. See server log for details.');
    }
};

const updateUsername = async (id: number, newUsername: string): Promise<Profile> => {
    try {
        const updatedProfile = await database.profile.update({
            where: { id },
            data: { username: newUsername },
        });
        return Profile.from(updatedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating profile username. See server log for details.');
    }
};

const updateRole = async (id: number, newRole: Role): Promise<Profile> => {
    try {
        const updatedProfile = await database.profile.update({
            where: { id },
            data: { role: newRole },
        });
        return Profile.from(updatedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating profile role. See server log for details.');
    }
};

const updatePicture = async (id: number, newPicture: string): Promise<Profile> => {
    try {
        const updatedProfile = await database.profile.update({
            where: { id },
            data: { picture: newPicture },
        });
        return Profile.from(updatedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when updating profile role. See server log for details.');
    }
};

const deleteProfile = async (id: number): Promise<Profile> => {
    try {
        const deletedProfile = await database.profile.delete({
            where: { id },
        });
        return Profile.from(deletedProfile);
    } catch (error) {
        console.error(error);
        throw new Error('Database error when deleting profile. See server log for details.');
    }
};

export default {
    createProfile,
    getAllProfiles,
    getProfileById,
    getProfileByUsername,
    getProfileByEmail,
    getProfileLikes,
    updateBio,
    updateEmail,
    updatePassword,
    updateUsername,
    updateRole,
    updatePicture,
    deleteProfile,
};
