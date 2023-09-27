export class Category {
    readonly name: string;

    constructor(category: { name: string }) {
        this.name = category.name;
    }

    equals(otherCategory: { name: string }): boolean {
        return this.name === otherCategory.name;
    }
}
