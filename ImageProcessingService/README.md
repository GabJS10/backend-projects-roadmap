# NestJS Image Management API

This project is a backend API built with NestJS designed for user authentication and handling image uploads, storage on AWS S3, and on-the-fly image transformations.

## Features

- **Framework:** Built with [NestJS](https://nestjs.com/) (TypeScript)
- **Authentication:** JWT-based authentication (Access & Refresh Tokens) using Passport.
  - User Registration (`/register`)
  - User Login (`/login`)
  - Secure Logout (`/logout`)
  - Token Refresh (`/refresh-token`)
  - Password Hashing using `bcrypt`.
- **Image Management:**
  - Upload images directly to an AWS S3 bucket.
  - Validation for allowed image types (JPEG, PNG).
  - Image metadata stored in the database (URL, size, type, user relation).
  - List user-specific images.
  - Retrieve details of a specific image.
- **Image Transformation:**
  - Leverages the `sharp` library for image processing.
  - Supported transformations: resize, crop, rotate, flip, format conversion, grayscale, sepia, compression, watermarking.
  - Transformed images are saved to S3 and their metadata stored.
  - Caching implemented for transformation results to improve performance.
- **Database:** Uses [Prisma](https://www.prisma.io/) ORM for database interactions. (Schema included for User and Image models).
- **Configuration:** Centralized configuration management using `@nestjs/config`, loading variables from `.env` files.
- **Validation:**
  - Environment variable validation using `joi`.
  - Request payload validation using `class-validator` and NestJS `ValidationPipe`.
- **Rate Limiting:** Implemented using `@nestjs/throttler` both globally and on specific demanding endpoints (like image transformation).
- **Caching:** Utilizes `@nestjs/cache-manager` for caching results, notably for image transformations.
- **Error Handling:** Global `HttpExceptionFilter` for consistent error responses.
- **AWS Integration:** Uses AWS SDK v3 (`@aws-sdk/client-s3`) for interacting with S3.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A running database instance compatible with Prisma (e.g., PostgreSQL, MySQL, SQLite). Set the connection string in `DATABASE_URL`.
- AWS Account with an S3 bucket configured.
- AWS Credentials (Access Key ID and Secret Access Key) with permissions to read/write to the specified S3 bucket.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and populate it with the necessary values. See the [Environment Variables](#environment-variables) section below.

4.  **Run Prisma Migrations:**
    Ensure your database server is running and the `DATABASE_URL` in your `.env` file is correct.
    ```bash
    npx prisma migrate dev
    ```
    This command will synchronize your database schema with your `schema.prisma` file and generate the Prisma Client.

## Environment Variables

Create a `.env` file in the project root and add the following variables:

```dotenv
# Database Configuration
DATABASE_URL="postgresql://user:password@host:port/database?schema=public" # Example for PostgreSQL

# JWT Configuration
JWT_SECRET="your_strong_jwt_secret_here"
JWT_REFRESH_SECRET="your_strong_jwt_refresh_secret_here"

# Application Port
PORT=3000 # Default is 3000

# AWS Configuration
AWS_ACCESS_KEY_ID="your_aws_access_key_id"
AWS_SECRET_ACCESS_KEY="your_aws_secret_access_key"
AWS_BUCKET_NAME="your_s3_bucket_name"
AWS_REGION="your_aws_region" # e.g., us-east-1
```

**Note:** Replace the placeholder values with your actual configuration details.

## Running the App

- **Development Mode (with hot-reloading):**

  ```bash
  npm run start:dev
  # or
  yarn start:dev
  ```

  The application will be available at `http://localhost:PORT` (e.g., `http://localhost:3000`).

- **Production Mode:**

  1.  Build the application:
      ```bash
      npm run build
      # or
      yarn build
      ```
  2.  Start the application:
      ```bash
      npm run start:prod
      # or
      yarn start:prod
      ```

## API Endpoints

All endpoints are prefixed with `/api`.

### Authentication (`/api/auth`)

- **`POST /register`**

  - **Description:** Registers a new user.
  - **Body:** `{ "name": "John Doe", "email": "john.doe@example.com", "password": "yourpassword" }`
  - **Response:** Success message and basic user info (id, name, email).

- **`POST /login`**

  - **Description:** Authenticates a user and returns JWT tokens.
  - **Body:** `{ "email": "john.doe@example.com", "password": "yourpassword" }`
  - **Response:** `{ "accessToken": "...", "refreshToken": "..." }`

- **`POST /logout`**

  - **Description:** Logs out the currently authenticated user by invalidating their refresh token.
  - **Auth:** Requires `Bearer` token (Access Token).
  - **Response:** Success message.

- **`POST /refresh-token`**

  - **Description:** Issues a new pair of access and refresh tokens using a valid refresh token.
  - **Body:** `{ "refreshToken": "..." }`
  - **Response:** `{ "accessToken": "...", "refreshToken": "..." }`

### Image Management (`/api/images`)

- **`POST /upload`**

  - **Description:** Uploads an image file for the authenticated user to AWS S3.
  - **Auth:** Requires `Bearer` token (Access Token).
  - **Body:** `multipart/form-data` with a field named `file` containing the image.
  - **Response:** Image metadata object (id, url, userId, type, size).

- **`GET /list`**

  - **Description:** Retrieves a list of all images uploaded by the authenticated user.
  - **Auth:** Requires `Bearer` token (Access Token).
  - **Response:** Array of image metadata objects.

- **`GET /:id`**

  - **Description:** Retrieves details for a specific image belonging to the authenticated user.
  - **Auth:** Requires `Bearer` token (Access Token).
  - **Params:** `id` (Image ID).
  - **Response:** Image metadata object.

- **`POST /transform/:id`**

  - **Description:** Applies transformations to a specific image belonging to the authenticated user. Saves the transformed image to S3 and returns its metadata. This endpoint has specific rate limits.
  - **Auth:** Requires `Bearer` token (Access Token).
  - **Params:** `id` (Original Image ID).
  - **Body:** A JSON object specifying transformations (see example below).
  - **Response:** Metadata object for the _newly created_ transformed image.
  - **Example Body:**
    ```json
    {
      "resize": { "width": 300, "height": 200 },
      "rotate": 90,
      "format": "webp",
      "grayscale": true,
      "compress": { "quality": 80 }
    }
    ```
    _(Note: Include only the transformations you need. Refer to the `sharp` library documentation for all available options and their structure)_

## Technologies Used

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [AWS SDK v3 for JavaScript (@aws-sdk/client-s3)](https://aws.amazon.com/sdk-for-javascript/)
- [Sharp](https://sharp.pixelplumbing.com/) (Image Processing)
- [Passport.js](http://www.passportjs.org/) (`passport-local`, `passport-jwt`)
- [JSON Web Token (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken)
- [bcrypt](https://www.google.com/search?q=https://github.com/kelektiv/node.bcrypt.js) (Password Hashing)
- [Multer](https://github.com/expressjs/multer) & [Multer-S3](https://github.com/badunk/multer-s3) (File Uploads)
- [Joi](https://joi.dev/) (Schema Validation)
- [@nestjs/config](https://docs.nestjs.com/techniques/configuration)
- [@nestjs/throttler](https://docs.nestjs.com/security/rate-limiting)
- [@nestjs/cache-manager](https://docs.nestjs.com/techniques/caching)
- [Node.js](https://nodejs.org/)

## Contributing

Contributions are welcome\! Please feel free to submit a Pull Request.

## License

[Specify your license here, e.g., MIT]
