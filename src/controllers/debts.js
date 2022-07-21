const debtSchema = require('../validations/debtSchema');
const debtsModel = require('../models/debtsModel');

const messageError = require('../messages/errorToast');
const messageSuccess = require('../messages/successToast');

const addDebt = async (req, res) => {
    const { client_id, description, statusDebt_id, value, due_date } = req.body;

    try {
        await debtSchema.addDebt.validate(req.body);

        const debt = await debtsModel.insertDebt(client_id, description, statusDebt_id, value, due_date);

        if (!debt.length) {
            return res.status(400).json(messageError.addingDebtFailed);
        }

        return res.status(201).json(messageSuccess.addingDebtSucceeded);

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const getDebtsListByClient = async (req, res) => {
    const { id } = req.params

    try {
        const debts = await debtsModel.listDebtsByClient(id)

        return res.status(200).json(debts);

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const getDebtsList = async (req, res) => {
    const { search } = req.query
    try {

        if (search) {
            const debts = await debtsModel.searchDebts(search);

            if (!debts.length) {
                return res.status(404).json(messageError.noDebtsToShow);
            }

            return res.status(200).json(debts)
        }

        const debts = await debtsModel.listDebts();
        if (!debts.length) {
            return res.status(404).json(messageError.noDebtsToShow);
        }

        return res.status(200).json(debts);

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const getDebtDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const debt = await debtsModel.listDebtDetails(id);

        if (!debt) {
            return res.status(404).json(messageError.noDebtDetails);
        }

        return res.status(200).json(debt)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const updateDebt = async (req, res) => {
    const { id } = req.params;
    const { description, statusDebt_id, value, due_date } = req.body;

    if ((description && description.trim() === "") || (!statusDebt_id) || (value && isNaN(value)) || (due_date && due_date.trim() === "")) {

        return res.status(400).json(messageError.mandatoryDebtInfo)
    }

    try {
        await debtSchema.updateDebt.validate(req.body);
        const updateBody = { id };
        if (description) {
            updateBody.description = description;
        }
        if (statusDebt_id) {
            updateBody.statusDebt_id = statusDebt_id;
        }
        if (value) {
            updateBody.value = value;
        }
        if (due_date) {
            updateBody.due_date = due_date;
        }

        const debtUpdated = await debtsModel.updateDebt(updateBody);

        if (!debtUpdated.length) {
            return res.status(400).json(messageError.debtUpdate);
        }

        return res.status(200).json(messageSuccess.debtUpdate);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const deleteDebtById = async (req, res) => {
    const { id } = req.params;

    try {
        const debt = await debtsModel.getDebtById(id);

        if (!debt) {
            return res.status(404).json(messageError.debtDeletedOrInexistent);
        }

        if (debt.statusDebt_id !== 1) {
            return res.status(400).json(messageError.onlyPendingDebts)
        }

        const today = new Date();

        if (today > debt.due_date) {
            return res.status(400).json(messageError.dueDateBeforeToday);
        }

        const deletedDebt = await debtsModel.deleteDebt(id);

        if (!deletedDebt) {
            return res.status(400).json(messageError.cantDeleteTryAgain);
        }

        return res.status(200).json(messageSuccess.deletingDebtSucceeded);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const sumDebtsByStatus = async (req, res) => {
    const { status } = req.params;

    try {
        const sum = await debtsModel.sumDebtsByStatus(status)

        return res.status(200).json(sum)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const sumDebts = async (req, res) => {
    try {
        const sum = await debtsModel.sumDebts()

        return res.status(200).json(sum)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const countDebtsByStatus = async (req, res) => {
    const { status } = req.params;

    try {
        const count = await debtsModel.countDebtsByStatus(status)

        return res.status(200).json(count)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const countDebts = async (req, res) => {
    try {
        const list = await debtsModel.countDebts()

        return res.status(200).json(list)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const listPaidDebts = async (req, res) => {
    try {
        const debtList = await debtsModel.listPaidDebts();
        if (!debtList.length) {
            return res.status(404).json(messageError.noDebtsToShow);
        }

        return res.status(200).json(debtList);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const listPendingDebts = async (req, res) => {
    try {
        const debtList = await debtsModel.listPendingDebts();
        if (!debtList.length) {
            return res.status(404).json(messageError.noDebtsToShow);
        }

        return res.status(200).json(debtList);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const listExpiredDebts = async (req, res) => {
    try {
        const debtList = await debtsModel.listExpiredDebts();
        if (!debtList.length) {
            return res.status(404).json(messageError.noDebtsToShow);
        }

        return res.status(200).json(debtList);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    getDebtsList,
    getDebtsListByClient,
    addDebt,
    getDebtDetails,
    updateDebt,
    deleteDebtById,
    sumDebtsByStatus,
    sumDebts,
    countDebtsByStatus,
    countDebts,
    listPaidDebts,
    listPendingDebts,
    listExpiredDebts
}