# TaskManager

A NodeJS exercise.
This is a sample Node.js application that demonstrates a CRUD API using Express.js and MySQL. It provides endpoints for managing users and tasks, and performs various operations on the data, including combining data from multiple tables and integrating with an external API.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/yaelshrem/workspace/my-workspace/collection/11271418-919f76b0-4673-42c4-8ba1-cacd4a52113a?action=share&creator=11271418D)

## Prerequisites

Before running the application, ensure that you have the following installed on your machine:
- Node.js (version 14 or later)
- MySQL (either a local installation or access to a remote MySQL server)

## Getting Started

Follow the steps below to set up and run the project:

1. Clone the repository, Install the dependencies, Run the Application:

   ```shell
   git clone https://github.com/yaelshrem/taskmanager.git
   cd taskmanager
   cd server
   npm install
   npm start

Make sure to configure the MySQL Connection details:
Update the DB_HOST, DB_USER, DB_PASSWORD, and DB_DATABASE fields in the .env file with your MySQL connection details.

The application should now be running. You can access the API endpoints using the base URL http://localhost:8080.

## API Documentation
The API provides the following endpoints:

Users:
GET /users - Retrieve all users
GET /users/:id - Retrieve a specific user by ID
POST /users - Create a new user
PUT /users/:id - Update an existing user
DELETE /users/:id - Delete a user

Tasks:
GET /tasks - Retrieve all tasks
GET /tasks/:id - Retrieve a specific task by ID
POST /tasks - Create a new task
PUT /tasks/:id - Update an existing task
DELETE /tasks/:id - Delete a task
Refer to the source code for more details on the API endpoints and their implementation.


## Additional Notes
The application integrates with an external API to generate an image based on the first word of the task title. The image is saved locally and the path is stored in the task record.

Proper security measures, such as parameterized queries, have been implemented to prevent SQL injections.

The docker-compose.yml file provided in the repository allows you to run the application along with a MySQL container. Instructions for Dockerizing and deploying the application are not covered in this README.

Feel free to explore the code and modify it according to your needs. If you have any questions or encounter any issues, please don't hesitate to contact me:)
