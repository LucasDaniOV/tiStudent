export class Resource{
    readonly title: string;
    readonly description: string;
    readonly createdAt: Date;
    readonly updatedAt ?: Date;
    readonly imgPath ?: string;

    constructor(resource: {title: string; description: string; createdAt: Date; updatedAt ?: Date; imgPath ?: string}){
        this.title = resource.title;
        this.description = resource.description;
        this.createdAt = resource.createdAt;
        this.updatedAt = resource.updatedAt;
        this.imgPath = resource.imgPath;
    }

    equals(otherResource: {title: string; description: string; createdAt: Date; updatedAt ?: Date; imgPath ?: string}): boolean{
        return this.title === otherResource.title && this.description === otherResource.description && this.createdAt === otherResource.createdAt && this.updatedAt === otherResource.updatedAt && this.imgPath === otherResource.imgPath;
    }
}