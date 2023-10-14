export class User {
    readonly id?: number;
    private _email: string;
    private _password: string;

    constructor(user: { id?: number; email: string; password: string }) {
        this.validateEmail(user.email);
        this.validatePassword(user.password);

        this.id = user.id;
        this._email = user.email;
        this._password = user.password;
    }

    equals(otherUser: { id?: number; email: string; password: string }): boolean {
        return this.id == otherUser.id && this.email === otherUser.email && this._password === otherUser.password;
    }

    validateEmail = (email: string): void => {
        if (!email.includes('@')) throw new Error("email must contain a '@'");
    };

    validatePassword = (password: string): void => {
        if (password.length < 8) throw new Error('password must be at least 8 characters long');
        if (!password.match(/\d/)) throw new Error('password must contain at least 1 number');
        if (!password.match(/[A-Z]/)) throw new Error('password must contain at least 1 capital letter');
        if (!password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
            throw new Error(`password must contain at least 1 special character (!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?)`);
        }
    };

    public get email(): string {
        return this._email;
    }

    public get password(): string {
        return this._password;
    }

    public set email(v: string) {
        this.validateEmail(v);
        if (v == this._email) throw new Error(`new email must be different from old email`);
        this._email = v;
    }

    public set password(v: string) {
        this.validatePassword(v);
        if (v == this._password) throw new Error(`new password must be different from old password`);
        this._password = v;
    }
}
