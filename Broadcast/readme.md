# Broadcast Server

A simple CLI-based broadcast server that allows multiple clients to connect and exchange messages in real-time using WebSockets.

## 🚀 Features

- WebSocket-based real-time message broadcasting.
- CLI client to send and receive messages.
- Handles multiple client connections gracefully.

## 🛠️ Technologies Used

- Node.js
- Express.js
- Socket.io
- Commander.js
- TypeScript

## 📦 Installation

Ensure you have **Node.js** installed on your system.

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/broadcast-server.git
   cd broadcast-server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## ▶️ Usage

### Start the Server

Run the following command to start the WebSocket server:

```sh
npm run start-server
```

By default, the server listens on **port 3000**.

### Start a Client

To connect a client to the server, run:

```sh
npm run start-client
```

Once connected, you can type messages in the CLI, and they will be broadcasted to all connected clients.

### Exit the Client

Type `exit` and press Enter to disconnect the client.

## 🎯 How It Works

- The server listens for new WebSocket connections.
- When a client connects, it joins the list of active users.
- Messages sent by any client are broadcasted to all connected clients.
- Clients can disconnect gracefully by typing `exit`.

## 🔧 Future Enhancements

- Implement authentication for clients.
- Add a command to list active clients.
- Store and retrieve message history.

## 📝 License

This project is licensed under the **ISC License**.
