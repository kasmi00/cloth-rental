require("dotenv").config();
const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");
const connectToMongo = require("./database/db");
const router = require("./routes/route");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // No need for `body-parser`
app.use(express.urlencoded({ extended: true }));

// Available routes
app.use("/", router);

// Connect to MongoDB
const startServer = async () => {
  try {
    await connectToMongo();
    console.log("✅ MongoDB Connected Successfully");

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server listening on: http://localhost:${PORT}`);
    });

    // Initialize Socket.IO
    const io = socketIo(server, {
      cors: {
        origin: "http://localhost:27017",
        credentials: true,
      },
    });

    // Socket.IO Connection Handling
    io.on("connection", (socket) => {
      console.log("⚡ New client connected:", socket.id);

      // User Tracking
      const onlineUsers = new Map();

      socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log(`User ${userId} connected with socket ID: ${socket.id}`);
      });

      // Message Handling
      socket.on("send-msg", (data) => {
        console.log("📩 Received message:", data.message);
        const recipientSocket = onlineUsers.get(data.to);

        if (recipientSocket) {
          socket.to(recipientSocket).emit("msg-received", data.message);
          console.log(`📤 Message sent to User ${data.to}`);
        } else {
          console.log(`⚠️ User ${data.to} is offline or not found.`);
        }
      });

      // Handle Disconnect
      socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
        onlineUsers.forEach((value, key) => {
          if (value === socket.id) {
            onlineUsers.delete(key);
          }
        });
      });
    });

  } catch (error) {
    console.error("❌ Server Error:", error.message);
    process.exit(1);
  }
};

// Start the Server
startServer();
