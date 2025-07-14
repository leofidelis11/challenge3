# Challenge3: Simple Login REST API

This project is a simple REST API for a login page, built with Express (JavaScript). It is designed for learning software testing and does not use a database; all data is stored in memory.

## Features
- Login with username and password
- Invalid login handling
- Block user after 3 failed login attempts
- Forgot password (password recovery)
- In-memory user storage (no database)
- Swagger documentation at `/api-docs`

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
   node app.js
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

## Seeding Users

The API loads four users from `seed.js` at startup. You can modify this file to change the initial users.

## Notes
- All data is reset when the server restarts.
- This project is for educational/testing purposes only. 