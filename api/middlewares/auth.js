import Jwt from 'jsonwebtoken'

export function verifyToken(req, res, next) {
    var token = req.headers['authorization']
    if (!token) {
        return res.status(403).send()
    }
    try {
        const decoded = Jwt.verify(token, process.env.TOKEN_KEY)
         req.user = decoded
    } catch (err) {
        return res.status(401).send()
    }
    return next()
}