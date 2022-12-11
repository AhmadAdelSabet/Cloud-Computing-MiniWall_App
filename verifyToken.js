// based on minifilm app
// token verification file
const jsonwebtoken = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('auth-token')
    if(!token) return res.status(401).send({message: 'Invalid token'})

    try {
        const valid = jsonwebtoken.verify(token, process.env.TOKEN_SECRET)
        req.user = valid
        next()
    } catch (err) {
        res.status(401).send({message:'Invalid token'})
    }
}

module.exports = auth