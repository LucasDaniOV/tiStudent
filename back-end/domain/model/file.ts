export class File {
    readonly name: string;
    readonly path: string;

    constructor(file: { name: string; path: string }) {
        this.name = file.name;
        this.path = file.path;
    }

    equals(otherFile: { name: string; path: string }): boolean {
        return this.name === otherFile.name && this.path === otherFile.path;
    }
}
