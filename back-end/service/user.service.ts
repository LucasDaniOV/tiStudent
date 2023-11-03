import userDb from '../domain/data-access/user.db';
import { User } from '../domain/model/user';
import { UserInput } from '../types';

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserById = async (id: number): Promise<User> => {
    const u: User = await userDb.getUserById(id);
    if (!u) throw new Error(`No user with id ${id} found`);
    return u;
};

const getUserByEmail = async (email: string): Promise<User> => {
    User.validateEmail(email);
    const u: User = await userDb.getUserByEmail(email);
    if (!u) throw new Error(`No user with email ${email} found`);
    return u;
};

const createUser = async ({ email, password }: UserInput): Promise<User> => {
    User.validateEmail(email);
    User.validatePassword(password);
    if (await userDb.getUserByEmail(email)) throw new Error(`User with email ${email} already exists`);
    return await userDb.createUser(email, password);
};

const removeUserById = async (id: number): Promise<Boolean> => {
    await getUserById(id);
    return await userDb.deleteUser(id);
};

const updateEmailById = async (id: number, email: string): Promise<User> => {
    User.validateEmail(email);
    if ((await getUserById(id)).email === email) throw new Error(`New email must be different from old email`);
    return await userDb.updateEmail(id, email);
};

const updatePasswordById = async (id: number, password: string): Promise<User> => {
    User.validatePassword(password);
    if ((await getUserById(id)).password === password) throw new Error(`New password must be different from old password`);
    return await userDb.updatePassword(id, password);
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    removeUserById,
    updateEmailById,
    updatePasswordById,
};
