const request = require('supertest');
require('dotenv/config');

const forgotPassword = async (email) => {
    const response = await request(process.env.BASE_URL)
            .post('/forgot-password')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({
                email: email
    }));
    return response;
}

const recoverPassword = async (email) => {
        const response = await request(process.env.BASE_URL)
        .post('/forgot-password')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
            email: email
        }));
    const password = response.body.message;
    return password.slice(password.indexOf('"')+1, password.lastIndexOf('"'));
}

module.exports = {
    forgotPassword,
    recoverPassword
}