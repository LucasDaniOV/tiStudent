import { Comment } from '../../../domain/model/comment';

const id = 1;
const createdAt = new Date();
const updatedAt = new Date();
const message = 'message';
const profileId = 1;
const resourceId = 1;
const parentId = 1;

describe('Comment', () => {
    it('should create a valid comment', () => {
        const comment = new Comment(id, createdAt, updatedAt, message, profileId, resourceId, parentId);
        expect(comment).toBeDefined();
        expect(comment.id).toBe(id);
        expect(comment.createdAt).toBe(createdAt);
        expect(comment.updatedAt).toBe(updatedAt);
        expect(comment.message).toBe(message);
        expect(comment.profileId).toBe(profileId);
        expect(comment.resourceId).toBe(resourceId);
        expect(comment.parentId).toBe(parentId);
    });

    it('should throw an error when creating a comment with an invalid message', () => {
        expect(() => new Comment(id, createdAt, updatedAt, '', profileId, resourceId, parentId)).toThrowError();
        expect(() => new Comment(id, createdAt, updatedAt, null, profileId, resourceId, parentId)).toThrowError();
        expect(() => new Comment(id, createdAt, updatedAt, undefined, profileId, resourceId, parentId)).toThrowError();
        expect(() => new Comment(id, createdAt, updatedAt, 1 as any, profileId, resourceId, parentId)).toThrowError();
        expect(
            () => new Comment(id, createdAt, updatedAt, 'a'.repeat(1001), profileId, resourceId, parentId)
        ).toThrowError();
    });
});
