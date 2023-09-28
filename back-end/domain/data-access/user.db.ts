import { User } from '../model/user';

let currentId = 1;

const users: User[] = [
    new User({ id: currentId++, email: 'test1@ucll.be', password: 'Password!123' }),
    new User({ id: currentId++, email: 'test2@ucll.be', password: 'p@ssworD99' }),
];

const getAllUsers = (): User[] => users;

const getUserById = (id: number): User => {
    const u: User = users.find((u) => u.id == id);
    return u;
};

export default { getAllUsers, getUserById };
