# Personal Blog

## Overview

Personal Blog is a simple yet powerful blogging platform built using Astro. It allows users to read articles, while administrators can create, edit, and delete posts through a secure admin panel.

## Features

- 🌐 **Astro Framework** - Optimized for speed and performance.
- 📝 **Markdown Support** - Write articles using Markdown.
- 🔒 **Basic Authentication** - Secure access to the admin panel.
- 🎨 **Tailwind CSS** - Modern and responsive UI.
- 📦 **Database Integration** - Store and manage articles with Astro DB.
- 🚀 **Deployable on Netlify** - Preconfigured for easy deployment.

## Tech Stack

- [Astro](https://astro.build/)
- [Astro DB](https://astro.build/db)
- [Tailwind CSS](https://tailwindcss.com/)
- [Marked](https://marked.js.org/)
- [Netlify](https://www.netlify.com/)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/personal-blog.git
   cd personal-blog
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

### Running the Blog

Once the server is running, visit `http://localhost:4321` to see the blog in action.

### Admin Panel

To access the admin panel, navigate to `/admin` and log in using:

- **Username:** `admin`
- **Password:** `admin`

### API Endpoints

- `GET /api/:id/articles.json` - Retrieve an article by ID.
- `PATCH /api/:id/articles.json` - Update an existing article.
- `DELETE /api/:id/articles.json` - Remove an article.

## Deployment

This project is preconfigured to deploy on Netlify. Simply push your repository and connect it to Netlify for automatic deployment.

## License

This project is licensed under the MIT License.

---

Developed with ❤️ using Astro and Tailwind CSS.
