import database from '../../util/database';
import { User } from '../model/user';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.')
    }
};

const getUserById = async (id: number): Promise<User> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                id
            }
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.')
    }
};

const getUserByEmail = async (email: string): Promise<User> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                email
            }
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.')
    }
};

const createUser = async (email: string, password: string): Promise<User> => {
    try {
        const user = new User({ email, password });
        const userPrisma = await database.user.create({
            data: {
                email: user.email,
                password: user.password
            }
        });
        return User.from(userPrisma);
        
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.')        
    }
};

const deleteUser = async (id: number): Promise<Boolean> => {
    try {
        await database.user.delete({
            where: {
                id
            }
        });
        return true;
    } catch (error) {
        console.error(error)
        throw new Error('Database error. See server log for details.')
    }
};

export default { getAllUsers, getUserById, getUserByEmail, createUser, deleteUser };
