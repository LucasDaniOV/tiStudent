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
    category?: string;
    subject?: string;
};

export { UserInput, ResourceInput };
