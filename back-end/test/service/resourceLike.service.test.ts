import resourceLikeDb from '../../domain/data-access/resourceLike.db';
import resourceLikeService from '../../service/resourceLike.service';
import profileDb from '../../domain/data-access/profile.db';
import resourceDb from '../../domain/data-access/resource.db';
import { ResourceLike } from '../../domain/model/resourceLike';
import { ResourceLikeInput } from '../../types';

const resourceId = 1;
const profileId = 1;
const createdAt = new Date();

const resourceLike = new ResourceLike(resourceId, profileId, createdAt);

const resourceLikeInput: ResourceLikeInput = {
    resourceId,
    profileId,
};

let mockResourceLikeDbCreateResourceLike: jest.Mock;
let mockResourceLikeDbGetResourceLikeByProfileIdAndResourceId: jest.Mock;
let mockResourceLikeDbGetResourceLikes: jest.Mock;
let mockResourceLikeDbGetResourceLikesByProfileId: jest.Mock;
let mockResourceLikeDbGetResourceLikesByResourceId: jest.Mock;
let mockResourceLikeDbDeleteResourceLike: jest.Mock;
let mockProfileDbGetProfileById: jest.Mock;
let mockResourceDbGetResourceById: jest.Mock;

beforeEach(() => {
    mockResourceLikeDbCreateResourceLike = jest.fn();
    mockResourceLikeDbGetResourceLikeByProfileIdAndResourceId = jest.fn();
    mockResourceLikeDbGetResourceLikes = jest.fn();
    mockResourceLikeDbGetResourceLikesByProfileId = jest.fn();
    mockResourceLikeDbGetResourceLikesByResourceId = jest.fn();
    mockResourceLikeDbDeleteResourceLike = jest.fn();
    mockProfileDbGetProfileById = jest.fn();
    mockResourceDbGetResourceById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('create ResourceLike', () => {
    test('given: valid values for ResourceLike, when: creating ResourceLike, then: ResourceLike is created and returned', async () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue({});
        resourceDb.getResourceById = mockResourceDbGetResourceById.mockResolvedValue({});
        resourceLikeDb.getResourceLikeByProfileIdAndResourceId =
            mockResourceLikeDbGetResourceLikeByProfileIdAndResourceId.mockResolvedValue(undefined);
        resourceLikeDb.createResourceLike = mockResourceLikeDbCreateResourceLike.mockResolvedValue(resourceLike);

        // when
        const result = await resourceLikeService.createResourceLike(resourceLikeInput);

        // then
        expect(mockResourceLikeDbCreateResourceLike).toHaveBeenCalledTimes(1);
        expect(result).toEqual(resourceLike);
    });

    test('given: ResourceLike already exists, when: creating ResourceLike, then: error is thrown', () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue({});
        resourceDb.getResourceById = mockResourceDbGetResourceById.mockResolvedValue({});
        resourceLikeDb.getResourceLikeByProfileIdAndResourceId =
            mockResourceLikeDbGetResourceLikeByProfileIdAndResourceId.mockResolvedValue(resourceLike);

        // when
        const sut = async () => await resourceLikeService.createResourceLike(resourceLikeInput);

        // then
        expect(sut).rejects.toThrowError(
            `ResourceLike with profileId ${profileId} and resourceId ${resourceId} already exists`
        );
    });

    test('given: invalid profileId, when: creating ResourceLike, then: error is thrown', () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue(undefined);

        // when
        const sut = async () => await resourceLikeService.createResourceLike(resourceLikeInput);

        // then
        expect(sut).rejects.toThrowError(`Profile with id ${profileId} does not exist`);
    });

    test('given: invalid resourceId, when: creating ResourceLike, then: error is thrown', () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue({});
        resourceDb.getResourceById = mockResourceDbGetResourceById.mockResolvedValue(undefined);

        // when
        const sut = async () => await resourceLikeService.createResourceLike(resourceLikeInput);

        // then
        expect(sut).rejects.toThrowError(`Resource with id ${resourceId} does not exist`);
    });
});

