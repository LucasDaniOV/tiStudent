import { SubjectOnResource as SubjectOnResourcePrisma } from '@prisma/client';

export class SubjectOnResource {
    readonly subjectId: number;
    readonly resourceId: number;

    constructor(subjectId: number, resourceId: number) {
        SubjectOnResource.validate(subjectId, resourceId);
        this.subjectId = subjectId;
        this.resourceId = resourceId;
    }

    static validate(subjectId: number, resourceId: number): void {
        SubjectOnResource.validateSubjectId(subjectId);
        SubjectOnResource.validateResourceId(resourceId);
    }

    static validateSubjectId = (subjectId: number) => {
        if (!subjectId) throw new Error('subjectId is required');
        if (subjectId < 0) throw new Error('subjectId cannot be negative');
        if (typeof subjectId !== 'number') throw new Error('subjectId must be a number');
    };

    static validateResourceId = (resourceId: number) => {
        if (!resourceId) throw new Error('resourceId is required');
        if (resourceId < 0) throw new Error('resourceId cannot be negative');
        if (typeof resourceId !== 'number') throw new Error('resourceId must be a number');
    };

    equals(otherSubjectOnResource: SubjectOnResource): boolean {
        return (
            this.subjectId === otherSubjectOnResource.subjectId && this.resourceId === otherSubjectOnResource.resourceId
        );
    }

    static from({ subjectId, resourceId }: SubjectOnResourcePrisma): SubjectOnResource {
        return new SubjectOnResource(subjectId, resourceId);
    }
}
