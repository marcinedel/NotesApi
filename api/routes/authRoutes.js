import express from 'express'
import * as authController from '../controllers/authController.js'
import * as authMiddleware from '../middlewares/auth.js'
const router = express.Router();

router.post("/register", (req,res,next) => {
    authController.create_user(req,res,next)
})

router.post('/login', (req,res,next) => {
    authController.login(req,res,next)
})

export default router