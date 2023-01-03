const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersSchema = require('../validations/userSchema');
const usersModel = require('../models/usersModel');

const messageError = require('../messages/errorToast');
const messageSuccess = require('../messages/successToast');

const jwtSecret = process.env.TOKEN_SECRET;

const verifyEmail = async (req, res) => {
    const { email } = req.params;

    try {
        await usersSchema.emailFromParams.validate({ email });

        const emailExists = await usersModel.emailExists(email);
        if (emailExists) {
            return res.status(400).json(messageError.userExists);
        }

        return res.status(200).json(messageSuccess.emailAvailable);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const signUpUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await usersSchema.signUpUser.validate(req.body);
        const emailExists = await usersModel.emailExists(email);
        if (emailExists) {
            return res.status(400).json(messageError.userExists);
        }
        
        const encryptedPassword = await bcrypt.hash(password.trim(), 10);
        
        const addedUser = await usersModel.insertUser(name, email, encryptedPassword);
        if (!addedUser.length) {
            return res.status(400).json(messageError.userSignupFailed);
        }

        return res.status(201).json(messageSuccess.userSignupSucceeded);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const keepNameOfUser = async (req, res) => {
    const { email } = req.params;

    try {
        await usersSchema.emailFromParams.validate({ email });

        const nameUser = await usersModel.getNameUser(email);
        if (!nameUser) {
            return res.status(500).json(messageError.nameNotFound);
        }

        return res.status(200).json(nameUser);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        await usersSchema.loginSchema.validate({ email, password })
        const user = await usersModel.userEmail(email);
        if (!user) {
            return res.status(404).json(messageError.loginError);
        }


        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return res.status(400).json(messageError.loginError);
        }
        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "2h" });

        const { password: _, cpf: __, phone: ___, ...userData } = user;

        return res.status(200).json({
            userData: userData,
            token
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const userData = async (req, res) => {
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const updateUser = async (req, res) => {
    let { name, email, password, cpf, phone } = req.body;
    const { id } = req.user;

    try {
        await usersSchema.editUser.validate(req.body)
        const userExist = await usersModel.userExists(id);
        if (!userExist) {
            return res.status(404).json(messageError.userNotFound);
        }

        if (password) {
            password = await bcrypt.hash(password.trim(), 10);
        }

        if (email && email !== req.user.email) {
            const emailExists = await usersModel.emailExists(email);

            if (emailExists) {
                return res.status(404).json(messageError.userExists)
            }
        }

        const userUpdated = await usersModel.updateUser(id, name, email, password, cpf, phone)
        if (!userUpdated) {
            return res.status(400).json(messageError.userUpdate);
        }

        return res.status(200).json(messageSuccess.userUpdate);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    verifyEmail,
    signUpUser,
    keepNameOfUser,
    login,
    userData,
    updateUser
}