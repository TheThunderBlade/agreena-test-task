import db from '../models';
import createServer from '../app';
import supertest from "supertest";

const app = createServer();
let AT = '';
let cookie = '';

describe('Test API', () => {
    beforeAll(async () => {
        await db.sequelize.sync();
    });
    afterAll(async () => {
        await db.sequelize.close();
    });

    describe('Registration', () => {
       it('should return 200', async () => {
           const registrationData = {
               Email: 'SomeEmail1@gmail.com',
               Password: '123456bb',
               UserName: 'SomeUser1',
           };
           const response = await supertest(app)
               .post('/api/signUp')
               .send(registrationData);
           expect(response.statusCode).toBe(200);
       });

        it('should return 500', async () => {
            const registrationData = {
                UserName: 'TestUser1',
                Email: 'TUser1@gmail.com',
                Password: '123456bb',
            };
            const response = await supertest(app)
                .post('/api/signUp')
                .send(registrationData);
            expect(response.statusCode).toBe(500);
        });
    });

    describe('Login', () => {
        it('should return 200', async () => {
            const loginData = {
                Password: '123456bb',
                UserName: 'TestUser2',
            };
            const response = await supertest(app)
                .post('/api/signIn')
                .send(loginData);
            AT = response.body.Token;
            cookie = response.header['set-cookie'];
            console.log('refresh cookie', cookie);
            expect(response.statusCode).toBe(200);
        });

        it('should return 500', async () => {
            const loginData = {
                Password: '123456bb',
                UserName: 'NotExistingUser',
            };
            const response = await supertest(app)
                .post('/api/signIn')
                .send(loginData);
            expect(response.statusCode).toBe(500);
        });
    });

    describe('Get Owned Certificates', () => {
        it('should return 200', async () => {
            const response = await supertest(app)
                .get('/api/getOwnedCertificates')
                .set({ 'x-access-token': AT });
            expect(response.statusCode).toBe(200);
        });
    });

    describe('Get Available Certificates', () => {
        it('should return 200', async () => {
            const response = await supertest(app)
                .get('/api/getAvailableCertificates')
                .set({ 'x-access-token': AT });
            expect(response.statusCode).toBe(200);
        });
    });


    describe('Transfer My Certificate', () => {
        it('should return 200', async () => {
            const transferData = {
                anotherUserId: 7,
                CertificateId: 97,
            }
            const response = await supertest(app)
                .post('/api/transferMyCertificate')
                .send(transferData)
                .set({ 'x-access-token': AT })
            expect(response.statusCode).toBe(200);
        });
    });
});
