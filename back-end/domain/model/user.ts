export class User {
    readonly username: string;
    readonly password: string;

    constructor(user: { username: string; password: string }) {
        this.username = user.username;
        this.password = user.password;
    }

    equals(otherUser: { username: string; password: string }): boolean {
        return this.username === otherUser.username && this.password === otherUser.password;
    }
}
