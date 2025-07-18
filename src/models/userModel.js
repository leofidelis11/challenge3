// src/models/userModel.js

const { users } = require('../config/database');

function findUserByUsername(username) {
  return users.find(u => u.username === username);
}

function findUserByEmail(email) {
  return users.find(u => u.email === email);
}

function resetFailedAttempts(user) {
  user.failedAttempts = 0;
}

function blockUser(user) {
  user.blocked = true;
}

module.exports = {
  users,
  findUserByUsername,
  findUserByEmail,
  resetFailedAttempts,
  blockUser,
}; 