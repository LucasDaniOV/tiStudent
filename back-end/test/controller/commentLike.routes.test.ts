import request from 'supertest';
import app from '../../app';
import profileService from '../../service/profile.service';

const profileId = 1;
const commentId = 1;
const profileEmail = 'satoshi@tistudent.com';
const profilePassword = 'Str0ngPW!!!';

let token: string;

beforeAll(async () => {
    const auth = await profileService.authenticate(profileEmail, profilePassword);
    token = auth.token;
});

test('create comment like', async () => {
    // when
    const res = await request(app)
        .post('/commentlikes')
        .set('Authorization', `Bearer ${token}`)
        .send({ profileId, commentId });

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('comment like created');
    expect(res.body.commentLike.profileId).toEqual(profileId);
    expect(res.body.commentLike.commentId).toEqual(commentId);
    expect(res.body.commentLike.createdAt).toBeDefined();
});

test('get comment like by profileId and commentId', async () => {
    // when
    const res = await request(app)
        .get(`/commentlikes?profileId=${profileId}&commentId=${commentId}`)
        .set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('comment likes found');
    expect(res.body.commentLikes.length).toEqual(1);
    expect(res.body.commentLikes[0].profileId).toEqual(profileId);
    expect(res.body.commentLikes[0].commentId).toEqual(commentId);
    expect(res.body.commentLikes[0].createdAt).toBeDefined();
});

test('get comment likes by profileId', async () => {
    // when
    const res = await request(app).get(`/commentlikes?profileId=${profileId}`).set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('comment likes found');
    expect(res.body.commentLikes.length).toEqual(1);
    expect(res.body.commentLikes[0].profileId).toEqual(profileId);
    expect(res.body.commentLikes[0].commentId).toEqual(commentId);
    expect(res.body.commentLikes[0].createdAt).toBeDefined();
});

test('get comment likes by commentId', async () => {
    // when
    const res = await request(app).get(`/commentlikes?commentId=${commentId}`).set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('comment likes found');
    expect(res.body.commentLikes.length).toEqual(2);
    expect(res.body.commentLikes[1].profileId).toEqual(profileId);
    expect(res.body.commentLikes[1].commentId).toEqual(commentId);
    expect(res.body.commentLikes[1].createdAt).toBeDefined();
});

test('get all comment likes', async () => {
    // when
    const res = await request(app).get('/commentlikes').set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('comment likes found');
    expect(res.body.commentLikes.length).toEqual(2);
    expect(res.body.commentLikes[1].profileId).toEqual(profileId);
    expect(res.body.commentLikes[1].commentId).toEqual(commentId);
    expect(res.body.commentLikes[1].createdAt).toBeDefined();
});

test('delete comment like', async () => {
    // when
    const res = await request(app)
        .delete(`/commentlikes?profileId=${profileId}&commentId=${commentId}`)
        .set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('comment like deleted');
    expect(res.body.deletedCommentLike.profileId).toEqual(profileId);
    expect(res.body.deletedCommentLike.commentId).toEqual(commentId);
    expect(res.body.deletedCommentLike.createdAt).toBeDefined();
});
