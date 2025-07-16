// src/app.js

const express = require('express');
const bodyParser = require('body-parser');
const { swaggerUi, swaggerSpec } = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(bodyParser.json());

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use(authRoutes);
app.use(passwordRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app; 