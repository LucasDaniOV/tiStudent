import { User } from '../model/user';

let currentId = 0;

let users: User[] = [
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

const createUser = ({ id=currentId++, email, password }: User): User => {
    const newUser = new User({ id, email, password });
    users.push(newUser);
    return newUser;
};

const deleteUser = (user: User): void => {
    users = users.filter((u) => user.id != u.id);
};

export default { getAllUsers, getUserById, getUserByEmail, createUser, deleteUser };
