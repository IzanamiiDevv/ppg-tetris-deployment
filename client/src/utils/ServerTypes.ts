export type ServerURL = string;
export type Target = string | null;
export type Event = string;
export type StreamBuffer = Event[];
export type StreamCallback = (stream: Stream) => void;
export const predefinedEvents = ["runEvent", "broadcastEvent", "getRooms", "disconnect"] as const;
export type Events = (typeof predefinedEvents)[number];
export type Stream = {
    listen<T extends unknown[]>(event: Event, listener: (...args: T) => void): void;
};

export type DataBaseTable = number[][];