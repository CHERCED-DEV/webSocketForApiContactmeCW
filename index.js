const express = require('express');
/* const http = require('http');
const { Server: WebSocketServer } = require("socket.io"); */
const cors = require('cors');
/* const dbConnect = require('./src/mongoose.js');
const { Message } = require('./src/model/contactMe.model');
const { CORS } = require('dotenv').config().parsed;
 */
dbConnect();

const apiContactMe = express();

const port = process.env.PORT || 3000;
apiContactMe.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
/* 
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

apiContactMe.use(cors({ origin: CORS })); */