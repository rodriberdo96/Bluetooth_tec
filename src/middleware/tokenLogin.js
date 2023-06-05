require('dotenv').config()
const jwt = require('jsonwebtoken') 


const verifyUserToken = (req, res,  next) => {

    let token = req.cookies || req.headers.authorization || req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {

        return res.status(403).json({
            message: 'No se proporcionó token'
        })
    }
    try{
        const tempToken = token.split(' ')
        if (tempToken.length == 2) {
            token = tempToken[1]
        }
        const secret = process.env.JWT_SECRET
        const decoded = jwt.verify(token, secret)
        req.email = decoded.email
        next();
    } catch (error) {
        return res.status(403).json({
            message: 'Falló la autenticación del token'
        });
    }
}

module.exports = { verifyUserToken }