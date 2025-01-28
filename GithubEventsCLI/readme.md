"# GitHub Events CLI

GitHub Events CLI is a command-line tool that fetches and displays recent GitHub events for a given username. It uses the GitHub API to retrieve data and categorizes events such as push actions, forks, issue comments, and more.

## Features

- Fetch and display the most recent GitHub events for any user.
- Supports event types:
  - **PushEvent**: Shows the number of commits pushed to a repository.
  - **DeleteEvent**: Displays deleted branches or tags.
  - **IssueCommentEvent**: Lists comments on issues.
  - **WatchEvent**: Indicates when a repository is starred.
  - **IssuesEvent**: Displays newly opened issues.
  - **ForkEvent**: Shows when a repository is forked.
- Clear and concise event details with timestamps.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

## Installation

1. Clone this repository:
   \`\`\`
   git clone https://github.com/your-username/backend-roadmap-projects.git
   \`\`\`

2. Navigate to the project directory:
   \`\`\`
   cd githubeventscli
   \`\`\`

3. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

## Usage

1. Run the CLI with the following command:
   \`\`\`
   npm run dev <GitHub_Username>
   \`\`\`
   Replace \`<GitHub_Username>\` with the GitHub username you want to fetch events for.

2. Example:
   \`\`\`
   npm run dev octocat
   \`\`\`

3. The CLI will display a list of events in the terminal, such as:
   \`\`\`
   Pushed 3 commits to octocat/Hello-World at 1/25/2025, 10:15 AM
   Starred octocat/Hello-World at 1/24/2025, 9:00 PM
   \`\`\`

## Scripts

- \`npm run dev\`: Runs the CLI tool in development mode.

## Project Structure

- \`src/main.ts\`: Entry point for the CLI.
- \`types.ts\`: Defines TypeScript types for GitHub events.

## Future Improvements

- Add support for pagination to fetch more events.
- Implement tests for improved reliability.
- Support filtering events by date or type.

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Acknowledgments

Inspired by the [Backend Developer Roadmap](https://roadmap.sh/backend/projects) and developed as part of backend learning projects.

Enjoy exploring GitHub events!"
