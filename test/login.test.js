const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('POST /login', ()=> {

    it('Should allows login with valid credentials and return status 200', async ()=> {
        const response = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
            username: 'alice',
            password: 'password123'
        }));
        
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Login successful');
    })

    it('Should return 401 if invalid username is provided', async ()=> {
        const response = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
            username: 'username',
            password: 'password123'
        }));

        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Invalid username or password');
    })

    it('Should return 401 if invalid password is provided', async ()=> {
        const response = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
            username: 'alice',
            password: 'wrongpassword'
        }));

        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal('Invalid username or password');
    })
})
