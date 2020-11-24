const {Schema, model} = require('mongoose');

//creacion del esquema de la base de datos
const NoteSchema = new Schema({
    title: String,
    content: {
        type: String,
        required: true,
    },
    author: String,
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps:true,
}
);

module.exports = model('Note', NoteSchema);
