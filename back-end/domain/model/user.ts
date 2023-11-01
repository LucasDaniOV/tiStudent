import { User as UserPrisma } from '@prisma/client';
export class User {
    readonly id?: number;
    readonly email: string;
    readonly password: string;

    constructor(user: { id?: number; email: string; password: string }) {
        User.validateEmail(user.email);
        User.validatePassword(user.password);

        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
    }

    equals(otherUser: { id?: number; email: string; password: string }): boolean {
        return this.id == otherUser.id && this.email === otherUser.email && this.password === otherUser.password;
    }

    public static validateEmail = (email: string): void => {
        if (!email.includes('@')) throw new Error("email must contain a '@'");
    };

    public static validatePassword = (password: string): void => {
        if (password.length < 8) throw new Error('password must be at least 8 characters long');
        if (!password.match(/\d/)) throw new Error('password must contain at least 1 number');
        if (!password.match(/[A-Z]/)) throw new Error('password must contain at least 1 capital letter');
        if (!password.match(/[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/)) {
            throw new Error(`password must contain at least 1 special character (!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?)`);
        }
    };

    static from({ id, email, password }: UserPrisma): User {
        return new User({
            id: id,
            email: email,
            password: password,
        });
    }
}
