import express from 'express'
import * as notesController from '../controllers/notesController.js'
const router = express.Router()

router.get('', (req, res, next) => {
    notesController.getAllNotes(req,res,next)
})

router.post('',(req, res, next) => {
    notesController.createNote(req,res,next)
})

router.get('/:id', (req, res, next) => {
    notesController.getNoteById(req, res, next)
})

router.patch('/:id', (req, res, next) => {
    notesController.patchNote(req,res,next)
})

router.delete('/:id', (req, res, next) => {
    notesController.deleteNote(req, res, next)
})

export default router