import mongoose from 'mongoose'

const noteSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userId: {
        type: mongoose.Types.ObjectId,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String
    }
})

export default mongoose.model("Note",noteSchema)