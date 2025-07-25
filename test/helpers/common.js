const { expect } = require('chai');

const validateMessage = (response, statusCode, message) => {

    expect(response.status).to.equal(statusCode);
    expect(response.body.message).to.equal(message);
}

module.exports = {
    validateMessage
}