import bcrypt from 'bcrypt';
import userDb from '../domain/data-access/user.db';
import { User } from '../domain/model/user';
import { UserInput } from '../types';

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserById = async (id: number): Promise<User> => {
    const u: User = await userDb.getUserById(id);
    if (!u) throw new Error(`No user with id ${id} found`);
    return u;
};

const getUserByEmail = async (email: string): Promise<User> => {
    User.validateEmail(email);
    const u: User = await userDb.getUserByEmail(email);
    if (!u) throw new Error(`No user with email ${email} found`);
    return u;
};

const createUser = async ({ email, password }: UserInput): Promise<User> => {
    User.validateEmail(email);
    User.validatePassword(password);
    if (await userDb.getUserByEmail(email)) throw new Error(`User with email ${email} already exists`);
    const hashedPassword = await bcrypt.hash(password, 12);
    return await userDb.createUser(email, hashedPassword);
};

const removeUserById = async (id: number): Promise<Boolean> => {
    await getUserById(id);
    return await userDb.deleteUser(id);
};

const updateEmailById = async (id: number, email: string): Promise<User> => {
    User.validateEmail(email);
    if ((await getUserById(id)).email === email) throw new Error(`New email must be different from old email`);
    return await userDb.updateEmail(id, email);
};

const updatePasswordById = async (id: number, password: string): Promise<User> => {
    User.validatePassword(password);
    if ((await getUserById(id)).password === password) throw new Error(`New password must be different from old password`);
    return await userDb.updatePassword(id, password);
};

const getGithubAccessToken = async (code: string): Promise<string> => {
    try {
        const client_id = process.env.GITHUB_CLIENT_ID;
        const client_secret = process.env.GITHUB_CLIENT_SECRET;
        const required_scope = 'read:user';

        const res = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id,
                client_secret,
                code,
            }),
        });

        const { access_token, scope } = await res.json();
        if (scope !== required_scope) throw new Error('Invalid scope');
        return access_token;
    } catch (error) {
        throw new Error('Failed to fetch access token');
    }
};

const getGithubUser = async (access_token: string): Promise<any> => {
    try {
        const res = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return await res.json();
    } catch (error) {
        throw new Error('Failed to fetch user');
    }
};

const authenticate = async ({ email, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByEmail(email);
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error('Invalid password');
    return { token: generateJwtToken({ email }), email: email };
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    removeUserById,
    updateEmailById,
    updatePasswordById,
    getGithubAccessToken,
    getGithubUser,
    authenticate,
};
