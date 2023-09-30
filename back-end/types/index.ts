import { Category } from "../domain/model/category";
import { Subject } from "../domain/model/subject";

type UserInput = {
    id?: number;
    email?: string;
    password?: string;
};

type ResourceInput = {
    id?: number;
    creator?: UserInput;
    createdAt?: Date;
    title?: string;
    description?: string;
    category?: Category;
    subject?: Subject;
};

export { UserInput, ResourceInput };
