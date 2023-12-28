import request from 'supertest';
import app from '../../app';
import { comparePasswordWithHash } from '../../util/password';

describe('test profile endpoints', () => {
    const email = '@app.test.ts';
    const password = 'P4ssw@rd!';
    const username = 'AppTest';
    const role = 'USER';
    const bio = 'Testing profile signup';

    let id: number;
    let token: string;

    const updatedEmail = 'updated@app.test.ts';
    const updatedPassword = 'updatedP4ssw@rd!';
    const updatedUsername = 'UpdatedAppTest';
    const updatedRole = 'ADMIN';
    const updatedBio = 'Updated Testing profile';

    test('create profile', async () => {
        // when
        const res = await request(app).post('/signup').send({ email, password, username, role, bio });

        // then
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.message).toEqual('profile created');
        expect(res.body.profile.email).toEqual(email);
        expect(await comparePasswordWithHash(password, res.body.profile.password)).toEqual(true);
        expect(res.body.profile.username).toEqual(username);
        expect(res.body.profile.role).toEqual(role);
        expect(res.body.profile.bio).toEqual(bio);
        expect(res.body.profile.createdAt).toBeDefined();
        expect(res.body.profile.latestActivity).toBeDefined();
        expect(res.body.profile.id).toBeDefined();

        id = res.body.profile.id;
    });

    test('create profile with existing email', async () => {
        // given
        const username = 'AppTest2';

        // when
        const res = await request(app).post('/signup').send({ email, password, username, role, bio });

        // then
        expect(res.status).toEqual(400);
        expect(res.body.status).toEqual('application error');
        expect(res.body.message).toEqual('Email already exists');
    });

    test('create profile with existing username', async () => {
        // given
        const email = '@app.test2.ts';

        // when
        const res = await request(app).post('/signup').send({ email, password, username, role, bio });

        // then
        expect(res.status).toEqual(400);
        expect(res.body.status).toEqual('application error');
        expect(res.body.message).toEqual('Username already exists');
    });

    test('authenticate', async () => {
        // when
        const res = await request(app).post('/signin').send({ email, password });

        // then
        expect(res.status).toEqual(200);
        expect(res.body.message).toEqual('authentication successful');
        expect(res.body.token).toBeDefined();

        token = res.body.token;
    });

    test('get profile by id', async () => {
        // when
        const res = await request(app).get(`/profiles/${id}`).set('Authorization', `Bearer ${token}`);

        // then
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.message).toEqual('profile found');
        expect(res.body.profile.id).toEqual(id);
        expect(res.body.profile.email).toEqual(email);
        expect(await comparePasswordWithHash(password, res.body.profile.password)).toEqual(true);
        expect(res.body.profile.username).toEqual(username);
        expect(res.body.profile.role).toEqual(role);
        expect(res.body.profile.bio).toEqual(bio);
        expect(res.body.profile.createdAt).toBeDefined();
        expect(res.body.profile.latestActivity).toBeDefined();
    });

    test('get profile by id with invalid token', async () => {
        // when
        const res = await request(app).get(`/profiles/${id}`).set('Authorization', `Bearer ${token}invalid`);

        // then
        expect(res.status).toEqual(401);
        expect(res.body.status).toEqual('unauthorized');
    });

    test('get profile by id with no token', async () => {
        // when
        const res = await request(app).get(`/profiles/${id}`);

        // then
        expect(res.status).toEqual(401);
        expect(res.body.status).toEqual('unauthorized');
        expect(res.body.message).toEqual('No authorization token was found');
    });

    test('update profile', async () => {
        // when
        const res = await request(app).put(`/profiles/${id}`).set('Authorization', `Bearer ${token}`).send({
            bio: updatedBio,
            email: updatedEmail,
            password: updatedPassword,
            role: updatedRole,
            username: updatedUsername,
        });

        // then
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.message).toEqual('profile updated');
        expect(res.body.updatedProfile.bio).toEqual(updatedBio);
        expect(res.body.updatedProfile.email).toEqual(updatedEmail);
        expect(await comparePasswordWithHash(updatedPassword, res.body.updatedProfile.password)).toEqual(true);
        expect(res.body.updatedProfile.role).toEqual(updatedRole);
        expect(res.body.updatedProfile.username).toEqual(updatedUsername);
        expect(res.body.updatedProfile.id).toEqual(id);
    });

    test('delete profile', async () => {
        // when
        const res = await request(app).delete(`/profiles/${id}`).set('Authorization', `Bearer ${token}`);

        // then
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.message).toEqual('profile deleted');
        expect(res.body.deletedProfile.bio).toEqual(updatedBio);
        expect(res.body.deletedProfile.email).toEqual(updatedEmail);
        expect(await comparePasswordWithHash(updatedPassword, res.body.deletedProfile.password)).toEqual(true);
        expect(res.body.deletedProfile.role).toEqual(updatedRole);
        expect(res.body.deletedProfile.username).toEqual(updatedUsername);
        expect(res.body.deletedProfile.id).toEqual(id);
    });
});
