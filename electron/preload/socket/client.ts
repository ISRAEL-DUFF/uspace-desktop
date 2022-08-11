import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

class USocket {
    connectionUrl: string;
    socket?: Socket<DefaultEventsMap, DefaultEventsMap>;
    connected = false;

    constructor(url: string) {
        this.connectionUrl = url;
    }

    connect(onMessageHandler: Function) {
        console.log("Starting connection")
        this.socket = io(this.connectionUrl);

        this.socket.on("connect_error", () => {
            console.log("Socket connection Error")
            this.connected = false;
        })

        this.socket.on("message", (msg) => {
            console.log("Message From Server:", msg)
            onMessageHandler(msg)
        })

        this.connected = true
    }

    emit(event: string, message: any) {
        if(this.connected) {
            this.socket?.emit(event, message)
        }
    }
    
}

let clients: USocket[] = []

// function connectSocket(cb: Function) {

//     const socket = io("http://127.0.0.1:4000");

//     socket.on("connect_error", () => {
//         cb("Socket Connection Error")
//         console.log("Socket connection Error")
//     })

//     socket.on("message", (msg) => {
//         cb("New Message")
//         console.log("Message From Server:", msg)
//     })

//     return socket
// }



export default {
    clients,
    socketConnect: (
        {url, onMessageHandler}: {url:string, onMessageHandler: Function}
    ) => {
        let sock = new USocket(url);
        clients.push(
            sock
        )
    }
}