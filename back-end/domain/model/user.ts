import { User as UserPrisma } from '@prisma/client';
import { Role } from '../../types';
export class User {
    readonly id?: number;
    readonly email: string;
    readonly password: string;
    readonly role?: Role;

    constructor(user: { id?: number; email: string; password: string; role?: Role }) {
        User.validateEmail(user.email);
        User.validatePassword(user.password);
        User.validateRole(user.role);

        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    equals(otherUser: { id?: number; email: string; password: string; role?: Role }): boolean {
        return (
            this.id == otherUser.id &&
            this.email === otherUser.email &&
            this.password === otherUser.password &&
            this.role === otherUser.role
        );
    }

    static validateEmail = (email: string): void => {
        if (!email.includes('@')) throw new Error("email must contain a '@'");
    };

    static validatePassword = (password: string): void => {
        if (!password?.trim()) throw new Error('password is required');
        if (password.length < 8) throw new Error('password must be at least 8 characters long');
        if (!password.match(/\d/)) throw new Error('password must contain at least 1 number');
        if (!password.match(/[A-Z]/)) throw new Error('password must contain at least 1 capital letter');
        if (!password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
            throw new Error(`password must contain at least 1 special character (!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?)`);
        }
    };

    static validateRole = (role: Role): void => {
        if (role == null) return;
        if (!['admin', 'user', 'guest'].includes(role)) throw new Error('role must be one of admin, user, or guest');
    }

    static from({ id, email, password, role }: UserPrisma): User {
        return new User({
            id,
            email,
            password,
            role: role as Role,
        });
    }
}
