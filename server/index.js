const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Sucessfull");
  })
  .catch((err) => console.log(err.message));

// const io = require("socket.io")(app, {
//   cors: { origin: "http://127.0.0.1:5173" },
// });

// io.on("connection", (socket) => {
//   console.log("Usuário conectado!", socket.id);

//   socket.on("disconnect", (reason) => {
//     console.log("Usuário desconectado!", socket.id);
//   });

//   socket.on("setUsername", (username) => {
//     socket.data.username = username;

//     console.log(socket.data.username);
//   });

//   socket.on("message", (text) => {
//     io.emit("receivedMessage", {
//       text,
//       authorId: socket.id,
//       author: socket.data.username,
//     });
//   });
// });

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
