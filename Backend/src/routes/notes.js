//creacion de enrutadores
const { Router } = require('express');
const { route } = require('./users');
const router = Router();

const { getNotes, createNotes, getNote, updateNotes, deleteNotes } = require('../controllers/notes.controllers');

router.route('/')
    .get(getNotes)
    .post(createNotes)

router.route('/:id')
    .get(getNote)
    .put(updateNotes)
    .delete(deleteNotes)


//get devuelve algo
//post nos sirve para guardar un nuevo dato
//put para actualizar un dato
//delete eliminar un dato
//patch actualiza una sola propiedad de un dato.
module.exports = router;