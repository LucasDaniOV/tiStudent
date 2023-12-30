import request from 'supertest';
import app from '../../app';
import profileService from '../../service/profile.service';

const resourceId = 1;
const profileId = 1;
const message = 'TestComment';
const newMessage = 'New Message';

const profileEmail = 'satoshi@tistudent.com';
const profilePassword = 'Str0ngPW!!!';
let token: string;

let commentId: number;

beforeAll(async () => {
    const auth = await profileService.authenticate(profileEmail, profilePassword);
    token = auth.token;
});

test('create comment', async () => {
    // when
    const res = await request(app)
        .post('/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({ resourceId, profileId, message });

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('comment created');
    expect(res.body.comment.resourceId).toEqual(resourceId);
    expect(res.body.comment.profileId).toEqual(profileId);
    expect(res.body.comment.message).toEqual(message);
    expect(res.body.comment.createdAt).toBeDefined();
    expect(res.body.comment.updatedAt).toBeDefined();
    expect(res.body.comment.id).toBeDefined();

    commentId = res.body.comment.id;
});

test('get comments', async () => {
    // when
    const res = await request(app).get('/comments').set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('comments found');
    expect(res.body.comments).toBeDefined;
});

test('get comment by id', async () => {
    // when
    const res = await request(app).get(`/comments/${commentId}`).set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('comment found');
    expect(res.body.comment.message).toEqual(message);
    expect(res.body.comment.resourceId).toEqual(resourceId);
    expect(res.body.comment.profileId).toEqual(profileId);
    expect(res.body.comment.createdAt).toBeDefined();
    expect(res.body.comment.updatedAt).toBeDefined();
    expect(res.body.comment.id).toEqual(commentId);
});

test('update comment', async () => {
    // when
    const res = await request(app)
        .put(`/comments/${commentId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ message: newMessage });

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('comment updated');
    expect(res.body.updatedComment.message).toEqual(newMessage);
    expect(res.body.updatedComment.resourceId).toEqual(resourceId);
    expect(res.body.updatedComment.profileId).toEqual(profileId);
    expect(res.body.updatedComment.createdAt).toBeDefined();
    expect(res.body.updatedComment.updatedAt).toBeDefined();
    expect(res.body.updatedComment.id).toEqual(commentId);
});

test('delete comment', async () => {
    // when
    const res = await request(app).delete(`/comments/${commentId}`).set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('comment deleted');
    expect(res.body.deletedComment.message).toEqual(newMessage);
    expect(res.body.deletedComment.resourceId).toEqual(resourceId);
    expect(res.body.deletedComment.profileId).toEqual(profileId);
    expect(res.body.deletedComment.createdAt).toBeDefined();
    expect(res.body.deletedComment.updatedAt).toBeDefined();
    expect(res.body.deletedComment.id).toEqual(commentId);
});
