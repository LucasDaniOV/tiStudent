import userDb from '../domain/data-access/user.db';
import { User } from '../domain/model/user';
import { UserInput } from '../types';

const createUser = ({ email, password }: UserInput): User => {
    const existing = userDb.getUserByEmail(email);
    if (existing) throw new Error(`User with email ${email} already exists`);
    else {
        const u: User = new User({ email, password });
        return userDb.createUser(u);
    }
};

// const getAllUsers = async () : Promise<User[]> => userDb.getAllUsers()  -> pas gebruiken wanneer we met database werken
const getAllUsers: () => User[] = () => userDb.getAllUsers();

const getUserById = (id: number): User => {
    const u: User = userDb.getUserById(id);
    if (u) {
        return u;
    } else {
        throw new Error(`No user with ID ${id} found`);
    }
};

export default { getAllUsers, getUserById, createUser };
