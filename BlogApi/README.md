# Blogging Platform API

## Overview

The Blogging Platform API is a RESTful service built with NestJS and MongoDB. It provides functionalities for creating, retrieving, updating, and deleting blog posts. The API also supports searching for blog posts by title, content, or category.

## Features

- Create blog posts with a title, content, category, and tags.
- Retrieve all blog posts or search for posts by a term.
- Retrieve, update, and delete specific blog posts by title.
- Input validation using class-validator.
- Environment configuration using @nestjs/config and Joi.
- MongoDB integration using Mongoose.
- Repository pattern for database interactions.

## Tech Stack

- **Backend Framework**: NestJS
- **Database**: MongoDB with Mongoose
- **Validation**: class-validator
- **Configuration Management**: @nestjs/config & Joi

## Installation

### Prerequisites

- Node.js (Latest LTS recommended)
- MongoDB instance

### Steps

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd blogging-platform-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/blogging-db
   ```
4. Run the application:
   ```sh
   npm run start
   ```

## API Endpoints

### Base URL

```
http://localhost:3000/api/blog-api
```

### Blog Routes

| Method | Endpoint               | Description                   |
| ------ | ---------------------- | ----------------------------- |
| POST   | `/`                    | Create a new blog post        |
| GET    | `/`                    | Retrieve all blog posts       |
| GET    | `/search?term=<query>` | Search blog posts by term     |
| GET    | `/:title`              | Retrieve a blog post by title |
| PATCH  | `/:title`              | Update a blog post by title   |
| DELETE | `/:title`              | Delete a blog post by title   |

## Data Model

### Blog Post

```json
{
  "title": "Example Blog Post",
  "content": "This is a sample blog post.",
  "category": "Technology",
  "tags": ["tech", "programming"],
  "createdAt": "2024-02-07T12:00:00Z",
  "updatedAt": "2024-02-07T12:00:00Z"
}
```

## License

This project is licensed under the MIT License.
