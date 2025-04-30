import { io } from "socket.io-client";
import { ServerURL, Event, Target, StreamBuffer, StreamCallback } from "./ServerTypes";

const SERVER: ServerURL = "http://localhost:5172";
const socket = io(SERVER);

class Server {
    private static definedEvent: Event[] = ["connection", "runEvent", "broadcastEvent", "disconnect"] as const;
    private static serverStatus: boolean = false;
    private static decryptTable() {}
    private static encryptTable() {}


    public static async updateStatus(): Promise<void> {
        try {
            const response = await fetch(SERVER);
            const text = await response.text();
            this.serverStatus = text === 'Active';
        } catch {
            this.serverStatus = false;
        }
    }
    
    public static isActive(): boolean {
        return this.serverStatus;
    }

    public static run<T extends unknown[]>(event: Event, target: Target , ...args: T): void | Error {
        if(this.definedEvent.includes(event)) return new Error("Error: You cant run a predefined socket event");
        socket.emit("0x53:runEvent", {
            _event: event,
            _target: target,
            _data: args
        });
    }

    public static invoke<T extends unknown[]>(event: Event, target: Target, ...args: T): void | Error {
        if(this.definedEvent.includes(event)) return new Error("Error: You cant invoke a predefined socket event");
        socket.emit("0x53:broadcastEvent", {
            _event: event,
            _target: target,
            _data: args
        });
    }

    public static setStream(callback: StreamCallback): StreamBuffer {
        const buffer: StreamBuffer = [];
        const stream = {
            listen<T extends unknown[]>(event: Event, listener: (...args: T) => void | Error) {
                if(Server.definedEvent.includes(event)) return new Error("Error: You cant create a predefined socket event");
                socket.on(event, listener);
                buffer.push(event);
            }
        };
        callback(stream);
        return buffer;
    }

    public static joinRoom(room: string): void {
        socket.emit("0x53:joinRoom", room);
    }

    public static leaveRoom(room: string): void {
        socket.emit("0x53:leaveRoom", room);
    }

    public static clean(buffer: StreamBuffer): void {
        buffer.forEach((event) => {
            socket.off(event);
        });
    }
}

class DataStream {

}

export { DataStream };

export default Server;