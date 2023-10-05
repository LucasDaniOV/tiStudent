import { User } from '../model/user';

let currentId = 1;

const users: User[] = [
    new User({ id: currentId++, email: 'test1@ucll.be', password: 'Password!123' }),
    new User({ id: currentId++, email: 'test2@ucll.be', password: 'p@ssworD99' }),
];

const getAllUsers = (): User[] => users;

const getUserById = (id: number): User => {
    const user: User = users.find((u) => u.id == id);
    return user;
};

const getUserByEmail = (email: string): User => {
    const user: User = users.find((u) => u.email == email);
    return user;
};

const createUser = ({ email, password }: User): User => {
    const newUser = new User({ email, password });
    users.push(newUser);
    return newUser;
};

export default { getAllUsers, getUserById, getUserByEmail, createUser };
