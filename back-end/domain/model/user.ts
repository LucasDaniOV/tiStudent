export class User {
    readonly id?: number;
    private _email: string;
    private _password: string;

    constructor(user: { id?: number; email: string; password: string }) {
        this.id = user.id;
        this.validate('email', user.email);
        this.validate('password', user.password);
        this._email = user.email;
        this._password = user.password;
    }

    equals(otherUser: { id?: number; email: string; password: string }): boolean {
        return this.id == otherUser.id && this.email === otherUser.email && this._password === otherUser.password;
    }

    validate = (type: 'email' | 'password', input: string): void => {
        if (type == 'email') {
            if (!input.includes('@')) throw new Error("Email must contain a '@'.");
        } else {
            if (input.length < 8) throw new Error('Password must be at least 8 characters long.'); //eventueel nog else if om te kijken of password kleiner is dan 128 tekens
            if (!input.match(/\d/)) throw new Error('Password must contain at least 1 number.');
            if (!input.match(/[A-Z]/)) throw new Error('Password must contain at least 1 capital letter.');
            if (!input.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/))
                throw new Error(`Password must contain at least 1 special sign (!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?).`);
        }
    };

    update = (type: 'email' | 'password', newValue: string): void => {
        if (type == 'email') {
            this.validate(type, newValue);
            if (newValue == this._email) throw new Error(`New email can't be same as old email`);
            this._email = newValue;
        } else if (type == 'password') {
            this.validate(type, newValue);
            if (newValue == this._password) throw new Error(`New password can't be same as old password`);
            this._password = newValue;
        }
    };

    public get email(): string {
        return this._email;
    }

    public get password(): string {
        return this._password;
    }
}
