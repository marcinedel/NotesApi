import Note from '../models/note.js'
import mongoose from 'mongoose'

export async function getAllNotes(req, res, next){
    try{
        const notes = await Note.find({userId : req.user.user_id})
        res.status(200).json(notes)
    } catch (err){
        res.status(400).send('Couldnt find note')
    }
}

export async function getNoteById(req, res, next){
    try{
        const note = await Note.findById(req.params.id)
        if (note == null) {
            return res.status(404).send()
        }
        res.status(200).json(note)
    } catch {
        res.status(400).send()
    }
}

export async function createNote(req, res, next){
    try {
        const note = new Note({
            _id: new mongoose.Types.ObjectId(),
            userId: req.user.user_id,
            title: req.body.title,
            content: req.body.content,
        })
        await note.save()
        res.status(200).json(note)
    } catch (err) {
        res.status(400).send('Couldnt create note')
    }
}

export async function patchNote(req, res, next){
    try {
        const note = await Note.findOneAndUpdate({
            _id: req.params.id
        },{
            title: req.body.title,
            content: req.body.content
        },{new : true})
        res.status(200).json(note)
    } catch (err) {
        res.status(400).send('Couldnt update note')
    }
}

export async function deleteNote(req, res, next){
    try {
        await Note.deleteOne({_id: req.params.id})
        res.status(200).send('deleted')
    } catch (err) {
        res.status(400).send('Couldnt delete note')
    }
}