// src/controllers/passwordController.js

const passwordService = require('../services/passwordService');

const forgotPassword = (req, res) => {
  const { email } = req.body;
  const result = passwordService.recoverPassword(email);
  return res.status(result.status).json({ message: result.message });
};

module.exports = {
  forgotPassword,
}; 