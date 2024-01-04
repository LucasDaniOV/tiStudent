import commentDb from '../../domain/data-access/comment.db';
import resourceDb from '../../domain/data-access/resource.db';
import profileDb from '../../domain/data-access/profile.db';
import { Comment } from '../../domain/model/comment';
import commentService from '../../service/comment.service';

const id = 1;
const createdAt = new Date();
const updatedAt = new Date();
const message = 'message';
const profileId = 2;
const resourceId = 3;
const parentId = 4;

const comment = new Comment(id, createdAt, updatedAt, message, profileId, resourceId);
const subComment = new Comment(id, createdAt, updatedAt, message, profileId, resourceId, parentId);

let mockCommentDbCreateComment: jest.Mock;
let mockCommentDbGetComments: jest.Mock;
let mockCommentDbGetCommentById: jest.Mock;
let mockCommentDbGetCommentsByResourceId: jest.Mock;
let mockCommentDbGetChildrenByCommentId: jest.Mock;
let mockCommentDbUpdateCommentMessage: jest.Mock;
let mockCommentDbDeleteComment: jest.Mock;
let mockResourceDbGetResourceById: jest.Mock;
let mockProfileDbGetProfileById: jest.Mock;

beforeEach(() => {
    mockCommentDbCreateComment = jest.fn();
    mockCommentDbGetComments = jest.fn();
    mockCommentDbGetCommentById = jest.fn();
    mockCommentDbGetCommentsByResourceId = jest.fn();
    mockCommentDbGetChildrenByCommentId = jest.fn();
    mockCommentDbUpdateCommentMessage = jest.fn();
    mockCommentDbDeleteComment = jest.fn();
    mockResourceDbGetResourceById = jest.fn();
    mockProfileDbGetProfileById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test(`given: valid values for comment, when: creating a comment, then: should create a comment`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({});
    profileDb.getProfileById = mockProfileDbGetProfileById.mockReturnValue({});
    commentDb.createComment = mockCommentDbCreateComment.mockReturnValue(comment);

    // when
    const result = await commentService.createComment(resourceId, profileId, message);

    // then
    expect(result).toBeDefined();
    expect(result).toBe(comment);
    expect(mockCommentDbCreateComment).toHaveBeenCalledWith(resourceId, profileId, message, undefined);
});

test(`given: valid values for sub-comment, when: creating a sub-comment, then: should create a sub-comment`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({});
    profileDb.getProfileById = mockProfileDbGetProfileById.mockReturnValue({});
    commentDb.createComment = mockCommentDbCreateComment.mockReturnValue(subComment);

    // when
    const result = await commentService.createComment(resourceId, profileId, message, parentId);

    // then
    expect(result).toBeDefined();
    expect(result).toBe(subComment);
    expect(mockCommentDbCreateComment).toHaveBeenCalledWith(resourceId, profileId, message, parentId);
});

describe(`bad cases for creating comment`, () => {
    test(`given: invalid resource id, when: creating a comment, then: should throw an error`, async () => {
        // given
        resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue(null);

        // when
        try {
            await commentService.createComment(resourceId, profileId, message);
        } catch (error) {
            // then
            expect(error).toBeDefined();
            expect(error.message).toBe(`Resource with id ${resourceId} does not exist`);
            expect(mockCommentDbCreateComment).not.toHaveBeenCalled();
        }
    });

    test(`given: invalid profile id, when: creating a comment, then: should throw an error`, async () => {
        // given
        resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({});
        profileDb.getProfileById = mockProfileDbGetProfileById.mockReturnValue(null);

        // when
        try {
            await commentService.createComment(resourceId, profileId, message);
        } catch (error) {
            // then
            expect(error).toBeDefined();
            expect(error.message).toBe(`Profile with id ${profileId} does not exist`);
            expect(mockCommentDbCreateComment).not.toHaveBeenCalled();
        }
    });

    test(`given: invalid parent id, when: creating a comment, then: should throw an error`, async () => {
        // given
        resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({});
        profileDb.getProfileById = mockProfileDbGetProfileById.mockReturnValue({});
        commentDb.getCommentById = mockCommentDbGetCommentById.mockReturnValue(null);

        // when
        try {
            await commentService.createComment(resourceId, profileId, message, parentId);
        } catch (error) {
            // then
            expect(error).toBeDefined();
            expect(error.message).toBe(`no comment with id ${parentId} found`);
            expect(mockCommentDbCreateComment).not.toHaveBeenCalled();
        }
    });
});

test(`given: valid values, when: getting comments, then: should get comments`, async () => {
    // given
    commentDb.getComments = mockCommentDbGetComments.mockReturnValue([comment]);

    // when
    const result = await commentService.getComments();

    // then
    expect(result).toBeDefined();
    expect(result).toStrictEqual([comment]);
    expect(mockCommentDbGetComments).toHaveBeenCalled();
});

