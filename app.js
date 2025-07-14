const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(bodyParser.json());

// Swagger setup (details to be filled in later)
const swaggerSpec = swaggerJsdoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Login API',
      version: '1.0.0',
      description: 'A simple login API for testing purposes',
    },
  },
  apis: ['./app.js'],
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// In-memory user data (to be loaded from seed file)
let users = require('./seed');

// Helper: find user by username
function findUser(username) {
  return users.find(u => u.username === username);
}

// Helper: reset failed attempts
function resetFailedAttempts(user) {
  user.failedAttempts = 0;
}

// Helper: block user
function blockUser(user) {
  user.blocked = true;
}

// Login endpoint
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login with username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       423:
 *         description: Account blocked
 */
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = findUser(username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  if (user.blocked) {
    return res.status(423).json({ message: 'Account is blocked due to too many failed attempts' });
  }
  if (user.password === password) {
    resetFailedAttempts(user);
    return res.status(200).json({ message: 'Login successful' });
  } else {
    user.failedAttempts += 1;
    if (user.failedAttempts >= 3) {
      blockUser(user);
      return res.status(423).json({ message: 'Account is blocked due to too many failed attempts' });
    }
    return res.status(401).json({ message: 'Invalid username or password' });
  }
});

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
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ message: 'Email not found' });
  }
  // For demo: reset password to 'newpassword' and unblock
  user.password = 'newpassword';
  user.blocked = false;
  resetFailedAttempts(user);
  return res.status(200).json({ message: 'Password recovery instructions sent to user email.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
}); 