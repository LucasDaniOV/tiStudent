export class User {
    readonly id?: number;
    readonly email: string;
    readonly password: string;

    constructor(user: { id?: number; email: string; password: string }) {
        this.id = user.id;
        if (user.email.includes('@')) {
            this.email = user.email;
        } else {
            throw new Error("Email must contain a '@'.");
        }
        if (user.password.length >= 8) {
            if (user.password.match(/\d/)) {
                if (user.password.match(/[A-Z]/)) {
                    if (user.password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
                        this.password = user.password;
                    } else {
                        throw new Error(
                            `Password must contain at least 1 special sign (!@#$%^&*()_+-=\[\]{};':"\\|,.<>\/?).`
                        );
                    }
                } else {
                    throw new Error('Password must contain at least 1 capital letter.');
                }
            } else {
                throw new Error('Password must contain at least 1 number.');
            }
        } else {
            throw new Error('Password must be at least 8 characters long.'); //eventueel nog else if om te kijken of password kleiner is dan 128 tekens
        }
    }

    equals(otherUser: { id?: number; email: string; password: string }): boolean {
        return (
            this.id == otherUser.id &&
            this.email === otherUser.email &&
            this.password === otherUser.password
        );
    }
}
