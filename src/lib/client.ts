import { categories } from "./categories";

export type ClientConfig = {
    serverAddr: string;
    siteId: string;
}

export type Message = {
    category: number;
    payload:Uint8Array;
}

export class Client {
    #wsConn: WebSocket;

    constructor(config: ClientConfig) {
        this.#wsConn = new WebSocket(config.serverAddr, "ws")
    }

    #send(m: Message) {
        if (this.#wsConn.readyState !== 1) {
            throw new Error("websocket connection is not ready to send data")
        }
        this.#wsConn.send(JSON.stringify(m))
    }

    sendCustomEvent(payload: Uint8Array) {
        this.#send({
            category: categories.custom,
            payload
        })
    }
}