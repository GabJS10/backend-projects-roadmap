# Weather API Wrapper Service

This project is a Weather API Wrapper Service built using NestJS. It provides a simple and efficient way to fetch weather data for a given city, with built-in caching mechanisms to improve performance and reduce API calls to the external weather service.

## Features

- **City-based Weather Data**: Fetch weather information for any city by making a simple GET request.
- **Caching**: Utilizes both in-memory and Redis-based caching to store weather data, reducing the need for repeated API calls.
- **Error Handling**: Proper error handling for invalid city names or API failures.
- **Configuration**: Environment variables for easy configuration of the API key and other settings.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Cache Manager**: For managing caching layers, including in-memory and Redis stores.
- **Redis**: Used as a persistent cache store to improve performance and reduce latency.
- **Fetch API**: For making HTTP requests to the external weather API.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/weather-api-wrapper-service.git
   cd weather-api-wrapper-service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```
   WEATHER_API=your_weather_api_key
   REDIS_URL=redis://localhost:6379
   ```

4. Run the application:
   ```bash
   npm run start
   ```

## API Endpoints

### Get Weather by City

- **Endpoint**: `GET /weather/:city`
- **Description**: Fetches weather data for the specified city.
- **Example Request**:
  ```bash
   GET /weather/london
  ```
- **Example Response**:
  ```json
  {
    "resolvedAddress": "London, UK",
    "timezone": "Europe/London",
    "description": "Cloudy with a chance of rain",
    "currentConditions": {
      "temp": 15,
      "feelslike": 14,
      "humidity": 75
    }
  }
  ```

## Caching Strategy

The service uses a two-layer caching strategy:

1. **In-Memory Cache**: Stores data temporarily in memory for quick access.
2. **Redis Cache**: Persists data in a Redis store for longer-term caching and shared access across multiple instances.

Cached data is set to expire after a specified time-to-live (TTL) to ensure fresh data is fetched periodically.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the [roadmap.sh](https://roadmap.sh/projects/weather-api-wrapper-service) project guide.
- Thanks to the NestJS community for their excellent documentation and support.
