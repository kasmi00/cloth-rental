const app = require("express")();
const connectToMongo = require("./database/db");
const router = require("./routes/route");
const cors = require("cors");
const bodyparser = require("body-parser");
const socket = require("socket.io");
require("dotenv").config();
const PORT = 5001;

app.use(cors());
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// available routes
app.use("/", router);

connectToMongo()
  .then(() => {
    try {
      const server = app.listen(PORT, () => {
        console.log(`Server listening on port http://localhost:${PORT}`);
      });
      const io = socket(server, {
        // pingTimeout: 60000,
        cors: {
          origin: "http://localhost:5173",
          credentials: true,
        },
      });
      global.onlineUsers = new Map();
      io.on("connection", (socket) => {
        // console.log("socket established");
        global.chatSocket = socket;
        console.log("connected to socket.io");
        socket.on("add-user", (userId) => {
          onlineUsers.set(userId, socket.id);
        });
        socket.on("send-msg", (data) => {
          console.log("Recieved message", data.message);
          const sendUserSocket = onlineUsers.get(data.to);

          if (sendUserSocket) {
            try {
              socket.to(sendUserSocket).emit("msg-recieved", data.message);
            } catch (error) {
              console.error("Error while sending the message", error);
            }
          }
        });
      });
    } catch (error) {
      console.error("Cannot connect to the server", error.message);
    }
  })
  .catch((error) => {
    console.error("Invalid database connection", error.message);
  });
