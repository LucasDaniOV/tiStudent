import { User } from '../model/user';

let currentId = 1;

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

const createUser = ({ id, email, password }: User): User => {
    const newUser = new User({ id, email, password });
    users.push(newUser);
    return newUser;
};

const deleteUser = (user: User): void => {
    if (!users.includes(user)) throw new Error(`User does not exist`)
    users = users.filter((u) => user.id != u.id);
};

const updateUserField = (user: User, field: 'email' | 'password', value: string): User => {
    const updatedUser = new User({
        id: user.id,
        email: user.email,
        password: user.password,
    });
    updatedUser.update(field, value);
    deleteUser(user);
    createUser(updatedUser);
    return updatedUser;
};

export default { getAllUsers, getUserById, getUserByEmail, createUser, deleteUser, updateUserField };
