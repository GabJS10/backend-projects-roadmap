# Real-Time Leaderboard API

This project is a backend API built with **NestJS**, **Prisma**, and **Redis** to manage user scores in competitive games. It supports real-time leaderboard ranking, user authentication, and reporting features.

## 🚀 Features

- 🔐 User authentication with JWT
- 📊 Set and update scores for games
- 🥇 Fetch Top 10 players per game
- 📌 Get a player's ranking in a leaderboard
- 📅 Generate score reports for a date range
- ⚡ Fast leaderboard operations using Redis sorted sets

## 📦 Tech Stack

- **NestJS** – Progressive Node.js framework
- **Prisma** – ORM for PostgreSQL (or other supported DBs)
- **Redis** – In-memory data store for leaderboard rankings
- **Keyv** – Unified cache interface with support for Redis & memory
- **PostgreSQL** – Main relational database (configurable)

## 🛠️ Installation

```bash
# Clone the repo
git clone https://github.com/your-username/leaderboard-api.git
cd leaderboard-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

Edit `.env` to include your PostgreSQL and Redis configuration.

## 🐳 Running with Docker

```bash
# Start Redis with Docker
docker compose up -d
```

**docker-compose.yml**

```yaml
version: '3.8'

services:
  redis:
    image: redis
    container_name: leaderboard-redis
    ports:
      - '6379:6379'
```

## 🧪 Run the project

```bash
# Run database migrations
npx prisma migrate dev

# Start the server
npm run start:dev
```

## 📮 API Endpoints

| Method | Endpoint                                  | Description                              |
| ------ | ----------------------------------------- | ---------------------------------------- |
| POST   | `/auth/signup`                            | Register a new user                      |
| POST   | `/auth/login`                             | Login and get access token               |
| POST   | `/scores/set-score`                       | Submit or update a score (auth required) |
| GET    | `/scores/get-top-10/:gameId`              | Get top 10 players                       |
| GET    | `/scores/get-my-position/:userId/:gameId` | Get rank of a user                       |
| GET    | `/scores/reports/:gameId?from=...&to=...` | Get scores between two dates             |

## 🧱 Database Schema

- **User**: id, name, email, password, refreshToken
- **Games**: id, name, description
- **Scores**: id, user_id, game_id, score, submitted_at

## 📌 Leaderboard Logic

Scores are stored in Redis sorted sets using the format:

```txt
ZADD leaderboard:<gameId> <score> user:<userId>
```

This allows constant time leaderboard queries using `ZREVRANGE`, `ZREVRANK`, etc.

## 📄 License

MIT © 2025 – \[Your Name]
