//conexion de la base de datos.
const mongoose = require('mongoose');

//creacion de la direccion de mongodb
const URI = process.env.MONGODB_URI 
? process.env.MONGODB_URI 
: 'mongodb://localhost/databasePrueba' ;
//con process accedemos al sistema operativo
//buscamos la opcion de variable de entorno
//y escogemos la varibale de entorno creada

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
});


//cadena de conexion
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB is connected');
});