const express = require("express");
const cors = require("cors");

const socketIO = require("socket.io");

const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes.js");
const messagesRoutes = require("./routes/messagesRoutes.js");

const port = process.env.PORT || 1337;

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes, messagesRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Sucessfull");
  })
  .catch((err) => console.log(err.message));

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const io = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("sendMessage", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("messageReceive", data.message);
    }
  });
});
