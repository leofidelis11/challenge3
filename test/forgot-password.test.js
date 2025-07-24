const {validateMessage} = require('./helpers/common')
const {forgotPassword} = require('./helpers/forgot-password')

describe('POST /forgot-password', ()=> {

    it('Should return status 200 and password changed message if valid email is provided', async ()=> {
        const response = await forgotPassword('grace@example.com');
        
        validateMessage(response, 200, 'Password reset. Your new password is \"newpassword\".');
    });

    it('Should return status 404 and email not found message if invalid email is provided', async ()=> {
        const response = await forgotPassword('invalidemail@example.com');
        
        validateMessage(response, 404, 'Email not found');
    });
});