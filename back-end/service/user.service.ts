import userDb from '../domain/data-access/user.db';
import { User } from '../domain/model/user';
import { UserInput } from '../types';

const createUser = async ({ email, password }: UserInput): Promise<User> => {
    if (userDb.getUserByEmail(email)) throw new Error(`User with email ${email} already exists`);
    User.validateEmail(email);
    User.validatePassword(password);
    const newUser = userDb.createUser(email, password);
    return newUser;
};

const getAllUsers = async () : Promise<User[]> => userDb.getAllUsers();

const getUserById = async (id: number): Promise<User> => {
    const u: User = await userDb.getUserById(id);
    if (!u) throw new Error(`No user with ID ${id} found`);
    return u;
};

const getUserByEmail = async (email: string): Promise<User> => {
    const u: User = await userDb.getUserByEmail(email);
    if (!u) throw new Error(`No user with email ${email} found`);
    return u;
}

const removeUser = async (id: number): Promise<Boolean> => {
    const u = getUserById(id);
    if (!u) throw new Error(`No user with ID ${id} found`);
    await userDb.deleteUser(id);
    return true;
};

// const updateUser = (id: number, field: string, newValue: string): User => {
//     const user = getUserById(id);
//     switch (field) {
//         case 'email':
//             user.email = newValue;
//             break;
//         case 'password':
//             user.password = newValue;
//             break;
//         default:
//             throw new Error('Unsupported field');
//     }
//     return user;
// };

// const getUserField = (id: number, field: string): string => {
//     const user = getUserById(id);
//     switch (field) {
//         case 'email':
//             return user.email;
//         case 'password':
//             return user.password;
//         default:
//             throw new Error('Unsupported field');
//     }
// };

export default { getAllUsers, getUserById, createUser, removeUser };
