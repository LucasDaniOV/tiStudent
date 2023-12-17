import { Category } from '../domain/model/category';
import { Profile } from '../domain/model/profile';
import { Subject } from '../domain/model/subject';

type ProfileInput = {
    id?: number;
    userId?: number;
    username?: string;
    bio?: string;
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

type AuthenticationResponse = {
    token: string;
    email: string;
    id: string;
    role: Role;
};

type Role = 'admin' | 'user' | 'guest';

export { ResourceInput, ProfileInput, AuthenticationResponse, Role };
