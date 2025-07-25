const {loginWith} = require('./helpers/login')
const {recoverPassword} = require('./helpers/forgot-password')
const {validateMessage} = require('./helpers/common')

describe('POST /login', ()=> {

    it('Should allow login with valid credentials and return status 200', async ()=> {
        const response = await loginWith('alice', 'password123');

        validateMessage(response, 200, 'Login successful');
    });

    it('Should return 401 if invalid username is provided', async ()=> {
        const response = await loginWith('username', 'qwerty456');

        validateMessage(response, 401, 'Invalid username or password');
    });

    it('Should return 401 if invalid password is provided', async ()=> {
        const response = await loginWith('cakrol', 'wrongpassword');

        validateMessage(response, 401, 'Invalid username or password');
    });

    it('Should return 423 if login with invalid password is attempted three times', async ()=> {
        await loginWith('dave', 'wrongpassword');
        await loginWith('dave', 'wrongpassword');
        const response = await loginWith('dave', 'wrongpassword');

        validateMessage(response, 423, 'Account is blocked due to too many failed attempts');
    });

    it('Should return 401 if empty username is provided', async ()=> {
        const response = await loginWith('', 'evepass123');

        validateMessage(response, 401, 'Invalid username or password');
    });

    it('Should return 401 if empty password is provided', async ()=> {
        const response = await loginWith('frank', '');

        validateMessage(response, 401, 'Invalid username or password');
    });

    it('Should allow login after password recovered and return status 200', async ()=> {
        let newPassword = await recoverPassword('heidi@example.com');

        const response = await loginWith('heidi', newPassword);

        validateMessage(response, 200, 'Login successful');
    })
});