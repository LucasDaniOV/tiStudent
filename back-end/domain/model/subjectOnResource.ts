import { SubjectOnResource as SubjectOnResourcePrisma } from '@prisma/client';

export class SubjectOnResource {
    readonly subjectId: number;
    readonly resourceId: number;

    constructor(subjectId: number, resourceId: number) {
        this.subjectId = subjectId;
        this.resourceId = resourceId;
    }

    equals(otherSubjectOnResource: SubjectOnResource): boolean {
        return (
            this.subjectId === otherSubjectOnResource.subjectId && this.resourceId === otherSubjectOnResource.resourceId
        );
    }

    static from({ subjectId, resourceId }: SubjectOnResourcePrisma): SubjectOnResource {
        return new SubjectOnResource(subjectId, resourceId);
    }
}
