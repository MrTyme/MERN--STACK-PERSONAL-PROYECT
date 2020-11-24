//los controladores son utilizados para que el
//codigo se distribuya mejor en archivos por separado
//en este caso los controladors van a manipular
//las funciones que estan relacionadas con X dato.

const notesCtrl = {};


notesCtrl.getNotes = (req,res) => res.json({ massage: []});

notesCtrl.createNotes = (req,res) => res.json({ massage: 'post request'});

notesCtrl.getNote = (req,res) => res.json({ title: 'sdadasdasd' })

notesCtrl.updateNotes = (req,res) => res.json({ massage: 'Note Upload'})

notesCtrl.deleteNotes = (req,res) => res.json({ massage: 'Note Delete'})


module.exports = notesCtrl;