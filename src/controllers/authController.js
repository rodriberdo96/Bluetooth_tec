const AuthService = require('../services/authServices')
const authService = new AuthService()

class authControllers {

    async register(req, res) {
        try {
            const newUser = await authService.register(req.body) 
            res.status(200).json(newUser)
        }catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async login(req, res) {
        try{    
            const user = await authService.login(req.body)
            const cookieExpires = process.env.COOKIE_TIME
            res.cookie('token-cookie', user.token , { maxAge: cookieExpires, httpOnly: true });
            res.status(200).json({token: user.token})
        }catch(error){
            res.status(403).json({message: error.message})
        }
    }
}

module.exports = authControllers