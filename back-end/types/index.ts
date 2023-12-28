type ProfileInput = {
    email?: string;
    username?: string;
    password?: string;
    role?: Role;
    bio?: string;
};

type ResourceInput = {
    title?: string;
    description?: string;
    profileId?: number;
};

type CommentInput = {
    resourceId?: number;
    profileId?: number;
    message?: string;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    id: string;
    role: Role;
};

type Role = 'ADMIN' | 'USER';

export { AuthenticationResponse, CommentInput, ProfileInput, ResourceInput, Role };
