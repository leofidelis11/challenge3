# Challenge3: Simple Login REST API

This project is a simple REST API for a login page, built with Express (JavaScript). It is designed for learning software testing and does not use a database; all data is stored in memory.

## Features
- Login with username and password
- Invalid login handling
- Block user after 3 failed login attempts
- Forgot password (password recovery)
- In-memory user storage (no database)
- Swagger documentation at `/api-docs`

## Used Technologies
- **Node.js**: JavaScript runtime
- **Express**: Web framework for Node.js
- **Swagger (swagger-ui-express, swagger-jsdoc)**: API documentation
- **body-parser**: Middleware for parsing JSON requests

## Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)

### Installation
1. Clone this repository or download the source code.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run rest-api
   ```

The server will run on [http://localhost:3000](http://localhost:3000) by default.

## API Endpoints

### POST `/login`
- **Request Body:**
  ```json
  {
    "username": "alice",
    "password": "password123"
  }
  ```
- **Responses:**
  - `200 OK`: Login successful
  - `401 Unauthorized`: Invalid credentials
  - `423 Locked`: Account blocked after 3 failed attempts

### POST `/forgot-password`
- **Request Body:**
  ```json
  {
    "email": "alice@example.com"
  }
  ```
- **Responses:**
  - `200 OK`: Password reset (new password is always `newpassword` for demo)
  - `404 Not Found`: Email not found

## Swagger Documentation

Interactive API docs are available at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Repository Structure

```
challenge3/
├── src/
│   ├── app.js
│   ├── config/
│   │   ├── database.js
│   │   └── swagger.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── passwordController.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── passwordRoutes.js
│   ├── services/
│   │   ├── authService.js
│   │   └── passwordService.js
│   ├── middleware/
│   │   └── errorHandler.js
│   └── utils/
│       └── validators.js
├── data/
│   └── seed.js
├── package.json
├── README.md
└── server.js
```

## Purpose of Each File Group

- **src/app.js**: Main Express app setup, loads routes, middleware, and Swagger config.
- **src/config/**: Configuration files.
  - `database.js`: Exports the in-memory users array (can be replaced with a real database in the future).
  - `swagger.js`: Swagger/OpenAPI configuration for API docs.
- **src/controllers/**: Handle HTTP requests and responses.
  - `authController.js`: Handles login requests.
  - `passwordController.js`: Handles forgot-password requests.
- **src/models/**: Data models and data access logic.
  - `userModel.js`: User data structure and operations.
- **src/routes/**: API route definitions.
  - `authRoutes.js`: Login route(s).
  - `passwordRoutes.js`: Forgot-password route(s).
- **src/services/**: Business logic for each domain.
  - `authService.js`: Login logic, failed attempts, blocking.
  - `passwordService.js`: Password recovery logic.
- **src/middleware/**: Express middleware.
  - `errorHandler.js`: Centralized error handling.
- **src/utils/**: Utility functions and helpers.
  - `validators.js`: Input validation utilities (placeholder).
- **data/seed.js**: In-memory user data loaded at startup.
- **server.js**: Starts the Express server.

## Seeding Users

The API loads four users from `data/seed.js` at startup. You can modify this file to change the initial users.

## Notes
- All data is reset when the server restarts.
- This project is for educational/testing purposes only. 