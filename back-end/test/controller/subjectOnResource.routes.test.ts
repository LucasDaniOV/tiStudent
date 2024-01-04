import request from 'supertest';
import app from '../../app';
import profileService from '../../service/profile.service';

const profileEmail = 'satoshi@tistudent.com';
const profilePassword = 'Str0ngPW!!!';
const resourceId = 2;
const subjectId = 2;
let token: string;

beforeAll(async () => {
    const auth = await profileService.authenticate(profileEmail, profilePassword);
    token = auth.token;
});

test('create subject on resource', async () => {
    // when
    const res = await request(app)
        .post('/subjects-on-resources')
        .set('Authorization', `Bearer ${token}`)
        .send({ subjectId, resourceId });

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('subject created on resource');
    expect(res.body.subjectOnResource.subjectId).toEqual(subjectId);
    expect(res.body.subjectOnResource.resourceId).toEqual(resourceId);
});

test('get subjects on resources', async () => {
    // when
    const res = await request(app).get('/subjects-on-resources').set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('subjects on resources found');
    expect(res.body.subjectsOnResources).toBeDefined();
});

test('get subjects on resources by subject id', async () => {
    // when
    const res = await request(app)
        .get(`/subjects-on-resources/subject/${subjectId}`)
        .set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('subjects on resource for subject id found');
    expect(res.body.subjectsOnResources).toContainEqual({ subjectId, resourceId });
});

test('get subjects on resources by resource id', async () => {
    // when
    const res = await request(app)
        .get(`/subjects-on-resources/resource/${resourceId}`)
        .set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('subjects on resource for resource id found');
    expect(res.body.subjectsOnResources).toContainEqual({ subjectId, resourceId });
});

test('delete subject on resource', async () => {
    // when
    const res = await request(app)
        .delete(`/subjects-on-resources?subjectId=${subjectId}&resourceId=${resourceId}`)
        .set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('subject on resource deleted');
    expect(res.body.deletedSubjectOnResource).toEqual({ resourceId, subjectId });
});
