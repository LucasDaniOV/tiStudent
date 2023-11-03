import { Category } from '../domain/model/category';
import { Profile } from '../domain/model/profile';
import { Subject } from '../domain/model/subject';

type UserInput = {
    id?: number;
    email?: string;
    password?: string;
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

export { UserInput, ResourceInput, ProfileInput };
