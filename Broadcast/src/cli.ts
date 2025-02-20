import { program } from "commander";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import io from "socket.io-client";
program.version("1.0.0").description("Broadcast CLI");

program
  .command("start")
  .description("Start the interactive CLI")
  .action(() => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Connected to the server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      socket.disconnect();
      process.exit(1);
    });

    const rl = readline.createInterface({ input, output });

    socket.on("message", (message) => {
      console.log(`Received message: ${message}`);
    });

    rl.on("line", (message) => {
      if (message.trim().toLowerCase() === "exit") {
        console.log("Exiting...");
        rl.close();
        process.exit(0);
      }

      socket.emit("message", message);
    });
  });

program.parse(process.argv);
