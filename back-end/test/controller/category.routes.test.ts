import request from 'supertest';
import app from '../../app';
import profileService from '../../service/profile.service';

const profileEmail = 'satoshi@tistudent.com';
const profilePassword = 'Str0ngPW!!!';
const name = 'TestCategory';
const newName = 'New Category Name';

let categoryId: number;
let token: string;

beforeAll(async () => {
    const auth = await profileService.authenticate(profileEmail, profilePassword);
    token = auth.token;
});

test('create category', async () => {
    // when
    const res = await request(app).post('/categories').set('Authorization', `Bearer ${token}`).send({ name });

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('category created');
    expect(res.body.category.name).toEqual(name);
    expect(res.body.category.id).toBeDefined();

    categoryId = res.body.category.id;
});

test('get category by id', async () => {
    // when
    const res = await request(app).get(`/categories/${categoryId}`).set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('category found');
    expect(res.body.category.name).toEqual(name);
    expect(res.body.category.id).toEqual(categoryId);
});

test('update category', async () => {
    // when
    const res = await request(app)
        .put(`/categories/${categoryId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: newName });

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('category updated');
    expect(res.body.updatedCategory.name).toEqual(newName);
    expect(res.body.updatedCategory.id).toEqual(categoryId);
});

test('delete category', async () => {
    // when
    const res = await request(app).delete(`/categories/${categoryId}`).set('Authorization', `Bearer ${token}`);

    // then
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('category deleted');
    expect(res.body.deletedCategory.name).toEqual(newName);
    expect(res.body.deletedCategory.id).toEqual(categoryId);
});
