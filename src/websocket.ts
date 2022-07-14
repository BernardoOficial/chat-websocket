import { io } from "./http";

interface RoomUser {
    room: string;
    username: string;
    socketId: string;
}

interface Message {
    room: string,
    message: string;
    createdAt: Date,
    username: string;
}

const users: RoomUser[] = [];
const messages: Message[] = [];

io.on("connection", socket => {
    console.log(socket.id);

    socket.on("room", data => {
        console.log("nova usuário na sala", data);
        socket.join(data);

        const userInRoom = users.find(user => {
            return user.username === data.username
                   && user.room === data.room
        })

        if(userInRoom) {
            userInRoom.socketId = socket.id;
            return
        }
        
        users.push({
            room: data.room,
            username: data.username,
            socketId: data.socketId,
        })
    })

    socket.on("send-message", data => {
        console.log("nova mensagem", data);
        const newMessage: Message = {
            room: data.room,
            username: data.username,
            message: data.message,
            createdAt: new Date(),
        }
        messages.push(newMessage);
        socket.to(data.room).emit("receive-message", newMessage);
    })

});