import request from 'supertest';
import app from '../../app';
import profileService from '../../service/profile.service';

const profileId = 1;
const resourceId = 1;
const profileEmail = 'satoshi@tistudent.com';
const profilePassword = 'Str0ngPW!!!';

let token: string;

beforeAll(async () => {
    const auth = await profileService.authenticate(profileEmail, profilePassword);
    token = auth.token;
});

test('create resource like', async () => {
    // when
    const res = await request(app)
        .post('/resourcelikes')
        .set('Authorization', `Bearer ${token}`)
        .send({ profileId, resourceId });

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('resource like created');
    expect(res.body.resourceLike.profileId).toEqual(profileId);
    expect(res.body.resourceLike.resourceId).toEqual(resourceId);
    expect(res.body.resourceLike.createdAt).toBeDefined();
});

test('get resource like by profileId and resourceId', async () => {
    // when
    const res = await request(app)
        .get(`/resourcelikes?profileId=${profileId}&resourceId=${resourceId}`)
        .set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('resource likes found');
    expect(res.body.resourceLikes.length).toEqual(1);
    expect(res.body.resourceLikes[0].profileId).toEqual(profileId);
    expect(res.body.resourceLikes[0].resourceId).toEqual(resourceId);
    expect(res.body.resourceLikes[0].createdAt).toBeDefined();
});

test('get resource likes by profileId', async () => {
    // when
    const res = await request(app).get(`/resourcelikes?profileId=${profileId}`).set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('resource likes found');
    expect(res.body.resourceLikes.length).toEqual(1);
    expect(res.body.resourceLikes[0].profileId).toEqual(profileId);
    expect(res.body.resourceLikes[0].resourceId).toEqual(resourceId);
    expect(res.body.resourceLikes[0].createdAt).toBeDefined();
});

test('get resource likes by resourceId', async () => {
    // when
    const res = await request(app)
        .get(`/resourcelikes?resourceId=${resourceId}`)
        .set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('resource likes found');
    expect(res.body.resourceLikes.length).toEqual(2);
    expect(res.body.resourceLikes[1].profileId).toEqual(profileId);
    expect(res.body.resourceLikes[1].resourceId).toEqual(resourceId);
    expect(res.body.resourceLikes[1].createdAt).toBeDefined();
});

test('get all resource likes', async () => {
    // when
    const res = await request(app).get('/resourcelikes').set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('resource likes found');
    expect(res.body.resourceLikes.length).toEqual(2);
    expect(res.body.resourceLikes[1].profileId).toEqual(profileId);
    expect(res.body.resourceLikes[1].resourceId).toEqual(resourceId);
    expect(res.body.resourceLikes[1].createdAt).toBeDefined();
});

test('delete resource like', async () => {
    // when
    const res = await request(app)
        .delete(`/resourcelikes?profileId=${profileId}&resourceId=${resourceId}`)
        .set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('resource like deleted');
    expect(res.body.deletedResourceLike.profileId).toEqual(profileId);
    expect(res.body.deletedResourceLike.resourceId).toEqual(resourceId);
    expect(res.body.deletedResourceLike.createdAt).toBeDefined();
});
