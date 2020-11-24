//solicitud de variables de entorno
require('dotenv').config();

//creacion del servidor
const app = require('./app');
require('./database');

async function main() {
    //inicializacion del server
    await app.listen(app.get('port'));
    console.log('server on port', app.get('port'));
}


main();