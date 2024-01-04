import fs from 'fs';
import request from 'supertest';
import app from '../../app';
import profileService from '../../service/profile.service';

const profileEmail = 'satoshi@tistudent.com';
const profilePassword = 'Str0ngPW!!!';

const testFilePath = __dirname + '/USED-FOR-TESTING.pdf';
const uploadedTestFilePath = __dirname + '/../../uploads/USED-FOR-TESTING.pdf';

let token: string;

beforeAll(async () => {
    const auth = await profileService.authenticate(profileEmail, profilePassword);
    token = auth.token;
});

describe('test file endpoints', () => {
    it('should upload a file', async () => {
        const res = await request(app)
            .post('/files')
            .set('Authorization', `Bearer ${token}`)
            .attach('file', testFilePath);

        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.message).toEqual('File uploaded successfully');
        expect(fs.existsSync(uploadedTestFilePath)).toEqual(true);
    });

    it('should download a file', async () => {
        const res = await request(app).get('/files/USED-FOR-TESTING.pdf').set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(200);
    });

    it('should delete a file', async () => {
        const res = await request(app).delete('/files/USED-FOR-TESTING.pdf').set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('success');
        expect(res.body.message).toEqual('File deleted successfully');
        expect(fs.existsSync(uploadedTestFilePath)).toEqual(false);
    });
});
