# Expense Tracker API

## Overview

The Expense Tracker API is a NestJS-based application designed to help users manage their expenses efficiently. It provides functionalities for creating, updating, deleting, and filtering expenses, as well as user authentication and authorization.

## Features

- **User Authentication**: Secure login and registration with JWT tokens.
- **Expense Management**:
  - Create, update, and delete expenses.
  - Filter expenses by date ranges (past week, past month, last 3 months, or custom range).
- **Category Management**: Predefined categories for organizing expenses.
- **Error Handling**: Comprehensive error handling with custom exceptions and global filters.
- **Validation**: Input validation using `class-validator` and `ValidationPipe`.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Prisma**: A modern database toolkit for Node.js and TypeScript.
- **PostgreSQL**: The relational database used for storing application data.
- **JWT**: JSON Web Tokens for secure authentication.
- **Day.js**: A lightweight library for date manipulation.
- **Joi**: For environment variable validation.

## Project Structure

- **`src/`**: Contains the main application code.
  - **`auth/`**: Handles user authentication and authorization.
  - **`expenses/`**: Manages expense-related operations.
  - **`prisma/`**: Prisma schema and database migrations.
  - **`exceptions/`**: Custom exception classes.
  - **`filters/`**: Global exception filters.
  - **`app.module.ts`**: The root module of the application.
  - **`main.ts`**: The entry point of the application.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```env
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_token_secret
   PORT=3000
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Seed the database with default categories:

   ```bash
   npx prisma db seed
   ```

6. Start the application:

   ```bash
   npm run start
   ```

## API Endpoints

### Authentication

- **POST `/auth/register`**

  - Register a new user.
  - Body: `{ email: string, name: string, password: string }`

- **POST `/auth/login`**

  - Login an existing user.
  - Body: `{ email: string, password: string }`

- **POST `/auth/logout`**

  - Logout the current user.

- **POST `/auth/refresh-token`**
  - Refresh the access token.
  - Body: `{ refreshToken: string }`

### Expenses

- **POST `/expenses`**

  - Create a new expense.
  - Body: `{ description: string, amount: number, categoryId: number, expenseDate: Date }`

- **GET `/expenses`**

  - Get all expenses for the authenticated user.
  - Query Params:
    - `filter`: `'past_week' | 'past_month' | 'last_3_months' | 'custom'`
    - `start_date`: (Required for `custom` filter)
    - `end_date`: (Required for `custom` filter)

- **PATCH `/expenses/:id`**

  - Update an existing expense.
  - Body: Partial expense data.

- **DELETE `/expenses/:id`**
  - Delete an expense.

## Error Handling

The API uses custom exceptions to handle errors consistently. Common exceptions include:

- `ValidationException`: For input validation errors.
- `EntityNotFoundException`: When a resource is not found.
- `PermissionDeniedException`: When a user does not have permission to perform an action.
- `DatabaseException`: For unexpected database errors.

## Testing

To run the tests:

```bash
npm run test
```

## Deployment

The application can be deployed to any cloud provider that supports Node.js. Ensure that the environment variables are correctly configured in the deployment environment.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
