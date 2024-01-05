import subjectOnResourceDb from '../../domain/data-access/subjectOnResource.db';
import resourceDb from '../../domain/data-access/resource.db';
import subjectDb from '../../domain/data-access/subject.db';
import subjectOnResourceService from '../../service/subjectOnResource.service';
import { SubjectOnResource } from '../../domain/model/subjectOnResource';
import { AuthenticationResponse } from '../../types';

const subjectId = 1;
const resourceId = 2;
const profileId = 1;

const subjectOnResourceInput = { subjectId, resourceId };
const subjectOnResource = new SubjectOnResource(subjectId, resourceId);

let mockSubjectOnResourceDbCreateSubjectOnResource: jest.Mock;
let mockSubjectOnResourceDbGetSubjectsOnResources: jest.Mock;
let mockSubjectOnResourceDbGetSubjectOnResource: jest.Mock;
let mockSubjectOnResourceDbGetSubjectsOnResourcesBySubjectId: jest.Mock;
let mockSubjectOnResourceDbGetSubjectsOnResourcesByResourceId: jest.Mock;
let mockSubjectOnResourceDbDeleteSubjectOnResource: jest.Mock;
let mockResourceDbGetResourceById: jest.Mock;
let mockSubjectDbGetSubjectById: jest.Mock;

