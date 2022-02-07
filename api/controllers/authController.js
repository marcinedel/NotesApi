import Mongoose from 'mongoose'
import User from '../models/user.js'
import Jwt from 'jsonwebtoken'

export function create_user(req, res, next) {
    User.find({ email: req.body.email })
        .then(r => {
            if (r.length > 0) {
                res.status(409).json({
                    message: 'User already exists'
                }
                )
            }
            const user = new User({
                _id: new Mongoose.Types.ObjectId(),
                email: req.body.email,
                password: req.body.password,
            })

            const token = Jwt.sign({
                user_id: user._id,
                email: user.email,
            }, process.env.TOKEN_KEY, {
                expiresIn: "24h"
            })

            user.token = token
            user.save()
                .then(r => {
                    res.status(201).json(user)
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).send("Couldnt create user")
                })
        })
}

export async function login(req, res, next) {
    try {
        const user = await User.findOne({ email: req.body.email })
        console.log(user.email)
        if (user.password == req.body.password) {

            const token = Jwt.sign({
                user_id: user._id,
                email: user.email,
            }, process.env.TOKEN_KEY,
                {
                    expiresIn: "24h"
                })
            await User.findByIdAndUpdate(user._id,
                {
                    token: token,
                })
            res.status(200).json({ token: token })
        } else {
            return res.status(401).send()
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send()
    }
}

