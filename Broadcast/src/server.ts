import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const users: string[] = [];

const HttpServer = http.createServer(app);

const io = new Server(HttpServer);

io.on("connection", (socket) => {
  users.push(socket.id);

  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });

  socket.on("disconnect", () => {
    users.filter((user) => user !== socket.id);
    console.log("user disconnected");
  });
});

HttpServer.listen(3000, () => {
  console.log("Server started on port 3000");
});