beforeEach(() => {
    mockSubjectOnResourceDbCreateSubjectOnResource = jest.fn();
    mockSubjectOnResourceDbGetSubjectsOnResources = jest.fn();
    mockSubjectOnResourceDbGetSubjectOnResource = jest.fn();
    mockSubjectOnResourceDbGetSubjectsOnResourcesBySubjectId = jest.fn();
    mockSubjectOnResourceDbGetSubjectsOnResourcesByResourceId = jest.fn();
    mockSubjectOnResourceDbDeleteSubjectOnResource = jest.fn();
    mockResourceDbGetResourceById = jest.fn();
    mockSubjectDbGetSubjectById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: valid values for subjectOnResource, when: creating a subjectOnResource, then: should create a subjectOnResource`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({ profileId });
    subjectDb.getSubjectById = mockSubjectDbGetSubjectById.mockReturnValue({});
    subjectOnResourceDb.getSubjectOnResource = mockSubjectOnResourceDbGetSubjectOnResource.mockReturnValue(null);
    subjectOnResourceDb.createSubjectOnResource =
        mockSubjectOnResourceDbCreateSubjectOnResource.mockReturnValue(subjectOnResource);

    // when
    const result = await subjectOnResourceService.createSubjectOnResource(
        { id: String(profileId) } as AuthenticationResponse,
        subjectOnResourceInput
    );

    // then
    expect(result).toBeDefined();
    expect(result).toBe(subjectOnResource);
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(resourceId);
    expect(mockSubjectDbGetSubjectById).toHaveBeenCalledWith(subjectId);
    expect(mockSubjectOnResourceDbCreateSubjectOnResource).toHaveBeenCalledWith(subjectId, resourceId);
});

test(`given: invalid resourceId, when: creating a subjectOnResource, then: should throw error`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue(null);

    // when
    const sut = async () =>
        await subjectOnResourceService.createSubjectOnResource(
            { id: String(profileId) } as AuthenticationResponse,
            subjectOnResourceInput
        );

    // then
    await expect(sut).rejects.toThrowError('Resource with id 2 does not exist');
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(resourceId);
});

test(`given: invalid subjectId, when: creating a subjectOnResource, then: should throw error`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({ profileId });
    subjectDb.getSubjectById = mockSubjectDbGetSubjectById.mockReturnValue(null);

    // when
    const sut = async () =>
        await subjectOnResourceService.createSubjectOnResource(
            { id: String(profileId) } as AuthenticationResponse,
            subjectOnResourceInput
        );

    // then
    await expect(sut).rejects.toThrowError('Subject not found');
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(resourceId);
    expect(mockSubjectDbGetSubjectById).toHaveBeenCalledWith(subjectId);
});

test(`given: already existing subjectOnResource, when: creating a subjectOnResource, then: should throw error`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({ profileId });
    subjectDb.getSubjectById = mockSubjectDbGetSubjectById.mockReturnValue({});
    subjectOnResourceDb.getSubjectOnResource =
        mockSubjectOnResourceDbGetSubjectOnResource.mockReturnValue(subjectOnResource);

    // when
    const sut = async () =>
        await subjectOnResourceService.createSubjectOnResource(
            { id: String(profileId) } as AuthenticationResponse,
            subjectOnResourceInput
        );

    // then
    await expect(sut).rejects.toThrowError('Subject on resource already exists');
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(resourceId);
    expect(mockSubjectDbGetSubjectById).toHaveBeenCalledWith(subjectId);
});

test(`given: not owner of resource, when: creating a subjectOnResource, then: should throw error`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({ profileId: 2 });

    // when
    const sut = async () =>
        await subjectOnResourceService.createSubjectOnResource(
            { id: String(profileId) } as AuthenticationResponse,
            subjectOnResourceInput
        );

    // then
    await expect(sut).rejects.toThrowError('Not your resource');
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(resourceId);
});

test(`given: valid subjectId and resourceId, when: getting a subjectOnResource, then: should return a subjectOnResource`, async () => {
    // given
    subjectOnResourceDb.getSubjectOnResource =
        mockSubjectOnResourceDbGetSubjectOnResource.mockReturnValue(subjectOnResource);
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({});
    subjectDb.getSubjectById = mockSubjectDbGetSubjectById.mockReturnValue({});

    // when
    const result = await subjectOnResourceService.getSubjectOnResource(subjectId, resourceId);

    // then
    expect(result).toBeDefined();
    expect(result).toBe(subjectOnResource);
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(resourceId);
    expect(mockSubjectDbGetSubjectById).toHaveBeenCalledWith(subjectId);
    expect(mockSubjectOnResourceDbGetSubjectOnResource).toHaveBeenCalledWith(subjectId, resourceId);
});

test(`given: non existing subjectOnResource, when: getting a subjectOnResource, then: should throw error`, async () => {
    // given
    subjectOnResourceDb.getSubjectOnResource = mockSubjectOnResourceDbGetSubjectOnResource.mockReturnValue(null);
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({});
    subjectDb.getSubjectById = mockSubjectDbGetSubjectById.mockReturnValue({});

    // when
    const sut = async () => await subjectOnResourceService.getSubjectOnResource(subjectId, resourceId);

    // then
    await expect(sut).rejects.toThrowError('Subject on resource not found');
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(resourceId);
    expect(mockSubjectDbGetSubjectById).toHaveBeenCalledWith(subjectId);
    expect(mockSubjectOnResourceDbGetSubjectOnResource).toHaveBeenCalledWith(subjectId, resourceId);
});

test(`given: existing subjects on resources, when: getting all subjects on resources, then: should return all subjects on resources`, async () => {
    // given
    subjectOnResourceDb.getSubjectsOnResources = mockSubjectOnResourceDbGetSubjectsOnResources.mockReturnValue([
        subjectOnResource,
    ]);

    // when
    const result = await subjectOnResourceService.getSubjectsOnResources();

    // then
    expect(result).toBeDefined();
    expect(result).toEqual([subjectOnResource]);
    expect(mockSubjectOnResourceDbGetSubjectsOnResources).toHaveBeenCalledTimes(1);
});

test(`given: existing subjects on resources, when: getting all subjects on resources by subjectId, then: should return all subjects on resources by subjectId`, async () => {
    // given
    subjectOnResourceDb.getSubjectsOnResourcesBySubjectId =
        mockSubjectOnResourceDbGetSubjectsOnResourcesBySubjectId.mockReturnValue([subjectOnResource]);
    subjectDb.getSubjectById = mockSubjectDbGetSubjectById.mockReturnValue({});

    // when
    const result = await subjectOnResourceService.getSubjectsOnResourcesBySubjectId(subjectId);

    // then
    expect(result).toBeDefined();
    expect(result).toEqual([subjectOnResource]);
    expect(mockSubjectOnResourceDbGetSubjectsOnResourcesBySubjectId).toHaveBeenCalledWith(subjectId);
});

test(`given: existing subjects on resources, when: getting all subjects on resources by resourceId, then: should return all subjects on resources by resourceId`, async () => {
    // given
    subjectOnResourceDb.getSubjectsOnResourcesByResourceId =
        mockSubjectOnResourceDbGetSubjectsOnResourcesByResourceId.mockReturnValue([subjectOnResource]);
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({});

    // when
    const result = await subjectOnResourceService.getSubjectsOnResourcesByResourceId(resourceId);

    // then
    expect(result).toBeDefined();
    expect(result).toEqual([subjectOnResource]);
    expect(mockSubjectOnResourceDbGetSubjectsOnResourcesByResourceId).toHaveBeenCalledWith(resourceId);
});

test(`given: valid subjectId and resourceId, when: deleting a subjectOnResource, then: should delete a subjectOnResource`, async () => {
    // given
    subjectDb.getSubjectById = mockSubjectDbGetSubjectById.mockReturnValue({});
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({ profileId });
    subjectOnResourceDb.getSubjectOnResource =
        mockSubjectOnResourceDbGetSubjectOnResource.mockReturnValue(subjectOnResource);
    subjectOnResourceDb.deleteSubjectOnResource =
        mockSubjectOnResourceDbDeleteSubjectOnResource.mockReturnValue(subjectOnResource);

    // when
    const result = await subjectOnResourceService.deleteSubjectOnResource(
        { id: String(profileId) } as AuthenticationResponse,
        subjectId,
        resourceId
    );

    // then
    expect(result).toBeDefined();
    expect(result).toBe(subjectOnResource);
    expect(mockSubjectDbGetSubjectById).toHaveBeenCalledWith(subjectId);
    expect(mockResourceDbGetResourceById).toHaveBeenCalledWith(resourceId);
    expect(mockSubjectOnResourceDbGetSubjectOnResource).toHaveBeenCalledWith(subjectId, resourceId);
    expect(mockSubjectOnResourceDbDeleteSubjectOnResource).toHaveBeenCalledWith(subjectId, resourceId);
});

test(`given: Not owner of resource, when: deleting a subjectOnResource, then: should throw error`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({ profileId: 2 });

    // when
    const sut = async () =>
        await subjectOnResourceService.deleteSubjectOnResource(
            { id: String(profileId) } as AuthenticationResponse,
            subjectId,
            resourceId
        );

    // then
    await expect(sut).rejects.toThrowError('Not your resource');
});
