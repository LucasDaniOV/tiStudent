import { CommentLike } from '../../../domain/model/commentLike';

const commentId = 1;
const profileId = 1;
const createdAt = new Date();

test(`given: valid values form commentLike, when: creating a commentLike, then: should create a commentLike`, () => {
    // given
    // when
    const commentLike = new CommentLike(commentId, profileId, createdAt);

    // then
    expect(commentLike).toBeDefined();
    expect(commentLike.commentId).toBe(commentId);
    expect(commentLike.profileId).toBe(profileId);
    expect(commentLike.createdAt).toBe(createdAt);
});
