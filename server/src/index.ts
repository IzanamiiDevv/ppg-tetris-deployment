import { serve } from "@hono/node-server";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { cors } from "hono/cors";

const prisma = new PrismaClient();
const app = new Hono();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://plug-play-go.vercel.app",
    ],
    credentials: true,
  })
);

app.post("/players-count", async (c) => {
  const { tetrisCount } = await c.req.json();

  await prisma.playerCount.create({
    data: {
      tetrisCount: tetrisCount,
    },
  });

  return c.json({ message: "Counted Player" });
});

app.get("/get-tetris-count", async (c) => {
  const totalCount = await prisma.playerCount.aggregate({
    _sum: { tetrisCount: true },
  });

  return c.json({ tetris: totalCount._sum.tetrisCount });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
