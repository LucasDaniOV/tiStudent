import { ResourceLike } from '../../../domain/model/resourceLike';

const resourceId = 1;
const profileId = 1;
const createdAt = new Date();

test(`given: valid values form resourceLike, when: creating a resourceLike, then: should create a resourceLike`, () => {
    // given
    // when
    const resourceLike = new ResourceLike(resourceId, profileId, createdAt);

    // then
    expect(resourceLike).toBeDefined();
    expect(resourceLike.resourceId).toBe(resourceId);
    expect(resourceLike.profileId).toBe(profileId);
    expect(resourceLike.createdAt).toBe(createdAt);
});