describe('get ResourceLike', () => {
    test('given: existing ResourceLike, when: getting ResourceLike, then: existing ResourceLike is returned', async () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue({});
        resourceDb.getResourceById = mockResourceDbGetResourceById.mockResolvedValue({});
        resourceLikeDb.getResourceLikeByProfileIdAndResourceId =
            mockResourceLikeDbGetResourceLikeByProfileIdAndResourceId.mockResolvedValue(resourceLike);

        // when
        const result = await resourceLikeService.getResourceLikeByProfileIdAndResourceId(profileId, resourceId);

        // then
        expect(mockResourceLikeDbGetResourceLikeByProfileIdAndResourceId).toHaveBeenCalledTimes(1);
        expect(result).toEqual(resourceLike);
    });

    test('given: non-existing ResourceLike, when: getting ResourceLike, then: error is thrown', () => {
        // given
        resourceLikeDb.getResourceLikeByProfileIdAndResourceId =
            mockResourceLikeDbGetResourceLikeByProfileIdAndResourceId.mockResolvedValue(undefined);
        resourceDb.getResourceById = mockResourceDbGetResourceById.mockResolvedValue({});
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue({});

        // when
        const sut = async () =>
            await resourceLikeService.getResourceLikeByProfileIdAndResourceId(profileId, resourceId);

        // then
        expect(sut).rejects.toThrowError(
            `ResourceLike with profileId ${profileId} and resourceId ${resourceId} does not exist`
        );
    });

    test('given: invalid profileId, when: getting ResourceLike, then: error is thrown', () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue(undefined);

        // when
        const sut = async () =>
            await resourceLikeService.getResourceLikeByProfileIdAndResourceId(profileId, resourceId);

        // then
        expect(sut).rejects.toThrowError(`Profile with id ${profileId} does not exist`);
    });

    test('given: invalid resourceId, when: getting ResourceLike, then: error is thrown', () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue({});
        resourceDb.getResourceById = mockResourceDbGetResourceById.mockResolvedValue(undefined);

        // when
        const sut = async () =>
            await resourceLikeService.getResourceLikeByProfileIdAndResourceId(profileId, resourceId);

        // then
        expect(sut).rejects.toThrowError(`Resource with id ${resourceId} does not exist`);
    });

    test('given: existing ResourceLikes, when: getting ResourceLikes, then: existing ResourceLikes are returned', async () => {
        // given
        resourceLikeDb.getResourceLikes = mockResourceLikeDbGetResourceLikes.mockResolvedValue([resourceLike]);

        // when
        const result = await resourceLikeService.getResourceLikes();

        // then
        expect(mockResourceLikeDbGetResourceLikes).toHaveBeenCalledTimes(1);
        expect(result).toEqual([resourceLike]);
    });

    test('given: existing ResourceLikes, when: getting ResourceLikes by profileId, then: existing ResourceLikes by profileId are returned', async () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue({});
        resourceLikeDb.getResourceLikesByProfileId = mockResourceLikeDbGetResourceLikesByProfileId.mockResolvedValue([
            resourceLike,
        ]);

        // when
        const result = await resourceLikeService.getResourceLikesByProfileId(profileId);

        // then
        expect(mockResourceLikeDbGetResourceLikesByProfileId).toHaveBeenCalledTimes(1);
        expect(result).toEqual([resourceLike]);
    });

    test('given: invalid profileId, when: getting ResourceLikes by profileId, then: error is thrown', () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue(undefined);

        // when
        const sut = async () => await resourceLikeService.getResourceLikesByProfileId(profileId);

        // then
        expect(sut).rejects.toThrowError(`Profile with id ${profileId} does not exist`);
    });

    test('given: existing ResourceLikes, when: getting ResourceLikes by resourceId, then: existing ResourceLikes by resourceId are returned', async () => {
        // given
        resourceDb.getResourceById = mockResourceDbGetResourceById.mockResolvedValue({});
        resourceLikeDb.getResourceLikesByResourceId = mockResourceLikeDbGetResourceLikesByResourceId.mockResolvedValue([
            resourceLike,
        ]);

        // when
        const result = await resourceLikeService.getResourceLikesByResourceId(resourceId);

        // then
        expect(mockResourceLikeDbGetResourceLikesByResourceId).toHaveBeenCalledTimes(1);
        expect(result).toEqual([resourceLike]);
    });

    test('given: invalid resourceId, when: getting ResourceLikes by resourceId, then: error is thrown', () => {
        // given
        resourceDb.getResourceById = mockResourceDbGetResourceById.mockResolvedValue(undefined);

        // when
        const sut = async () => await resourceLikeService.getResourceLikesByResourceId(resourceId);

        // then
        expect(sut).rejects.toThrowError(`Resource with id ${resourceId} does not exist`);
    });
});

describe('delete ResourceLike', () => {
    test('given: existing ResourceLike, when: deleting ResourceLike, then: existing ResourceLike is returned and deleted', async () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue({});
        resourceDb.getResourceById = mockResourceDbGetResourceById.mockResolvedValue({});
        resourceLikeDb.getResourceLikeByProfileIdAndResourceId =
            mockResourceLikeDbGetResourceLikeByProfileIdAndResourceId.mockResolvedValue(resourceLike);
        resourceLikeDb.deleteResourceLike = mockResourceLikeDbDeleteResourceLike.mockResolvedValue(resourceLike);

        // when
        const result = await resourceLikeService.deleteResourceLike(profileId, resourceId);

        // then
        expect(mockResourceLikeDbDeleteResourceLike).toHaveBeenCalledTimes(1);
        expect(result).toEqual(resourceLike);
    });

    test('given: non-existing ResourceLike, when: deleting ResourceLike, then: error is thrown', () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue({});
        resourceDb.getResourceById = mockResourceDbGetResourceById.mockResolvedValue({});
        resourceLikeDb.getResourceLikeByProfileIdAndResourceId =
            mockResourceLikeDbGetResourceLikeByProfileIdAndResourceId.mockResolvedValue(undefined);

        // when
        const sut = async () => await resourceLikeService.deleteResourceLike(profileId, resourceId);

        // then
        expect(sut).rejects.toThrowError(
            `ResourceLike with profileId ${profileId} and resourceId ${resourceId} does not exist`
        );
    });
});
