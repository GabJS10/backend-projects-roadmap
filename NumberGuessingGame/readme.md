# Number Guessing Game

This project is a command-line Number Guessing Game built with Node.js and TypeScript. The game challenges players to guess a randomly generated number between 1 and 100 within a limited number of attempts, based on the selected difficulty level.

## Features

- Four difficulty levels:
  - **Easy:** 10 attempts
  - **Medium:** 5 attempts
  - **Hard:** 3 attempts
  - **Creative:** Unlimited attempts
- Saves best attempts per difficulty level in a local database (`db.json`)
- Provides real-time feedback on guesses
- Displays elapsed time and best attempts after winning

## Installation

Ensure you have Node.js installed on your system. Then, follow these steps:

1. Clone this repository:

   ```sh
   git clone https://github.com/your-username/backend-roadmap-projects.git
   ```

2. Navigate to the project directory:

   ```sh
   cd numberguessinggame
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

## Usage

To start the game, run:

```sh
npm run dev
```

Follow the prompts to select a difficulty level and start guessing!

## Project Structure

```
numberguessinggame/
│── src/
│   ├── index.ts    # Main game logic
│── db.json         # Local storage for best attempts
│── package.json    # Project dependencies and scripts
│── tsconfig.json   # TypeScript configuration
```

## How It Works

1. The game prompts the user to select a difficulty level.
2. A random number between 1 and 100 is generated.
3. The player inputs guesses, receiving hints on whether the number is higher or lower.
4. If the player guesses correctly, the time taken and number of attempts are displayed.
5. The best attempts are stored and displayed for reference.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## Resources

- [Node.js Documentation](https://nodejs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

Happy coding and have fun guessing!
