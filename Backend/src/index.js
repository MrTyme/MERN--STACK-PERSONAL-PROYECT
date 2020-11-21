//solicitud de variables de entorno
require('dotenv').config();



//creacion del servidor
const app = require('./app');
require('./database');

async function main() {
    //inicializacion del server
    await app.listen(4000);
    console.log('server on port 4000');
}


main();