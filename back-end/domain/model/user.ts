export class User {
    readonly id?: number;
    readonly email: string;
    readonly password: string;

    constructor(user: { id?: number; email: string; password: string }) {
        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
    }

    equals(otherUser: { id?: number; email: string; password: string }): boolean {
        return (
            this.id == otherUser.id &&
            this.email === otherUser.email &&
            this.password === otherUser.password
        );
    }
}
