const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes')
const createUser = require('./libs/initialSetup')
const connection = require('./connection');


require("dotenv").config();

const port = process.env.PORT || 4000;
const app = express();
createUser.createUser();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log('Servidor ejecutandose en el puerto ', port))

// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log('Conectado a la base de datos'))
//     .catch((error) => console.log(error))
connection.getData();