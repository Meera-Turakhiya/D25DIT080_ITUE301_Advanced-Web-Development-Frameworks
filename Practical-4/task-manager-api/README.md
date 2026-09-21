# Practical 4 - Task Manager REST API

## Advanced Web Development Frameworks

**Course:** ITUE301 - Advanced Web Development Frameworks  
**Practical:** 4  
**Technology:** Node.js and Express.js

---

## Problem Statement

Develop a Task Manager REST API using Express.js. The API should support creating, retrieving, updating, and deleting tasks. Implement middleware for request logging, JSON validation, task ID validation, error handling, and handling undefined routes.

---

## Objective

The objective of this practical is to:

- Develop a RESTful API using Express.js.
- Implement CRUD operations for tasks.
- Use Express middleware.
- Validate task IDs before processing requests.
- Validate the Content-Type of POST and PUT requests.
- Implement request logging.
- Handle undefined routes using a 404 handler.
- Handle server errors using centralized error-handling middleware.

---

## Technologies Used

- Node.js
- Express.js
- JavaScript
- Thunder Client

---

## Project Structure

```text
task-manager-api/
│
├── data/
│   └── tasks.js
│
├── middleware/
│   ├── errorHandler.js
│   ├── jsonValidator.js
│   ├── logger.js
│   └── ValidateTaskid.js
│
├── routes/
│   └── taskRoutes.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md

Features
1. Get All Tasks

Retrieves all available tasks.

Method:

GET

Endpoint:

/tasks
2. Create a Task

Creates a new task.

Method:

POST

Endpoint:

/tasks

Example Request:

{
    "title": "Learn Node.js"
}
3. Update a Task

Updates an existing task using its ID.

Method:

PUT

Endpoint:

/tasks/:id

Example Request:

{
    "title": "Learn Advanced Express",
    "completed": true
}
4. Delete a Task

Deletes an existing task using its ID.

Method:

DELETE

Endpoint:

/tasks/:id
Middleware
Logger Middleware

File:

middleware/logger.js

Logs the HTTP method, requested URL, and request time for every incoming request.

JSON Validator Middleware

File:

middleware/jsonValidator.js

Checks that POST and PUT requests contain:

Content-Type: application/json

If the required Content-Type is missing, the request returns a 400 Bad Request response.

Task ID Validation Middleware

File:

middleware/ValidateTaskid.js

Validates the task ID before the request reaches the route handler.

If an invalid ID is provided, the API returns:

{
    "error": "Invalid task ID"
}
Error Handler Middleware

File:

middleware/errorHandler.js

Handles server-side errors and returns a structured JSON response.

Example:

{
    "error": "Something went wrong"
}
API Endpoints
Method	Endpoint	Description
GET	/tasks	Retrieve all tasks
POST	/tasks	Create a new task
PUT	/tasks/:id	Update an existing task
DELETE	/tasks/:id	Delete a task
HTTP Status Codes
Status Code	Meaning
200	Request successful
201	Task successfully created
400	Invalid request
404	Task or route not found
500	Internal server error
Initial Task Data

The API starts with the following tasks:

[
    {
        "id": 1,
        "title": "Learn Express",
        "completed": false
    },
    {
        "id": 2,
        "title": "Build REST API",
        "completed": false
    },
    {
        "id": 3,
        "title": "Build Task-Manager",
        "completed": true
    }
]
Installation

Clone the repository and navigate to the Practical-4 project:

cd Practical-4/task-manager-api

Install the required dependencies:

npm install
Running the Server

Start the Express server using:

node server.js

The server runs on:

http://localhost:5000
Testing

The API can be tested using Thunder Client or any REST API testing tool.

Example:

GET http://localhost:5000/tasks

The API returns the list of available tasks in JSON format.

Supplementary Problems Implemented

The following supplementary requirements are also implemented:

Middleware to reject POST/PUT requests without Content-Type: application/json.
Route-specific middleware to validate the task ID before reaching the route handler.
A 404 handler for undefined routes that returns a structured JSON response.
Conclusion

The Task Manager REST API was successfully developed using Express.js. The practical demonstrates CRUD operations, middleware implementation, request validation, logging, error handling, and 404 route handling in a RESTful API.
