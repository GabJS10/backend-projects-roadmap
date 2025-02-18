# Markdown Note-taking App

A simple **Markdown Note-taking App** that allows users to upload Markdown files, check grammar, save notes, and render them as HTML.

## Features

- **Upload Markdown Files**: Users can upload `.md` files and store them in the system.
- **Grammar Checking**: Uses [LanguageTool](https://languagetool.org/) to check grammar and provide suggestions.
- **List Saved Notes**: Retrieve the list of uploaded Markdown files.
- **Convert Markdown to HTML**: Render Markdown files as HTML for easy viewing.

## Installation

### Prerequisites

- Node.js (>= 16.x)
- npm or yarn
- A running instance of the [LanguageTool API](https://dev.languagetool.org/http-api) or use the public API

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/markdown-note-app.git
   cd markdown-note-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm run start
   ```

## API Endpoints

### Upload a Markdown File

- **Endpoint:** `POST /markdown/upload`
- **Description:** Upload a `.md` file to the server.
- **Request:** Multipart form-data with a `file` field.
- **Response:**
  ```json
  {
    "message": "File uploaded successfully",
    "filename": "example.md"
  }
  ```

### Check Grammar

- **Endpoint:** `POST /markdown/check-grammar`
- **Description:** Checks the grammar of an uploaded Markdown file.
- **Request:** Multipart form-data with a `file` field.
- **Response Example:**
  ```json
  [
    {
      "message": "Possible spelling mistake",
      "replacement": "example",
      "context": "exemple"
    }
  ]
  ```

### List Notes

- **Endpoint:** `GET /markdown/notes`
- **Description:** Returns a list of uploaded Markdown files.
- **Response Example:**
  ```json
  ["note1.md", "note2.md"]
  ```

### Convert Markdown to HTML

- **Endpoint:** `GET /markdown/transform?filename=example.md`
- **Description:** Converts a Markdown file to HTML.
- **Response:** Returns the HTML content of the Markdown file.

## Technologies Used

- **NestJS**: Backend framework
- **Multer**: File upload handling
- **LanguageTool API**: Grammar checking
- **Marked.js**: Markdown to HTML conversion

## Future Improvements

- User authentication
- Store notes in a database
- Frontend interface for better usability

## License

This project is licensed under the MIT License.
