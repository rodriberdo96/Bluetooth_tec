const express =  require('express')
const routesAuth = express.Router()

const authControllers = require('../controllers/authController')
const authController = new authControllers()

routesAuth.get ('/register', authController.register)
routesAuth.post('/register', authController.register)
routesAuth.get ('/login', authController.login)
routesAuth.post('/login', authController.login)
routesAuth.post('/loginGoogle', authController.loginGoogle)
routesAuth.get ('/loginGoogle', authController.loginGoogle)



module.exports = { routesAuth }