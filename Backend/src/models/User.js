const {Schema, model} = require('mongoose');


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    }
}, {
    timestamps: true
});

module.exports = model('User', UserSchema);


/**
 * --timestamps: devuelve una fecha 
 * especifica de cuando fue creado el documento
 * dentro de la collection, con la fecha de actualizacion
 * (unica de mongoose)
 * (booleano)
 * 
 * --required: indica que es requerido
 * (booleano)
 * 
 * --trim: permite que no se duplique ciertos
 * factores cuando se guarde
 * (booleano)
 * 
 * --unique: permite que valor no sea repetido
 * (booleano)
 */