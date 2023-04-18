import express from 'express';
import http from 'http';
import { Server as WebSocketServer } from "socket.io";
import { dbConnect } from './mongoose';
import Message from './model/contactMe.model';

dbConnect();
const apiContactMe = express();
const serverHttp = http.createServer(apiContactMe);
const io = new WebSocketServer(serverHttp);
let numNewMessages = 0;

io.on("connection", (socket) => {
    console.log("Usuario conectado");

    socket.on("message", () => {
        console.log("Nuevo mensaje recibido");
        numNewMessages++;
        io.emit("newMessage", numNewMessages);
    });
});

apiContactMe.get("/api/contactMe", async (req, res) => {
    const messages = await Message.find();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(messages);
});

apiContactMe.get("/", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ numNewMessages });
});

apiContactMe.post("/api/contactMe", async (req, res) => {
    const newMessage = new Message(req.body);
    const savingMessage = await newMessage.save();
    numNewMessages++; // Incrementar el valor de numNewMessages
    io.emit("newMessage", numNewMessages); // Emitir un evento "newMessage" con el nuevo valor de numNewMessages
    res.setHeader("Content-Type", "application/json");
    res.status(201).json({ message: "Mensaje enviado exitosamente" });
});

apiContactMe.listen(3000)