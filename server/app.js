const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const PORT = 5172;
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());

// Express:
app.get("/test", (req, res) => {
    res.status(200).send("Hello World!");
});

// Socket:
let player_count = 0;
io.on("connection", (socket) => {
    console.log("New connection:", socket.id);
    player_count++;

    

    socket.on("disconnect", () => {
        console.log("Connection Disconnected:", socket.id);
        player_count--;
    });
});

server.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
});