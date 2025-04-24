# Tetris Game with React & Hono.js

# 📌 Project Overview

This project is a Tetris game built with React.js (Vite) for the frontend and Node.js with Hono.js for the backend. It includes features for tracking the number of players and their game sessions in a database.

## 🚀 Tech Stack
### Frontend
- Vite

- React Type Script

- Tailwind CSS (styling)

- React Tetris (Tetris game logic)

- @tanstack/react-router (for routing)

- Motion (for animations)

### Backend
- NodeJS

- ExpressJS

- Prisma (ORM for database interactions)

- PostgreSQL (database)




## 🔧 Installation & Setup

1. Clone the Repository

git clone https://github.com/your-repo/tetris-game.git
cd tetris-game

2. Install Dependencies

### Frontend

- cd frontend
- npm install

### Backend/Server

- cd server
- npm install

3. Set Up Environment Variables

- Create a .env file in the backend folder and configure your database:

- DATABASE_URL=postgresql://your_username:your_password@your_host:your_port/your_database

4. Run the Development Servers

- Start Backend (Hono.js)

- cd server
- npm run dev

### Start Frontend (Vite + React)

- cd frontend
- npm run dev

### 📌 Features

✅ Play classic Tetris 🎮✅ Track player count & game sessions in real-time 📊✅ Lightweight & fast with Vite and Hono.js 🖥️📱✅ Database integration using Prisma & PostgreSQL 🗄️

### 📡 API Endpoints

Method

Endpoint

Description

POST
```
/players-count

Adds a new player session

GET

/get-tetris-count

Fetches total player count
```

### 🌎 Deployment

- Frontend: Deployed on Vercel

- Backend: Deployed on Render

- Database: Hosted on Supabase/PostgreSQL

### 🎉 Enjoy Playing Tetris!
