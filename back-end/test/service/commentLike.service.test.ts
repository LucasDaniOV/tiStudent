import commentLikeDb from '../../domain/data-access/commentLike.db';
import commentLikeService from '../../service/commentLike.service';
import profileDb from '../../domain/data-access/profile.db';
import commentDb from '../../domain/data-access/comment.db';
import { CommentLike } from '../../domain/model/commentLike';
import { CommentLikeInput } from '../../types';

const commentId = 1;
const profileId = 1;
const createdAt = new Date();

const commentLike = new CommentLike(commentId, profileId, createdAt);

const commentLikeInput: CommentLikeInput = {
    commentId: commentId,
    profileId,
};

let mockCommentLikeDbCreateCommentLike: jest.Mock;
let mockCommentLikeDbGetCommentLikeByProfileIdAndCommentId: jest.Mock;
let mockCommentLikeDbGetCommentLikes: jest.Mock;
let mockCommentLikeDbGetCommentLikesByProfileId: jest.Mock;
let mockCommentLikeDbGetCommentLikesByCommentId: jest.Mock;
let mockCommentLikeDbDeleteCommentLike: jest.Mock;
let mockProfileDbGetProfileById: jest.Mock;
let mockCommentDbGetCommentById: jest.Mock;

beforeEach(() => {
    mockCommentLikeDbCreateCommentLike = jest.fn();
    mockCommentLikeDbGetCommentLikeByProfileIdAndCommentId = jest.fn();
    mockCommentLikeDbGetCommentLikes = jest.fn();
    mockCommentLikeDbGetCommentLikesByProfileId = jest.fn();
    mockCommentLikeDbGetCommentLikesByCommentId = jest.fn();
    mockCommentLikeDbDeleteCommentLike = jest.fn();
    mockProfileDbGetProfileById = jest.fn();
    mockCommentDbGetCommentById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('create CommentLike', () => {
    test('given: valid values for CommentLike, when: creating CommentLike, then: CommentLike is created and returned', async () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue({});
        commentDb.getCommentById = mockCommentDbGetCommentById.mockResolvedValue({});
        commentLikeDb.getCommentLikeByProfileIdAndCommentId =
            mockCommentLikeDbGetCommentLikeByProfileIdAndCommentId.mockResolvedValue(undefined);
        commentLikeDb.createCommentLike = mockCommentLikeDbCreateCommentLike.mockResolvedValue(commentLike);

        // when
        const result = await commentLikeService.createCommentLike(commentLikeInput);

        // then
        expect(mockCommentLikeDbCreateCommentLike).toHaveBeenCalledTimes(1);
        expect(result).toEqual(commentLike);
    });

    test('given: CommentLike already exists, when: creating CommentLike, then: error is thrown', () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue({});
        commentDb.getCommentById = mockCommentDbGetCommentById.mockResolvedValue({});
        commentLikeDb.getCommentLikeByProfileIdAndCommentId =
            mockCommentLikeDbGetCommentLikeByProfileIdAndCommentId.mockResolvedValue(commentLike);

        // when
        const sut = async () => await commentLikeService.createCommentLike(commentLikeInput);

        // then
        expect(sut).rejects.toThrowError(
            `CommentLike with profileId ${profileId} and commentId ${commentId} already exists`
        );
    });

    test('given: invalid profileId, when: creating CommentLike, then: error is thrown', () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue(undefined);

        // when
        const sut = async () => await commentLikeService.createCommentLike(commentLikeInput);

        // then
        expect(sut).rejects.toThrowError(`Profile with id ${profileId} does not exist`);
    });

    test('given: invalid commentId, when: creating CommentLike, then: error is thrown', () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue({});
        commentDb.getCommentById = mockCommentDbGetCommentById.mockResolvedValue(undefined);

        // when
        const sut = async () => await commentLikeService.createCommentLike(commentLikeInput);

        // then
        expect(sut).rejects.toThrowError(`no comment with id ${commentId} found`);
    });
});

