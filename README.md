# Task Management API

This project is a RESTful API for managing tasks, built with TypeScript, Express, and Sequelize ORM with PostgreSQL.

## Features

- CRUD operations for tasks
- Clean architecture
- Dependency injection
- Unit and integration tests
- PostgreSQL database with Sequelize ORM

## Project Structure
```
src/
├── config/
│   └── DatabaseConfig.ts
├── models/
│   └── Task.ts
├── repositories/
│   └── TaskRepository.ts
├── services/
│   └── TaskService.ts
├── controllers/
│   └── TaskController.ts
├── routes/
│   └── TaskRoutes.ts
├── db/
│   └── sequelize.ts
├── tests/
│   ├── unit/
│   │   └── TaskService.test.ts
│   └── integration/
│       └── TaskRoutes.test.ts
└── server.ts
```

## Prerequisites

- Node.js (v20 or later)
- npm
- PostgreSQL

## Installation

1. Clone the repository:
    ```
    git clone https://github.com/yourusername/task-management-api.git
    cd task-management-api
    ```
2. Install dependencies:
    ```npm install```

3. Set up environment variables:
Create a `.env` file in the root directory and add the following:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=taskdb
PORT=3000
```



## Running the Application

To start the server:
```
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

- `POST /tasks`: Create a new task
- `GET /tasks`: Get all tasks
- `GET /tasks/:id`: Get a specific task
- `PUT /tasks/:id`: Update a task
- `DELETE /tasks/:id`: Delete a task

## Running Tests

To run all tests:
```
npm test
```


To run only unit tests:
```
npm run test:unit
```

To run only integration tests:
```
npm run test:integration
```


## Development

To start the server in development mode with hot reloading:

```
npm run dev
```


## Building the Project

To compile the TypeScript code to JavaScript: 
```
npm run build
```

The compiled code will be in the `dist` directory.