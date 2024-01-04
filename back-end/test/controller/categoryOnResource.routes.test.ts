import request from 'supertest';
import app from '../../app';
import profileService from '../../service/profile.service';

const profileEmail = 'satoshi@tistudent.com';
const profilePassword = 'Str0ngPW!!!';
const resourceId = 2;
const categoryId = 3;
let token: string;

beforeAll(async () => {
    const auth = await profileService.authenticate(profileEmail, profilePassword);
    token = auth.token;
});

test('create category on resource', async () => {
    // when
    const res = await request(app)
        .post('/categories-on-resources')
        .set('Authorization', `Bearer ${token}`)
        .send({ categoryId, resourceId });

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('category created on resource');
    expect(res.body.categoryOnResource.categoryId).toEqual(categoryId);
    expect(res.body.categoryOnResource.resourceId).toEqual(resourceId);
});

test('get categories on resources', async () => {
    // when
    const res = await request(app).get('/categories-on-resources').set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('categories on resources found');
    expect(res.body.categoriesOnResources).toBeDefined();
});

test('get categories on resources by category id', async () => {
    // when
    const res = await request(app)
        .get(`/categories-on-resources/category/${categoryId}`)
        .set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('categories on resource for category id found');
    expect(res.body.categoriesOnResources).toContainEqual({ categoryId, resourceId });
});

test('get categories on resources by resource id', async () => {
    // when
    const res = await request(app)
        .get(`/categories-on-resources/resource/${resourceId}`)
        .set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('categories on resource for resource id found');
    expect(res.body.categoriesOnResources).toContainEqual({ resourceId, categoryId });
});

test('delete category on resource', async () => {
    // when
    const res = await request(app)
        .delete(`/categories-on-resources?categoryId=${categoryId}&resourceId=${resourceId}`)
        .set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('category on resource deleted');
    expect(res.body.deletedCategoryOnResource).toEqual({ resourceId, categoryId });
});
