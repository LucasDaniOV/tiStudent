import request from 'supertest';
import app from '../../app';
import profileService from '../../service/profile.service';

const title = 'AppTest';
const description = 'Testing resource creation';
const profileId = 1;
const profileEmail = 'satoshi@tistudent.com';
const profilePassword = 'Str0ngPW!!!';
const newTitle = 'New Title';
const newDescription = 'New Description';
const filePath = 'aple.jpg';
const thumbNail = 'default-thumbnail1.jpg';

let resourceId: number;
let token: string;

beforeAll(async () => {
    const auth = await profileService.authenticate(profileEmail, profilePassword);
    token = auth.token;
});

describe('resource CRUD', () => {
    test('create resource', async () => {
        // when
        const res = await request(app)
            .post('/resources')
            .set('Authorization', `Bearer ${token}`)
            .send({ title, description, filePath, thumbNail, profileId });

        // then
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.message).toEqual('resource created');
        expect(res.body.resource.title).toEqual(title);
        expect(res.body.resource.description).toEqual(description);
        expect(res.body.resource.filePath).toEqual(filePath);
        expect(res.body.resource.thumbNail).toEqual(thumbNail);
        expect(res.body.resource.profileId).toEqual(profileId);
        expect(res.body.resource.createdAt).toBeDefined();
        expect(res.body.resource.updatedAt).toBeDefined();
        expect(res.body.resource.id).toBeDefined();

        resourceId = res.body.resource.id;
    });

    test('get resource by id', async () => {
        // when
        const res = await request(app).get(`/resources/${resourceId}`).set('Authorization', `Bearer ${token}`);

        // then
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.message).toEqual('resource found');
        expect(res.body.resource.title).toEqual(title);
        expect(res.body.resource.description).toEqual(description);
        expect(res.body.resource.filePath).toEqual(filePath);
        expect(res.body.resource.thumbNail).toEqual(thumbNail);
        expect(res.body.resource.profileId).toEqual(profileId);
        expect(res.body.resource.createdAt).toBeDefined();
        expect(res.body.resource.updatedAt).toBeDefined();
        expect(res.body.resource.id).toEqual(resourceId);
    });

    test('update resource', async () => {
        // when
        const res = await request(app)
            .put(`/resources/${resourceId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: newTitle, description: newDescription, profileId });

        // then
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.message).toEqual('resource updated');
        expect(res.body.updatedResource.title).toEqual(newTitle);
        expect(res.body.updatedResource.description).toEqual(newDescription);
        expect(res.body.updatedResource.filePath).toEqual(filePath);
        expect(res.body.updatedResource.thumbNail).toEqual(thumbNail);
        expect(res.body.updatedResource.profileId).toEqual(profileId);
        expect(res.body.updatedResource.createdAt).toBeDefined();
        expect(res.body.updatedResource.updatedAt).toBeDefined();
        expect(res.body.updatedResource.id).toEqual(resourceId);
    });

    test('delete resource', async () => {
        // when
        const res = await request(app).delete(`/resources/${resourceId}`).set('Authorization', `Bearer ${token}`);

        // then
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.message).toEqual('resource deleted');
        expect(res.body.deletedResource.title).toEqual(newTitle);
        expect(res.body.deletedResource.description).toEqual(newDescription);
        expect(res.body.deletedResource.filePath).toEqual(filePath);
        expect(res.body.deletedResource.thumbNail).toEqual(thumbNail);
        expect(res.body.deletedResource.profileId).toEqual(profileId);
        expect(res.body.deletedResource.createdAt).toBeDefined();
        expect(res.body.deletedResource.updatedAt).toBeDefined();
        expect(res.body.deletedResource.id).toEqual(resourceId);
    });
});
