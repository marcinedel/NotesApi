import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config({path : './enviroment_variables.env'})
mongoose.connect('mongodb+srv://notes_api:'+ process.env.CLUSTER_PASSWORD+ '@notesapicluster.9c25m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
const app = express();

app.use(bodyParser.json())
app.use(morgan("combined"))

import authRoutes from './api/routes/authRoutes.js'
import notesRoutes from './api/routes/notesRoutes.js'
import * as authMiddleware from './api/middlewares/auth.js'

app.use(cors())
app.use("/authentication", authRoutes)
app.use('/notes', authMiddleware.verifyToken, notesRoutes)
app.use((req, res, next) => {
    res.status(404).json({
            message : "Not found",
        }
    )
})

export default app
