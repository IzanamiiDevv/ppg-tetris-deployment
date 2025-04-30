import express, { Request, Response } from "express";
import cors from "cors";
import { Server, Socket } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client'
import { SERVER, PORT, IO, ClientRequest, ROOM } from "./ServerTypes";
dotenv.config();

const app = express();
const prisma: PrismaClient = new PrismaClient();
const server: SERVER = http.createServer(app);
const port: PORT = 5172;
const io: IO = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});


app.use(cors({
  origin: process.env.CLIENT_URL
}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Active");
});

io.on("connection", (socket: Socket) => {
  console.log("New connection:", socket.id);

  socket.on("0x53:runEvent", (data: ClientRequest) => {
    const { _event, _target, _data } = data;
    _target == null ? io.emit(_event, ..._data) : io.to(_target).emit(_event, ..._data);
  });

  socket.on("0x53:broadcastEvent", (data: ClientRequest) => {
    const { _event, _target, _data } = data;
    _target == null
      ? socket.broadcast.emit(_event, ..._data)
      : socket.broadcast.to(_target).emit(_event, ..._data);
  });

  socket.on("0x53:joinRoom", (room: ROOM) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
  });

  socket.on("0x53:leaveRoom", (room: ROOM) => {
    socket.leave(room);
    console.log(`Socket ${socket.id} left room ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("Connection Disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
  console.log()
});

async function main() {
  const allUsers = await prisma.activeUser.findMany();
  const newUser = await prisma.activeUser.create({
    data: {
      socketID: 'abc123',
      name: 'Rafael',
    },
  });

  console.log('New user created:', newUser);
  console.log(allUsers)
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
});