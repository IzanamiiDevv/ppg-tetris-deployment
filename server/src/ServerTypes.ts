import { Server, DefaultEventsMap } from "socket.io";
import http from "http";

export type ROOM = string;
export type PORT = number;
export type ValidationMethod = (status: number) => void;
export type IO = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
export type SERVER = http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
export interface ClientRequest { 
    _event: string;
    _target: string | null; 
    _data: any[] 
};
export interface ActiveUserType {
    id: number,
    socketID: string,
    name: string
}