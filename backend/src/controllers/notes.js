const noteModel = require('../models/note')

const notesController = {}
// OBTENER TODAS LAS NOTAS
notesController.getNotes = async (req, res, next) => {
    const notes = await noteModel.find()
    res.json(notes)
}
// OBTENER UNA SOLA NOTA
notesController.getOneNote = async (req, res, next) => {
    const note = await noteModel.findById(req.params.id)
    res.json(note)
}
// CREAR UNA NOTA
notesController.createNote = async (req, res, next) => {
    const {title, content, author, date} = req.body
    const note = new noteModel({title, content, author, date})
    const noteSave = await note.save()
    res.json(noteSave)
}
// ACTUALIZAR UNA NOTA
notesController.updateNote = async (req, res, next) => {
    const note = await noteModel.findByIdAndUpdate(req.params.id, req.body)
    res.json(note)
}
// ELIMINAR UNA NOTA
notesController.deleteNote = async (req, res, next) => {
    const note = await noteModel.findByIdAndRemove(req.params.id)
    res.json(note)
}

module.exports = notesController