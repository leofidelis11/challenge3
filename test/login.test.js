const request = require('supertest');
const { expect } = require('chai');
const {recoverPassword} = require('./helpers/recover-password')
require('dotenv').config();

describe('POST /login', ()=> {

    it('Should allow login with valid credentials and return status 200', async ()=> {
        const response = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
            username: 'alice',
            password: 'password123'
        }));
        
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Login successful');
    });

    it('Should return 401 if invalid username is provided', async ()=> {
        const response = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
            username: 'username',
            password: 'qwerty456'
        }));

        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Invalid username or password');
    });

    it('Should return 401 if invalid password is provided', async ()=> {
        const response = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
            username: 'carol',
            password: 'wrongpassword'
        }));

        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Invalid username or password');
    });

    it('Should return 423 if login with invalid password is attempted three times', async ()=> {
            const loginAttempt = async ()=> {
            return await request(process.env.BASE_URL)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({
                username: 'dave',
                password: 'wrongpassword'  
            }));
        }
        
        await loginAttempt();
        await loginAttempt();
        const response = await loginAttempt();

        expect(response.status).to.equal(423);
        expect(response.body.message).to.equal('Account is blocked due to too many failed attempts');
    });

    it('Should return 401 if empty username is provided', async ()=> {
        const response = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
            username: '',
            password: 'evepass123'
        }));

        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Invalid username or password');
    });

    it('Should return 401 if empty password is provided', async ()=> {
        const response = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
            username: 'frank',
            password: ''
        }));

        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Invalid username or password');
    });

    it('Should allow login after password recovered and return status 200', async ()=> {
        let newPassword = await recoverPassword('heidi@example.com')
        
        const response = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
            username: 'heidi',
            password: newPassword
        }));

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Login successful');
    })
});
