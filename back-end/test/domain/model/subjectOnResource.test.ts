import { SubjectOnResource } from '../../../domain/model/subjectOnResource';

const subjectId: number = 1;
const resourceId: number = 1;

test(`given: valid values for subjectOnResource, when: creating a subjectOnResource, then: should create a subjectOnResource`, () => {
    // given
    // when
    const subjectOnResource = new SubjectOnResource(subjectId, resourceId);

    // then
    expect(subjectOnResource.subjectId).toBe(subjectId);
    expect(subjectOnResource.resourceId).toBe(resourceId);
});

test(`given: valid values for subjectOnResource, when: comparing two subjectOnResources, then: should return true`, () => {
    // given
    const subjectOnResource = new SubjectOnResource(subjectId, resourceId);

    // when
    const equals = subjectOnResource.equals(subjectOnResource);

    // then
    expect(equals).toBe(true);
});

test(`given: valid values for subjectOnResource, when: comparing two subjectOnResources, then: should return false`, () => {
    // given
    const subjectOnResource = new SubjectOnResource(subjectId, resourceId);
    const otherSubjectOnResource = new SubjectOnResource(2, 2);

    // when
    const equals = subjectOnResource.equals(otherSubjectOnResource);

    // then
    expect(equals).toBe(false);
});

test(`given: valid values for subjectOnResource, when: creating a subjectOnResource from prisma, then: should create a subjectOnResource`, () => {
    // given
    const subjectOnResourcePrisma = {
        subjectId,
        resourceId,
    };

    // when
    const subjectOnResource = SubjectOnResource.from(subjectOnResourcePrisma);

    // then
    expect(subjectOnResource.subjectId).toBe(subjectId);
    expect(subjectOnResource.resourceId).toBe(resourceId);
});

test(`given: empty subjectId for subjectOnResource, when: creating a subjectOnResource, then: should throw an error`, () => {
    // given
    // when
    const createSubjectOnResource = () => new SubjectOnResource(null, resourceId);

    // then
    expect(createSubjectOnResource).toThrowError('subjectId is required');
});

test(`given: empty resourceId for subjectOnResource, when: creating a subjectOnResource, then: should throw an error`, () => {
    // given
    // when
    const createSubjectOnResource = () => new SubjectOnResource(subjectId, null);

    // then
    expect(createSubjectOnResource).toThrowError('resourceId is required');
});

test(`given: negative subjectId for subjectOnResource, when: creating a subjectOnResource, then: should throw an error`, () => {
    // given
    // when
    const createSubjectOnResource = () => new SubjectOnResource(-1, resourceId);

    // then
    expect(createSubjectOnResource).toThrowError('subjectId cannot be negative');
});

test(`given: negative resourceId for subjectOnResource, when: creating a subjectOnResource, then: should throw an error`, () => {
    // given
    // when
    const createSubjectOnResource = () => new SubjectOnResource(subjectId, -1);

    // then
    expect(createSubjectOnResource).toThrowError('resourceId cannot be negative');
});

test(`given: string subjectId for subjectOnResource, when: creating a subjectOnResource, then: should throw an error`, () => {
    // given
    // when
    const createSubjectOnResource = () => new SubjectOnResource('1' as unknown as number, resourceId);

    // then
    expect(createSubjectOnResource).toThrowError('subjectId must be a number');
});

test(`given: string resourceId for subjectOnResource, when: creating a subjectOnResource, then: should throw an error`, () => {
    // given
    // when
    const createSubjectOnResource = () => new SubjectOnResource(subjectId, '1' as unknown as number);

    // then
    expect(createSubjectOnResource).toThrowError('resourceId must be a number');
});
