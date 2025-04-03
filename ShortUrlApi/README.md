# ShortURL Service

## Overview

ShortURL Service is a URL shortening API built with NestJS and MongoDB. This service allows users to shorten URLs, retrieve original URLs using a shortcode, update shortened URLs, and delete them when no longer needed.

## Features

- Create short URLs with unique shortcodes
- Retrieve original URLs by providing the shortcode
- Update shortened URLs
- Delete shortened URLs
- Tracks access count for each shortened URL

## Technologies Used

- **NestJS** - Backend framework
- **MongoDB** - NoSQL database for storing URLs
- **Mongoose** - ODM for MongoDB
- **ConfigModule** - Configuration management
- **NanoID** - Unique ID generator for shortcodes

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/shorturl-service.git
   cd shorturl-service
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the environment variables in a `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the server:
   ```sh
   npm run start
   ```

## API Endpoints

### 1. Create a Short URL

**POST** `/shorturl`

- **Body:**
  ```json
  {
    "url": "https://example.com"
  }
  ```
- **Response:**
  ```json
  {
    "shortCode": "abc123",
    "url": "https://example.com"
  }
  ```

### 2. Retrieve Original URL

**GET** `/shorturl/:shortcode`

- **Response:**
  ```json
  {
    "shortCode": "abc123",
    "url": "https://example.com",
    "accessCount": 5
  }
  ```

### 3. Update a Shortened URL

**PATCH** `/shorturl/:shortcode`

- **Body:**
  ```json
  {
    "url": "https://updated-example.com"
  }
  ```
- **Response:**
  ```json
  {
    "shortCode": "abc123",
    "url": "https://updated-example.com"
  }
  ```

### 4. Delete a Shortened URL

**DELETE** `/shorturl/:shortcode`

- **Response:**
  ```json
  {
    "message": "URL deleted successfully"
  }
  ```

## License

This project is licensed under the MIT License.
