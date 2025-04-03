# E-Commerce API

## Overview

This project is an E-Commerce API built using **NestJS**, **PostgreSQL** with **Prisma ORM**, and the **Repository Pattern** for modular and maintainable architecture. The API includes authentication, product management, cart handling, order processing, and payment integration.

## Features

- **Authentication & Authorization** (JWT & Refresh Token)
- **Product Management** (CRUD for products with image upload)
- **Shopping Cart** (Add, remove, and view cart items)
- **Order Processing** (Create and manage orders)
- **Payment Integration** (Stripe Webhooks for payment processing)
- **Role-based Access Control**

## Technologies Used

- **NestJS** (Modular framework for scalable Node.js applications)
- **PostgreSQL** (Relational database)
- **Prisma ORM** (For database management)
- **Passport.js** (For authentication)
- **Stripe API** (For handling payments)
- **Multer** (For image file uploads)

## Installation

### Prerequisites

- Node.js (v16+)
- PostgreSQL

### Setup

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd e-commerce-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file and configure database and Stripe credentials.
   - Example:
     ```env
     DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce
     JWT_SECRET=your_secret_key
     STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
     ```
4. Run database migrations:
   ```sh
   npx prisma migrate dev --name init
   ```
5. Start the development server:
   ```sh
   npm run start:dev
   ```

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive tokens
- `POST /auth/logout` - Logout user
- `POST /auth/refresh-token` - Refresh JWT token

### Products

- `GET /products` - Get all products
- `GET /products/:id` - Get a single product
- `POST /products` - Create a new product (Admin only)
- `POST /products/:id` - Update product details (Admin only)
- `DELETE /products/:id` - Delete a product (Admin only)

### Cart

- `GET /cart` - View cart items
- `POST /cart/addToCart` - Add an item to the cart
- `DELETE /cart/removeFromCart` - Remove an item from the cart

### Orders

- `POST /orders` - Create a new order

### Payment

- `POST /payment/webhook` - Stripe webhook handler

## Usage

- Register a user via `/auth/register`
- Login to receive a JWT token via `/auth/login`
- Use the token to access protected routes (e.g., cart, orders)
- Admin users can manage products via the `/products` endpoints

## License

MIT
