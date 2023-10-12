import userDb from '../domain/data-access/user.db';
import { User } from '../domain/model/user';
import { UserInput } from '../types';

const createUser = ({ id, email, password }: UserInput): User => {
    if (userDb.getUserById(id)) throw new Error(`User with id ${id} already exists`);
    if (userDb.getUserByEmail(email)) throw new Error(`User with email ${email} already exists`);
    const u: User = new User({ id, email, password });
    const newUser = userDb.createUser(u);
    return newUser;
};

// const getAllUsers = async () : Promise<User[]> => userDb.getAllUsers()  -> pas gebruiken wanneer we met database werken
const getAllUsers: () => User[] = () => userDb.getAllUsers();

const getUserById = (id: number): User => {
    const u: User = userDb.getUserById(id);
    if (!u) throw new Error(`No user with ID ${id} found`);
    return u;
};

const removeUser = (id: number): Boolean => {
    const user = getUserById(id);
    userDb.deleteUser(user);
    return true;
};

const updateUser = (id: number, field: string, newValue: string): User => {
    const user = getUserById(id);
    switch (field) {
        case 'email':
            user.email = newValue;
            break;
        case 'password':
            user.password = newValue;
            break;
        default:
            throw new Error('Unsupported field');
    }
    return user;
};

export default { getAllUsers, getUserById, createUser, removeUser, updateUser };
