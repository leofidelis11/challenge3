// src/services/authService.js

const {
  findUserByUsername,
  resetFailedAttempts,
  blockUser,
} = require('../models/userModel');

function authenticate(username, password) {
  const user = findUserByUsername(username);
  if (!user) {
    return { status: 401, message: 'Invalid username or password' };
  }
  if (user.blocked) {
    return { status: 423, message: 'Account is blocked due to too many failed attempts' };
  }
  if (user.password === password) {
    resetFailedAttempts(user);
    return { status: 200, message: 'Login successful' };
  } else {
    user.failedAttempts += 1;
    if (user.failedAttempts >= 3) {
      blockUser(user);
      return { status: 423, message: 'Account is blocked due to too many failed attempts' };
    }
    return { status: 401, message: 'Invalid username or password' };
  }
}

module.exports = {
  authenticate,
}; 