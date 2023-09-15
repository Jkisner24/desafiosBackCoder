const jwt = require('jsonwebtoken')
const {JWT_SECRET_KEY} = require('../config/config')

const generateToken = (user) => {
    const token = jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '24h' })
    return token

}

const generateTemporaryToken = (user) => {
    const token = jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '1h' })
    return token

}


const authToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']; 

        if (!authHeader) {
          return res.status(401).send({
            status: 'error',
            payload: 'Not authenticated'
          });
        }
    
        const token = authHeader.split(' ')[1]; 

        jwt.verify(token, JWT_SECRET_KEY, (error, credential) => {
            if (error) return res.status(403).send({
                status: 'error',
                payload: 'Not authorized'
            })
            req.user = credential.user
            next()
        })
    } catch (error) {
        return res.status(404).send({ status: 'error', error })
    }
}
const authHeaders = (req, _res, next) => {
    const cookieHeader = req.headers.cookie ?? req.headers.authorization ?? null
    if (!cookieHeader) return next()
    if (cookieHeader.includes('=')) {
        const token = cookieHeader.split('=')[1]
        const { user } = jwt.verify(token, JWT_SECRET_KEY)
        req.user = user
        next()
    }
    if (cookieHeader.toLowerCase().includes('bearer')) {
        const token = cookieHeader.split(' ')[1]
        const { user } = jwt.verify(token, JWT_SECRET_KEY)
        req.user = user
        next()
    }
}



module.exports = {
    generateToken,
    generateTemporaryToken,
    authToken,
    authHeaders
}