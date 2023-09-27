export class File {
    readonly path: string;

    constructor(file: { path: string }) {
        this.path = file.path;
    }

    equals(otherFile: { path: string }): boolean {
        return this.path === otherFile.path;
    }
}
