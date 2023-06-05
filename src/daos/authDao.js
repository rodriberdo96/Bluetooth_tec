const  User  = require ('../models/userModel')
const logger = require('../utils/winston')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 

class AuthDaoClass {

    async userExistsByEmail(email) {
        try {
            const emailUser = await User.findOne({ email })
            return emailUser
        } catch (error) {
            logger.error("Error in userExists-DAO: " + error)
        }
    }

    async register(data) {
        try {
            const user = await User.create(data)
            const data = {
                id: user._id,
                email: user.email
                
            }
            return user

        } catch (error) {
            logger.error("Error in register-DAO: " + error)
        }
    }

    async login(email, password) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                logger.warn('Usuario no encontrado');
                return null; 
            }
    
            const isPasswordMatch = bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                logger.warn('Contraseña incorrecta');
                return null;
            }
    
            const payload = { id: user._id, email: user.email };
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, { expiresIn: process.env.JWT_TIME });
            return { ...payload, token };
        } catch (error) {
            logger.error("Error en login-DAO: " + error);
            throw error;
        }
    }
    async getUserByToken(tokenH) {
        let token = tokenH
        try{
            if (!tokenH) {
                return null
            }
            try{
                const tempToken = tokenH.split(' ')
                if (tempToken.length == 2) {
                    token = tempToken[1]
                }
                const secret = process.env.JWT_SECRET
                const decoded = jwt.verify(token, secret)
                const user = await UserModel.findOne({ email: decoded.email })
                return user
            } catch (error) {
                return null
            }
        }
        catch(error){
            logger.error("Error in getUserByToken-DAO: " + error)
        }
    }
}

module.exports = AuthDaoClass