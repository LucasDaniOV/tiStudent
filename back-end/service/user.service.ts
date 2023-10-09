import userDb from '../domain/data-access/user.db';
import { User } from '../domain/model/user';
import { UserInput } from '../types';

const createUser = ({ id, email, password }: User): User => {
    const existing = userDb.getUserByEmail(email);
    if (existing) throw new Error(`User with email ${email} already exists`);
    else {
        const u: User = new User({ id, email, password });
        return userDb.createUser(u);
    }
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

const updateUser = (updatedUser: UserInput): User => {
    const originalUser = getUserById(updatedUser.id);
    if (originalUser.email != updatedUser.email) {
        userDb.updateUserField(originalUser, 'email', updatedUser.email);
    }
    if (originalUser.password != updatedUser.password) {
        userDb.updateUserField(originalUser, 'password', updatedUser.password);
    }
    return getUserById(updatedUser.id);
};

export default { getAllUsers, getUserById, createUser, removeUser, updateUser };
