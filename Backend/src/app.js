//codigo del framework
//definicion del servidor
const express = require('express');
const cors = require('cors');
const app = express();

//settings
app.set('port', process.env.PORT || 4000);


//middlewares
//uso de cors : intercambio de datos entre servidores
app.use(cors());
app.use(express.json());
//express.json permite que el servidor entienda tambien formatos json



//routes
//definicion de las url a visitar
app.use('/api/users', require('./routes/users'));
//el use es para hacer uso de otro archivo o logica

app.use('/api/notes', require('./routes/notes'));



module.exports = app;
//exportacion de la app