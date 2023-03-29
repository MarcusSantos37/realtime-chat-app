const express = require("express");
const cors = require("cors");

const socketIO = require("socket.io");

const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes.js");
const messagesRoutes = require("./routes/messagesRoutes.js");

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

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

const io = socketIO(server, {
  cors: "http://127.0.0.1:5173/",
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
      socket.to(sendUserSocket).emit("messageRecieve", data.message);
    }
  });
});
