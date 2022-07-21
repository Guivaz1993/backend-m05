const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');
const messageError = require('../messages/errorToast');

const jwtSecret = process.env.TOKEN_SECRET;

const userTokenVerify = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json(messageError.notAuthorization)
    }

    try {
        const { id } = jwt.verify(token, jwtSecret);

        const userExists = await userModel.userExists(id)
        if (!userExists) {
            return res.status(404).json(messageError.userNotFound)
        }
        const { password, ...user } = userExists;

        req.user = user;

        next();
    } catch (error) {
        return res.status(500).json("Sessão expirada. Por favor, por motivos de segurança faça login novamente.");
    }
}

module.exports = userTokenVerify;