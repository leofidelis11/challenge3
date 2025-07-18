// src/services/passwordService.js

const {
  findUserByEmail,
  resetFailedAttempts,
} = require('../models/userModel');

function recoverPassword(email) {
  const user = findUserByEmail(email);
  if (!user) {
    return { status: 404, message: 'Email not found' };
  }
  // For demo: reset password to 'newpassword' and unblock
  user.password = 'newpassword';
  user.blocked = false;
  resetFailedAttempts(user);
  return { status: 200, message: 'Password reset. Your new password is "newpassword".' };
}

module.exports = {
  recoverPassword,
}; 