describe('get CommentLike', () => {
    test('given: existing CommentLike, when: getting CommentLike, then: existing CommentLike is returned', async () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue({});
        commentDb.getCommentById = mockCommentDbGetCommentById.mockResolvedValue({});
        commentLikeDb.getCommentLikeByProfileIdAndCommentId =
            mockCommentLikeDbGetCommentLikeByProfileIdAndCommentId.mockResolvedValue(commentLike);

        // when
        const result = await commentLikeService.getCommentLikeByProfileIdAndCommentId(profileId, commentId);

        // then
        expect(mockCommentLikeDbGetCommentLikeByProfileIdAndCommentId).toHaveBeenCalledTimes(1);
        expect(result).toEqual(commentLike);
    });

    test('given: non-existing CommentLike, when: getting CommentLike, then: error is thrown', () => {
        // given
        commentLikeDb.getCommentLikeByProfileIdAndCommentId =
            mockCommentLikeDbGetCommentLikeByProfileIdAndCommentId.mockResolvedValue(undefined);
        commentDb.getCommentById = mockCommentDbGetCommentById.mockResolvedValue({});
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue({});

        // when
        const sut = async () => await commentLikeService.getCommentLikeByProfileIdAndCommentId(profileId, commentId);

        // then
        expect(sut).rejects.toThrowError(
            `CommentLike with profileId ${profileId} and commentId ${commentId} does not exist`
        );
    });

    test('given: invalid profileId, when: getting CommentLike, then: error is thrown', () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue(undefined);

        // when
        const sut = async () => await commentLikeService.getCommentLikeByProfileIdAndCommentId(profileId, commentId);

        // then
        expect(sut).rejects.toThrowError(`Profile with id ${profileId} does not exist`);
    });

    test('given: invalid commentId, when: getting CommentLike, then: error is thrown', () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue({});
        commentDb.getCommentById = mockCommentDbGetCommentById.mockResolvedValue(undefined);

        // when
        const sut = async () => await commentLikeService.getCommentLikeByProfileIdAndCommentId(profileId, commentId);

        // then
        expect(sut).rejects.toThrowError(`no comment with id ${commentId} found`);
    });

    test('given: existing CommentLikes, when: getting CommentLikes, then: existing CommentLikes are returned', async () => {
        // given
        commentLikeDb.getCommentLikes = mockCommentLikeDbGetCommentLikes.mockResolvedValue([commentLike]);

        // when
        const result = await commentLikeService.getCommentLikes();

        // then
        expect(mockCommentLikeDbGetCommentLikes).toHaveBeenCalledTimes(1);
        expect(result).toEqual([commentLike]);
    });

    test('given: existing CommentLikes, when: getting CommentLikes by profileId, then: existing CommentLikes by profileId are returned', async () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue({});
        commentLikeDb.getCommentLikesByProfileId = mockCommentLikeDbGetCommentLikesByProfileId.mockResolvedValue([
            commentLike,
        ]);

        // when
        const result = await commentLikeService.getCommentLikesByProfileId(profileId);

        // then
        expect(mockCommentLikeDbGetCommentLikesByProfileId).toHaveBeenCalledTimes(1);
        expect(result).toEqual([commentLike]);
    });

    test('given: invalid profileId, when: getting CommentLikes by profileId, then: error is thrown', () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue(undefined);

        // when
        const sut = async () => await commentLikeService.getCommentLikesByProfileId(profileId);

        // then
        expect(sut).rejects.toThrowError(`Profile with id ${profileId} does not exist`);
    });

    test('given: existing CommentLikes, when: getting CommentLikes by commentId, then: existing CommentLikes by commentId are returned', async () => {
        // given
        commentDb.getCommentById = mockCommentDbGetCommentById.mockResolvedValue({});
        commentLikeDb.getCommentLikesByCommentId = mockCommentLikeDbGetCommentLikesByCommentId.mockResolvedValue([
            commentLike,
        ]);

        // when
        const result = await commentLikeService.getCommentLikesByCommentId(commentId);

        // then
        expect(mockCommentLikeDbGetCommentLikesByCommentId).toHaveBeenCalledTimes(1);
        expect(result).toEqual([commentLike]);
    });

    test('given: invalid commentId, when: getting CommentLikes by commentId, then: error is thrown', () => {
        // given
        commentDb.getCommentById = mockCommentDbGetCommentById.mockResolvedValue(undefined);

        // when
        const sut = async () => await commentLikeService.getCommentLikesByCommentId(commentId);

        // then
        expect(sut).rejects.toThrowError(`no comment with id ${commentId} found`);
    });
});

describe('delete CommentLike', () => {
    test('given: existing CommentLike, when: deleting CommentLike, then: existing CommentLike is returned and deleted', async () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue({});
        commentDb.getCommentById = mockCommentDbGetCommentById.mockResolvedValue({});
        commentLikeDb.getCommentLikeByProfileIdAndCommentId =
            mockCommentLikeDbGetCommentLikeByProfileIdAndCommentId.mockResolvedValue(commentLike);
        commentLikeDb.deleteCommentLike = mockCommentLikeDbDeleteCommentLike.mockResolvedValue(commentLike);

        // when
        const result = await commentLikeService.deleteCommentLike(profileId, commentId);

        // then
        expect(mockCommentLikeDbDeleteCommentLike).toHaveBeenCalledTimes(1);
        expect(result).toEqual(commentLike);
    });

    test('given: non-existing CommentLike, when: deleting CommentLike, then: error is thrown', () => {
        // given
        profileDb.getProfileById = mockProfileDbGetProfileById.mockResolvedValue({});
        commentDb.getCommentById = mockCommentDbGetCommentById.mockResolvedValue({});
        commentLikeDb.getCommentLikeByProfileIdAndCommentId =
            mockCommentLikeDbGetCommentLikeByProfileIdAndCommentId.mockResolvedValue(undefined);

        // when
        const sut = async () => await commentLikeService.deleteCommentLike(profileId, commentId);

        // then
        expect(sut).rejects.toThrowError(
            `CommentLike with profileId ${profileId} and commentId ${commentId} does not exist`
        );
    });
});
