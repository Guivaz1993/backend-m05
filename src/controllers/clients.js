const clientSchema = require('../validations/clientSchema');
const clientsModel = require('../models/clientsModel');
const messageError = require('../messages/errorToast');
const messageSuccess = require('../messages/successToast');


const registerClient = async (req, res) => {
    const { name, email, cpf, phone, zipcode, address, complement, district, city, state } = req.body;
    try {
        await clientSchema.registerClient.validate(req.body);
        const emailExists = await clientsModel.emailExists(email);
        if (emailExists) {
            return res.status(400).json(messageError.clientsEmailExists);
        }

        const cpfExists = await clientsModel.cpfExists(cpf.trim());
        if (cpfExists) {
            return res.status(400).json(messageError.clientsCpfExists);
        }

        const client = await clientsModel.insertClient(name, email, cpf, phone, zipcode, address, complement, district, city, state);
        if (!client.length) {
            return res.status(400).json(messageError.clientRegistrationFailed);
        }

        return res.status(201).json(messageSuccess.clientRegistrationSucceeded);

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const getClientsList = async (req, res) => {
    const { search } = req.query
    try {
        if (search) {
            const clients = await clientsModel.searchClients(search);
            if (!clients.length) {
                return res.status(404).json(messageError.noClientsToShow);
            }

            return res.status(200).json(clients);
        }
        const clients = await clientsModel.listClients();
        if (!clients.length) {
            return res.status(404).json(messageError.noClientsToShow);
        }

        return res.status(200).json(clients);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const getClient = async (req, res) => {
    const { id } = req.params;

    try {
        const client = await clientsModel.getClientById(id)
        if (!client) {
            return res.status(404).json(messageError.noClientsToShow);
        }

        return res.status(200).json(client);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const updateClient = async (req, res) => {
    const { name, email, cpf,
        phone, zipcode, address,
        complement, district, city, state } = req.body;
    const { id } = req.params;
    if (!id) {
        return res.status(404).json(messageError.clientNotFound);
    }

    if (name && name.trim() === "" || email && email.trim() === "" || cpf && cpf.trim() === "" || phone && phone.trim() === "") {
        return res.status(400).json(messageError.mandatoryInfo)
    }

    try {
        await clientSchema.editClient.validate(req.body)

        const clientExists = await clientsModel.getClientById(id)
        if (!clientExists) {
            return res.status(404).json(messageError.clientNotFound);
        }

        if (email && email !== clientExists.email) {
            const emailExists = await clientsModel.emailExists(email.trim());

            if (emailExists) {
                return res.status(404).json(messageError.clientsEmailExists)
            }
        }

        if (cpf && cpf !== clientExists.cpf) {
            const cpfExists = await clientsModel.cpfExists(cpf.trim());
            if (cpfExists) {
                return res.status(400).json(messageError.clientsCpfExists);
            }
        }

        const clientUpdated = await clientsModel.updateClient(id, name, email, cpf, phone, zipcode, address, complement, district, city, state);
        if (!clientUpdated) {
            return res.status(400).json(messageError.clientUpdate);
        }

        return res.status(200).json(messageSuccess.clientUpdate);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const countClientsByStatus = async (req, res) => {
    const { status } = req.params;

    try {
        const count = await clientsModel.countClientsByStatus(status)

        return res.status(200).json(count)
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const countClients = async (req, res) => {
    try {
        const list = await clientsModel.countClients();

        return res.status(200).json(list);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const listDefaulterClient = async (req, res) => {
    try {
        const clients = await clientsModel.listDefaulterClient();
        if (!clients.length) {
            return res.status(404).json(messageError.noClientsToShow);
        }

        return res.status(200).json(clients);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const listDebtFreeClient = async (req, res) => {
    try {
        const clients = await clientsModel.listDebtFreeClient();
        if (!clients.length) {
            return res.status(404).json(messageError.noClientsToShow);
        }

        return res.status(200).json(clients);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    registerClient,
    getClientsList,
    updateClient,
    getClient,
    countClients,
    countClientsByStatus,
    listDefaulterClient,
    listDebtFreeClient
}

