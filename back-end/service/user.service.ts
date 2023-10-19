import userDb from '../domain/data-access/user.db';
import { User } from '../domain/model/user';
import { UserInput } from '../types';

const createUser = async ({ email, password }: UserInput): Promise<User> => {
    if (await userDb.getUserByEmail(email)) throw new Error(`User with email ${email} already exists`);
    User.validateEmail(email);
    User.validatePassword(password);
    const newUser = await userDb.createUser(email, password);
    return newUser;
};

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserById = async (id: number): Promise<User> => {
    const u: User = await userDb.getUserById(id);
    if (!u) throw new Error(`No user with ID ${id} found`);
    return u;
};

const getUserByEmail = async (email: string): Promise<User> => {
    const u: User = await userDb.getUserByEmail(email);
    if (!u) throw new Error(`No user with email ${email} found`);
    return u;
};

const removeUser = async (id: number): Promise<Boolean> => {
    const u = await getUserById(id);
    if (u) {
        await userDb.deleteUser(id);
        return true;
    }
};

const getUserField = async (id: number, field: string): Promise<string> => {
    const u = await getUserById(id);
    switch (field) {
        case 'email':
            return u.email;
        case 'password':
            return u.password;
        default:
            throw new Error('Unsupported field');
    }
};

const updateUserField = async (id: number, field: string, value: string): Promise<User> => {
    const u = await getUserById(id);
    switch (field) {
        case 'email':
            if (u.email === value) throw new Error(`New email must be different from old email`);
            User.validateEmail(value);
            return await userDb.updateEmail(id, value);
        case 'password':
            if (u.password === value) throw new Error(`New password must be different from old password`);
            User.validatePassword(value);
            return await userDb.updatePassword(id, value);
        default:
            throw new Error('Unsupported field');
    }
};

export default { createUser, getAllUsers, getUserById, getUserByEmail, removeUser, getUserField, updateUserField };
