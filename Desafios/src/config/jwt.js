const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_PRIVATE_KEY = 'PalabraJWTSecreta';
//usar clave secreta en .env : process.env.JWT_SECRET_KEY

const generateToken = (user) => {
    const token = jwt.sign({ user }, JWT_PRIVATE_KEY, { expiresIn: '24h' })
    return token
}

const authToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']; 

        if (!authHeader) {
          return res.status(401).send({
            status: 'error',
            payload: 'Not authenticated'
          });
        }
    
        const token = authHeader.split(' ')[1]; // Extraer el token correctamente

        jwt.verify(token, JWT_PRIVATE_KEY, (error, credential) => {
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

module.exports = {
    generateToken,
    authToken
}