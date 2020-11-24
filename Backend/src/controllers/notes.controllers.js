//los controladores son utilizados para que el
//codigo se distribuya mejor en archivos por separado
//en este caso los controladors van a manipular
//las funciones que estan relacionadas con X dato.

const notesCtrl = {};

const Note = require('../models/Note');


notesCtrl.getNotes = async (req,res) => {
    const notes = await Note.find();
    res.json(notes);
}


notesCtrl.createNotes = async (req,res) => {
    //recepcion de los datos del objeto
    const {title, content, date, author} = req.body 
    
    //creacion del objeto
    const newNote =new Note({
        title,
        content,
        date,
        author
    });

    //guardamos el request creado en el cuerpo de la base de datos
    

    //guardado del objeto creado
    await newNote.save();
    res.json({ massage: 'Note Saved'});
}


notesCtrl.getNote = async (req,res) => {
    //para obtener un solo objeto dentro del array de la DB
    //se debe manipular el id de cada objeto creado
    const note = await Note.findById(req.params.id)
    console.log(note);
    res.json({ title: 'sdadasdasd' });
}

notesCtrl.updateNotes = async (req,res) => {
    //pase de datos
    const {title, content, author} = req.body

    //actualizacion de los datos
    await Note.findOneAndUpdate({_id: req.params.id}, {
        //tipo de dato a actualizar
        title,
        author,
        content
    })
    res.json({ massage: 'Note Upload'});
}

notesCtrl.deleteNotes = async (req,res) => {
    //eliminacion de los datos
    await Note.findOneAndDelete(req.params.id)
    res.json({ massage: 'Note Delete'});
}


module.exports = notesCtrl;