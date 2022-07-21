const debtsModel = require('../models/debtsModel');
const clientsModel = require('../models/clientsModel');

const messageSuccess = require('../messages/successToast');

const wakeUp = async (req, res) => {
    try {
        res.status(200).json(messageSuccess.welcome)
    } catch (error) {
        res.stats(500).json(error.message)
    }
}

const updateData = async (req, res) => {
    try {
        await debtsModel.updateExpiredDebt();

        await clientsModel.updateDefaulterClient()

        res.status(204).json()
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = {
    wakeUp,
    updateData
}