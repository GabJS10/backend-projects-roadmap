# TaskCLI

TaskCLI is a command-line application for managing your tasks efficiently. With this CLI tool, you can create, update, delete, and view tasks directly from your terminal. It supports task categorization by status and displays tasks in a tabular format for better readability.

## Features

- **Add Tasks**: Create new tasks with a title, description, and status.
- **View Tasks**: Display all tasks in a formatted table.
- **Filter by Status**: View tasks filtered by their status ("todo", "in progress", "done").
- **Get Task by ID**: Retrieve a specific task by its ID.
- **Update Tasks**: Modify the title, description, or status of an existing task.
- **Delete Tasks**: Remove tasks by their ID.
- **Interactive Prompts**: User-friendly input prompts powered by Inquirer.js.

## Prerequisites

Before using TaskCLI, ensure you have the following installed on your system:

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd taskcli
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

Start the CLI with the following command:

```bash
npm start
```

### Available Commands

#### Add a Task

```bash
add
```

Follow the interactive prompts to input the task's title, description, and status.

#### List All Tasks

```bash
list
```

Displays all tasks in a tabular format.

#### Filter Tasks by Status

```bash
status
```

Select a status ("todo", "in progress", "done") to view tasks with that status.

#### Get a Task by ID

```bash
get
```

Provide the ID of the task to retrieve its details.

#### Update a Task

```bash
update
```

Input the task ID and the new details (title, description, and/or status).

#### Delete a Task

```bash
delete
```

Provide the ID of the task you want to remove.

## Project Structure

- **src/types**: Contains the TypeScript type definitions for tasks.
- **src/actions**: Includes functions to handle task operations such as add, update, delete, and retrieve.
- **src/commands**: Defines the CLI commands using Commander.js and Inquirer.js.

## Dependencies

- [chalk](https://www.npmjs.com/package/chalk): Terminal string styling.
- [cli-table3](https://www.npmjs.com/package/cli-table3): Table formatting for CLI output.
- [commander](https://www.npmjs.com/package/commander): Command-line argument parsing.
- [inquirer](https://www.npmjs.com/package/inquirer): Interactive CLI prompts.
- [ora](https://www.npmjs.com/package/ora): Loading spinners for better UX.

## Development

This project uses [tsx](https://www.npmjs.com/package/tsx) for running TypeScript files directly. To start the CLI in development mode:

```bash
npm run start
```

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## Acknowledgments

- Thanks to the developers of Commander.js and Inquirer.js for providing powerful tools for CLI development.

