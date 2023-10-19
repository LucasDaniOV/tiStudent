import database from '../../util/database';
import { User } from '../model/user';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        if (usersPrisma) return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async (id: number): Promise<User> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                id,
            },
        });
        if (userPrisma) return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByEmail = async (email: string): Promise<User> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                email,
            },
        });
        if (userPrisma) return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async (email: string, password: string): Promise<User> => {
    try {
        const user = new User({ email, password });
        const userPrisma = await database.user.create({
            data: {
                email: user.email,
                password: user.password,
            },
        });
        if (userPrisma) return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteUser = async (id: number): Promise<Boolean> => {
    try {
        await database.user.delete({
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

const updateEmail = async (id: number, email: string): Promise<User> => {
    try {
        const userPrisma = await database.user.update({
            where: {
                id,
            },
            data: {
                email,
            },
        });
        if (userPrisma) return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updatePassword = async (id: number, password: string): Promise<User> => {
    try {
        const userPrisma = await database.user.update({
            where: {
                id,
            },
            data: {
                password,
            },
        });
        if (userPrisma) return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getAllUsers, getUserById, getUserByEmail, createUser, deleteUser, updateEmail, updatePassword };
