# Todo List API

This project is a **Todo List API** built using **NestJS**, **Prisma**, and **JWT Authentication**. It provides endpoints for managing user authentication (login, register, logout) and todo items (create, read, update, delete). The API is designed to be scalable, secure, and easy to use.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [API Endpoints](#api-endpoints)
6. [Authentication](#authentication)
7. [Contributing](#contributing)
8. [License](#license)

---

## Features

- **User Authentication**:

  - Register new users.
  - Login with email and password.
  - Logout functionality.
  - JWT-based access and refresh tokens for secure sessions.

- **Todo Management**:

  - Create, read, update, and delete todos.
  - Search todos by title or description.
  - Pagination support for listing todos.

- **Validation**:

  - Input validation using `class-validator`.
  - Whitelisting and transforming incoming requests.

- **Security**:
  - Passwords are hashed using `bcrypt`.
  - JWT tokens for secure authentication.
  - Environment variable validation using `Joi`.

---

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Prisma**: A modern database toolkit for Node.js and TypeScript.
- **JWT (JSON Web Tokens)**: For secure user authentication and session management.
- **Bcrypt**: For hashing and verifying passwords.
- **Joi**: For environment variable validation.
- **Class-validator**: For request payload validation.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/todo-list-api.git
   cd todo-list-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   - Update the `.env` file with your database connection string.
   - Run Prisma migrations:
     ```bash
     npx prisma migrate dev
     ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000`.

---

## Configuration

Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
PORT=3000
```

You can validate the environment variables using the `envSchema` defined in the codebase.

---

## API Endpoints

### Authentication

- **POST /auth/register**

  - Register a new user.
  - Body: `{ email: string, name: string, password: string }`

- **POST /auth/login**

  - Login with email and password.
  - Body: `{ email: string, password: string }`
  - Response: `{ accessToken: string, refreshToken: string }`

- **POST /auth/logout**

  - Logout the current user.
  - Requires authentication.

- **POST /auth/refresh-token**
  - Refresh the access token using the refresh token.
  - Body: `{ refreshToken: string }`
  - Response: `{ accessToken: string, refreshToken: string }`

### Todos

- **POST /todos**

  - Create a new todo.
  - Body: `{ title: string, description: string, userId: number }`

- **GET /todos**

  - Get all todos with pagination.
  - Query Params: `page` (default: 1), `limit` (default: 10)

- **GET /todos/search**

  - Search todos by title or description.
  - Query Params: `query`, `page` (default: 1), `limit` (default: 10)

- **GET /todos/:id**

  - Get a todo by ID.
  - Path Param: `id`

- **PATCH /todos/:id**

  - Update a todo by ID.
  - Body: `{ title?: string, description?: string }`

- **DELETE /todos/:id**
  - Delete a todo by ID.

---

## Authentication

This API uses **JWT (JSON Web Tokens)** for authentication. After registering or logging in, the user receives an `accessToken` and a `refreshToken`. The `accessToken` is used for authenticated requests, while the `refreshToken` is used to obtain a new `accessToken` when it expires.

- **Access Token**: Short-lived (2 minutes).
- **Refresh Token**: Long-lived (7 days).

To authenticate requests, include the `Authorization` header with the `Bearer` token:

```http
Authorization: Bearer <access_token>
```

---

## Contributing

We welcome contributions! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request with a detailed description of your changes.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---
