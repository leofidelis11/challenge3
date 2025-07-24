const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('POST /forgot-password', ()=> {

    it('Should return status 200 and "password reset" message if valid email is provided', async ()=> {
        const response = await request(process.env.BASE_URL)
        .post('/forgot-password')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
            email: 'grace@example.com'
        }));
        
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Password reset. Your new password is \"newpassword\".');
    });

    it('Should return status 404 and "email not found" message if invalid email is provided', async ()=> {
        const response = await request(process.env.BASE_URL)
        .post('/forgot-password')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
            email: 'invalidemail@example.com'
        }));
        
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('Email not found');
    });
});