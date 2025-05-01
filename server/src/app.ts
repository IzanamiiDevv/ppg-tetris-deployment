import express, { Request, Response } from "express";
import cors from "cors";
import { Server, Socket } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client'
import { SERVER, PORT, IO, ClientRequest, ROOM, ValidationMethod, ActiveUserType } from "./ServerTypes";
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
  origin: "*",
}));
app.use(express.json());

prisma.$connect().catch(() => {
  console.log("Cant Connect to DataBase");
  process.exit(1);
});

io.on("connection", async (socket: Socket) => {
  console.log("New connection:", socket.id);
  await prisma.activeUser.create({
    data: {
      socketID: socket.id,
      name: 'USER[default]',
    },
  });

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

  socket.on("disconnect", async () => {
    console.log("Connection Disconnected:", socket.id);
    await prisma.activeUser.deleteMany({
      where: {
        socketID: socket.id,
      },
    });
  });
});

function validateRequest(clientID: string | undefined, origin: string | undefined): Promise<number> {
  return new Promise(async (resolve: ValidationMethod, reject: ValidationMethod) => {
    if(clientID == undefined || process.env.CLIENT_URL != origin || origin == undefined) reject(401);
    const found = await prisma.activeUser.findFirst({
      where: { socketID: clientID },
    });
    if(found == null) reject(401);
    resolve(200);
  });
}

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Active");
});

app.get("/testAuth", async (req: Request, res: Response) => {
  const clientID: string | undefined = req.headers.from;
  const origin: string | undefined = req.get('Origin') || req.get('Referer') || req.get('Host');
  validateRequest(clientID, origin).then((status) => {
    res.status(status).send("Welcome to Server"); 
  }).catch((status) => {
    res.status(status).send("Sorry we cant authorize your request.");
  });
});

app.get("/testAny", (req: Request, res: Response) => {
  res.status(200).send("Hello World!!");
});

app.get("/getActiveUsers", (req: Request, res: Response) => {
  const clientID: string | undefined = req.headers.from;
  const origin: string | undefined = req.get('Origin') || req.get('Referer') || req.get('Host');
  validateRequest(clientID, origin).then(async (status) => {
    const data: ActiveUserType[] = await prisma.activeUser.findMany();
    res.status(status).json(data);
  }).catch((status) => {
    res.status(status).send("Sorry we cant authorize your request.");
  });
});

server.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});

const shutdown = async () => {
  console.log("Cleaning Database...");
  await prisma.activeUser.deleteMany();
  console.log("Shutting down gracefully...");
  await prisma.$disconnect();
  console.log("Database Disconnected");
  console.log("Server closed");
  process.exit(0);
};

process.on("SIGINT",shutdown);
process.on('SIGTERM', shutdown); 