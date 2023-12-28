import request from 'supertest';
import app from '../../app';
import profileService from '../../service/profile.service';

const profileEmail = 'satoshi@tistudent.com';
const profilePassword = 'Str0ngPW!!!';
const name = 'TestSubject';
const newName = 'New Subject Name';

let subjectId: number;
let token: string;

beforeAll(async () => {
    const auth = await profileService.authenticate(profileEmail, profilePassword);
    token = auth.token;
});

test('create subject', async () => {
    // when
    const res = await request(app).post('/subjects').set('Authorization', `Bearer ${token}`).send({ name });

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('subject created');
    expect(res.body.subject.name).toEqual(name);
    expect(res.body.subject.id).toBeDefined();

    subjectId = res.body.subject.id;
});

test('get subject by id', async () => {
    // when
    const res = await request(app).get(`/subjects/${subjectId}`).set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('subject found');
    expect(res.body.subject.name).toEqual(name);
    expect(res.body.subject.id).toEqual(subjectId);
});

test('update subject', async () => {
    // when
    const res = await request(app)
        .put(`/subjects/${subjectId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: newName });

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('subject updated');
    expect(res.body.updatedSubject.name).toEqual(newName);
    expect(res.body.updatedSubject.id).toEqual(subjectId);
});

test('delete subject', async () => {
    // when
    const res = await request(app).delete(`/subjects/${subjectId}`).set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('subject deleted');
    expect(res.body.deletedSubject.name).toEqual(newName);
    expect(res.body.deletedSubject.id).toEqual(subjectId);
});
