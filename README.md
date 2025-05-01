# PPG: Plug Play Go
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

### 1. Clone the Repository
Copy the code below and paste it to your command prompt.

```bash
git clone https://github.com/IzanamiiDevv/ppg-tetris-deployment.git && cd ppg-tetris-deployment
```

### 2. Install Dependencies
Install Dependencies on Client and Server folder navigate using "cd folder" command.

#### Client/Frontend:
Some of the dependencies was outdated so ignore the warnings and errors.
```bash
npm install
```

#### Server/Backend:
All dependencies is up to date therefore no errors will occur.
```bash
npm install
```

### 3. Setup Backend:
To setup our Backend Server we need to specify the CLIENT_ORIGIN and the DATABASE_URL, create a ".env" file first.
```dotenv
DATABASE_URL="postgresql://your_username:your_password@your_host:your_port/your_database"
CLIENT_URL="http://localhost:5173"
```

Then we need to push the schema to the Database.
```bash
npx prisma db push
```

And then we need to migrate prisma our schema.
```bash
npx prisma migrate dev --name init
```

Finally we need to generate the prisma client.
```bash
npx prisma generate
```

### 4. Run both Client and Server:
In their folder to use this command to run.
```bash
npm run dev
```

# Server Utility API:

## Overview
This utility allows seamless communication between the frontend and backend using **Socket.IO** and RESTful APIs without the need for manual fetching or backend configuration in the frontend code.
---

## 📁 client/src/utils - `Server.ts`
This module provides an abstraction over socket and HTTP interactions to simplify usage in the frontend.

### Features
- Connects to the server via WebSocket.
- Emits and listens for custom events.
- Manages socket rooms.
- Performs HTTP GET requests.
- Tracks active users.

### Core API
#### `Server.updateStatus(): Promise<void>`
[This is currently in Development]: Check's if the Server was currently active or not.

#### `Server.isActive(): boolean`
[This is currently in Development]: Check's if the Server was currently active or not.

#### `Server.run(event, target, ...args)`
Run all events to a specific target including the sender.

Emits an event to a specific target (or broadcasts if null).  
❌ Throws error if event is predefined.
##### Example Usage:
```typescript
Server.run("myEvent", null, "Hello World"); // This will run to all active events.
Server.run("myEvent", socketID, "Hello World"); // This will run only to the target and the sender itself.
Server.run("myEvent", "room-1", "Hello World"); // This will run to all client including the sender that is currently in room-1.
```

#### `Server.invoke(event, target, ...args)`
Same with `Server.run(event, target, ...args)` but the difference it will run the event but the sender was not included.

#### `Server.setStream(callback): StreamBuffer`
Create a stream of event listeners.
##### Example Usage:
```typescript
const buffer = Server.setStream(function(stream) {
    stream.listen("myEvent", function(data) { // Listen to the event called "myEvent".
        console.log(data); // This callback will run if you emmit the event.
    });
});

Server.clean(buffer); // Clean the Stream to avoid side effects.
```

#### `Server.joinRoom(room: string)`
Joins the specified room.
##### Example Usage:
```typescript
Server.joinRoom("room-1"); // This will allow you to join a room.
```

#### `Server.leaveRoom(room: string)`
Leaves the specified room.
##### Example Usage:
```typescript
Server.leaveRoom("room-1"); // This will allow you to leave a room.
```

#### `Server.clean(buffer: StreamBuffer)`
Removes all listeners stored in the stream buffer.

#### `Server.getActiveUsers(callback)`
Fetches a list of active users from the backend after validating the request.
```typescript
Server.getActiveUsers(function(data) { //Return all Active users as Array of Objects.
    console.log(data);
});
```
---