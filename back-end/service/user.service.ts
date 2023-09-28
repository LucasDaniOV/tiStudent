import userDb from '../domain/data-access/user.db';
import { User } from '../domain/model/user';

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

export default { getAllUsers, getUserById };
