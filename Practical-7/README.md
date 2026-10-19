# Practical 7: Authentication and Authorization Using JWT

## Objective
To implement authentication and authorization in a Task Management application using JSON Web Tokens (JWT).

## Features
- User registration and login
- Password hashing using bcrypt
- JWT token generation and verification
- Protected task API routes
- Input validation and error handling
- Frontend login and registration pages
- Automatic redirection to the login page when authentication is required
- Logout functionality

## Technologies Used
- React.js
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt

## Project Structure
```text
Practical-7/
├── backend/
└── frontend/
```

## How to Run

### Backend
1. Open a terminal in the backend folder.
2. Install dependencies using `npm install`.
3. Configure the required environment variables in `.env`.
4. Start the server using `node server.js`.

### Frontend
1. Open another terminal in the frontend folder.
2. Install dependencies using `npm install`.
3. Start the application using `npm run dev`.

## Testing
The application can be tested using Thunder Client for registration, login, protected task operations, and authentication error handling.

## Security
- Passwords are hashed before storage.
- Protected routes require a valid JWT.
- Environment variables and secrets should not be committed to GitHub.