test(`given: existing comment with id, when: getting comment by id, then: should get comment by id`, async () => {
    // given
    commentDb.getCommentById = mockCommentDbGetCommentById.mockReturnValue(comment);

    // when
    const result = await commentService.getCommentById(id);

    // then
    expect(result).toBeDefined();
    expect(result).toBe(comment);
    expect(mockCommentDbGetCommentById).toHaveBeenCalledWith(id);
});

test(`given: non-existing comment with id, when: getting comment by id, then: should throw an error`, async () => {
    // given
    commentDb.getCommentById = mockCommentDbGetCommentById.mockReturnValue(null);

    // when
    try {
        await commentService.getCommentById(id);
    } catch (error) {
        // then
        expect(error).toBeDefined();
        expect(error.message).toBe(`no comment with id ${id} found`);
        expect(mockCommentDbGetCommentById).toHaveBeenCalledWith(id);
    }
});

test(`given: valid resource id, when: getting comments by resource id, then: should get comments by resource id`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue({});
    commentDb.getCommentsByResourceId = mockCommentDbGetCommentsByResourceId.mockReturnValue([comment]);

    // when
    const result = await commentService.getCommentsByResourceId(resourceId);

    // then
    expect(result).toBeDefined();
    expect(result).toStrictEqual([comment]);
    expect(mockCommentDbGetCommentsByResourceId).toHaveBeenCalledWith(resourceId);
});

test(`given: invalid resource id, when: getting comments by resource id, then: should throw an error`, async () => {
    // given
    resourceDb.getResourceById = mockResourceDbGetResourceById.mockReturnValue(null);

    // when
    try {
        await commentService.getCommentsByResourceId(resourceId);
    } catch (error) {
        // then
        expect(error).toBeDefined();
        expect(error.message).toBe(`Resource with id ${resourceId} does not exist`);
        expect(mockCommentDbGetCommentsByResourceId).not.toHaveBeenCalled();
    }
});

test(`given: valid comment id, when: getting children by comment id, then: should get children by comment id`, async () => {
    // given
    commentDb.getCommentById = mockCommentDbGetCommentById.mockReturnValue(comment);
    commentDb.getChildrenByCommentId = mockCommentDbGetChildrenByCommentId.mockReturnValue([subComment]);

    // when
    const result = await commentService.getChildrenByCommentId(id);

    // then
    expect(result).toBeDefined();
    expect(result).toStrictEqual([subComment]);
    expect(mockCommentDbGetChildrenByCommentId).toHaveBeenCalledWith(id);
});

test(`given: invalid comment id, when: getting children by comment id, then: should throw an error`, async () => {
    // given
    commentDb.getCommentById = mockCommentDbGetCommentById.mockReturnValue(null);

    // when
    try {
        await commentService.getChildrenByCommentId(id);
    } catch (error) {
        // then
        expect(error).toBeDefined();
        expect(error.message).toBe(`no comment with id ${id} found`);
        expect(mockCommentDbGetChildrenByCommentId).not.toHaveBeenCalled();
    }
});

test(`given: valid values, when: updating comment message, then: should update comment message`, async () => {
    // given
    commentDb.getCommentById = mockCommentDbGetCommentById.mockReturnValue(comment);
    commentDb.updateCommentMessage = mockCommentDbUpdateCommentMessage.mockReturnValue(comment);

    // when
    const result = await commentService.updateCommentMessage(id, message);

    // then
    expect(result).toBeDefined();
    expect(result).toBe(comment);
    expect(mockCommentDbUpdateCommentMessage).toHaveBeenCalledWith(id, message);
});

test(`given: invalid comment id, when: updating comment message, then: should throw an error`, async () => {
    // given
    commentDb.getCommentById = mockCommentDbGetCommentById.mockReturnValue(null);

    // when
    try {
        await commentService.updateCommentMessage(id, message);
    } catch (error) {
        // then
        expect(error).toBeDefined();
        expect(error.message).toBe(`no comment with id ${id} found`);
        expect(mockCommentDbUpdateCommentMessage).not.toHaveBeenCalled();
    }
});

test(`given: valid values, when: deleting comment, then: should delete comment`, async () => {
    // given
    commentDb.getCommentById = mockCommentDbGetCommentById.mockReturnValue(comment);
    commentDb.deleteComment = mockCommentDbDeleteComment.mockReturnValue(comment);

    // when
    const result = await commentService.deleteComment(id);

    // then
    expect(result).toBeDefined();
    expect(result).toBe(comment);
    expect(mockCommentDbDeleteComment).toHaveBeenCalledWith(id);
});

test(`given: invalid comment id, when: deleting comment, then: should throw an error`, async () => {
    // given
    commentDb.getCommentById = mockCommentDbGetCommentById.mockReturnValue(null);

    // when
    try {
        await commentService.deleteComment(id);
    } catch (error) {
        // then
        expect(error).toBeDefined();
        expect(error.message).toBe(`no comment with id ${id} found`);
        expect(mockCommentDbDeleteComment).not.toHaveBeenCalled();
    }
});
