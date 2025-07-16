// src/controllers/authController.js

const authService = require('../services/authService');

const login = (req, res) => {
  const { username, password } = req.body;
  const result = authService.authenticate(username, password);
  return res.status(result.status).json({ message: result.message });
};

module.exports = {
  login,
}; 