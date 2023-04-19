import express from 'express';
import http from 'http';
import { Server as WebSocketServer } from "socket.io";
import cors from 'cors'
import { dbConnect } from './src/mongoose';
import Message from './src/model/contactMe.model';
import { CORS } from './src/config';

dbConnect();

const apiContactMe = express();

const serverHttp = http.createServer(apiContactMe);
const io = new WebSocketServer(serverHttp);
let numNewMessages = 0;
apiContactMe.use(express.json());

io.on("connection", (socket) => {
    console.log("Usuario conectado");

    socket.on("message", () => {
        console.log("Nuevo mensaje recibido");
        numNewMessages++;
        io.emit("newMessage", numNewMessages);
    });
});

apiContactMe.use(express.static("public"))

apiContactMe.get("/api/contactMe", async (req, res) => {
    const messages = await Message.find();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(messages);
});

apiContactMe.post("/api/contactMe", async (req, res) => {
    const newMessage = new Message(req.body);
    const savingMessage = await newMessage.save();
    numNewMessages++;
    io.emit("newMessage", numNewMessages);
    res.setHeader("Content-Type", "application/json");
    res.status(201).json({ message: "Mensaje enviado exitosamente" });
});

apiContactMe.use(cors({ origin: CORS }));
apiContactMe.listen(3000);