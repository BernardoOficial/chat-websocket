import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();
const serverHTTP = http.createServer(app);

const io = new Server(serverHTTP, {
    cors: {
        origin: "http://localhost:3000"
    }
});

export { serverHTTP, io }