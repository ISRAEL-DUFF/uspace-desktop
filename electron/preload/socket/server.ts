import { Server } from "socket.io";

const io = new Server();

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit("message", "Hi from server")
    socket.on("message", (msg) => {
      console.log(msg)
    })
  });

io.on('message', (msg) => {
    console.log("Server Message: ", msg)
})

io.listen(3000);

export default {
    socketServer: io
}