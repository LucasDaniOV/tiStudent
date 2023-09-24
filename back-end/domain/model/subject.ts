export class Subject {
    readonly name: string;

    constructor(subject: { name: string }) {
        this.name = subject.name;
    }

    equals(otherSubject: { name: string }): boolean {
        return this.name === otherSubject.name;
    }
}
