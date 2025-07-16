// src/routes/passwordRoutes.js

const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Request password recovery
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password recovery instructions sent
 *       404:
 *         description: Email not found
 */
router.post('/forgot-password', passwordController.forgotPassword);

module.exports = router; 