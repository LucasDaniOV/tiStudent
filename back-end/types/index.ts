import { Category } from '../domain/model/category';
import { Profile } from '../domain/model/profile';
import { Subject } from '../domain/model/subject';

type UserInput = {
    id?: number;
    email?: string;
    password?: string;
    role?: Role;
};

type ResourceInput = {
    id?: number;
    creator?: Profile;
    createdAt?: Date;
    title?: string;
    description?: string;
    category?: Category;
    subject?: Subject;
};

type ProfileInput = {
    id?: number;
    userId?: number;
    username?: string;
    bio?: string;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    role: Role;
};

type Role = 'admin' | 'user' | 'guest';

export { UserInput, ResourceInput, ProfileInput, AuthenticationResponse, Role };
