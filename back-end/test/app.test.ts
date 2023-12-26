import request from 'supertest';
import app from '../app';
import { comparePasswordWithHash } from '../util/password';

describe('Test Profile Endpoints', () => {
    test('should create a new profile', async () => {
        // given
        const email = '@app.test.ts';
        const password = 'P4ssw@rd!';
        const username = 'AppTest';
        const role = 'user';
        const bio = 'Testing profile endpoint';

        // when
        const res = await request(app).post('/profiles/signup').send({ email, password, username, role, bio });

        // then
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.message).toEqual('Profile created');
        expect(res.body.user.email).toEqual(email);
        expect(await comparePasswordWithHash(password, res.body.user.password)).toEqual(true);
        expect(res.body.user.username).toEqual(username);
        expect(res.body.user.role).toEqual(role);
        expect(res.body.user.bio).toEqual(bio);
        expect(res.body.user.createdAt).toBeDefined();
        expect(res.body.user.latestActivity).toBeDefined();
        expect(res.body.user.id).toBeDefined();
    });
});
