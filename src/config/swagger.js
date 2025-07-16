// src/config/swagger.js

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerSpec = swaggerJsdoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Login API',
      version: '1.0.0',
      description: 'A simple login API for testing purposes',
    },
  },
  apis: ['./src/routes/*.js'], // Point to route files for documentation
});

module.exports = {
  swaggerUi,
  swaggerSpec,
}; 