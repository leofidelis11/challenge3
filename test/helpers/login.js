const request = require('supertest');
require('dotenv/config');

const loginWith = async (username, password) => {
    const response = await request(process.env.BASE_URL)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({
                username: username,
                password: password
    }));
    return response;
}

module.exports = { 
    loginWith
}