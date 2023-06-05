const AuthDaoClass = require('../daos/authDao')
const authDao = new AuthDaoClass()
const bcrypt = require('bcrypt')
const logger = require('../utils/winston')
const moment = require('moment')



class AuthService {
    async register(data) {
        try {
            const userExist = await authDao.userExistsByEmail(data.email);
            if (!userExist) {
                if (data.hasOwnProperty('password')) {
                    const encryptedPassword = await bcrypt.hash(data.password, 10);
                    const newUser = {
                        timestamp: moment().format('L LTS'),
                        username: data.username,
                        email: data.email,
                        password: encryptedPassword
                    };
                    const userAdded = await authDao.register(newUser);
                    return userAdded;
                } else {
                    logger.warn("La propiedad 'password' no existe en el objeto 'data'");
                    
                }
            } else {
                logger.warn("El usuario ya existe");
            }
        } catch (error) {
            logger.error("Error en register-Services: " + error);
            throw error; 
        }
    }

    async login(data) {
        try {
            const { email, password } = data
            const user = await authDao.login(email, password)
            return user
        } catch (error) {
            logger.error("Error en login-Services: " + error)
        }
    }
    async loginGoogle(data) {
        try {
            const { email, password } = data
            const user = await authDao.login(email, password)
            return user
        } catch (error) {
            logger.error("Error en loginGoogle-Services: " + error)
        }
    }
}

module.exports = AuthService