const express = require('express');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');
const createUser = require('./libs/initialSetup');
const http = require('http');

const sockets = require('./libs/sockets');

require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app)

const io = new Server(server, {
    cors: '*'
})

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(port, () => console.log('Servidor ejecutándose en el puerto ', port));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a la base de datos'))
    .catch((error) => console.log(error));

createUser.createUser();
sockets.sockets(io);
