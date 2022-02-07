import Jwt from 'jsonwebtoken'

export function verifyToken(req, res, next) {
    /*if (req.method == 'OPTIONS'){
        return next();
    }*/
    var token = req.headers['authorization']
    if (!token) {
        return res.status(401).send()
    }
    try {
        const decoded = Jwt.verify(token, process.env.TOKEN_KEY)
         req.user = decoded
    } catch (err) {
        console.log(err)
        return res.status(401).send()
    }
    return next()
}