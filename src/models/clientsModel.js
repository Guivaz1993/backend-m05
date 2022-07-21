const knex = require('../server/connection');

const emailExists = async (email) => {
    const list = await knex("clients").select("email").where({ email }).first();

    return list;
};

const cpfExists = async (cpf) => {
    const list = await knex("clients").select("cpf").where({ cpf }).first();

    return list;
};

const insertClient = async (name, email, cpf, phone, zipcode, address, complement, district, city, state) => {
    name = name.trim();
    email = email.trim();
    cpf = parseInt(cpf)
    phone = parseInt(phone);
    zipcode = zipcode && parseInt(zipcode);
    address = address && address.trim();
    complement = complement && complement.trim();
    district = district && district.trim();
    city = city && city.trim();
    state = state && state.trim();

    const client = await knex("clients").insert({
        name,
        email,
        cpf,
        phone,
        zipcode,
        address,
        complement,
        district,
        city,
        state
    }).returning("*");

    return client
}

const listClients = async () => {
    const list = await knex("clients").select("clients.id as id", "name", "email", "cpf", "phone", "status")
        .join("status_client", "clients.status_id", "=", "status_client.id")
        .orderBy('id', 'desc')
        .returning("*");
    return list;
}

const getClientById = async (id) => {
    const client = await knex("clients").where({ id }).first();

    return client;
}

const updateClient = async (id, name, email, cpf, phone, zipcode, address, complement, district, city, state) => {
    name = name && name.trim();
    email = email && email.trim();
    cpf = cpf && parseInt(cpf);
    phone = phone && parseInt(phone);
    zipcode = zipcode && parseInt(zipcode);
    address = address && address.trim();
    complement = complement && complement.trim();
    district = district && district.trim();
    city = city && city.trim();
    state = state && state.trim();

    const response = await knex('clients')
        .where({ id })
        .update({
            name,
            email,
            cpf,
            phone,
            zipcode,
            address,
            complement,
            district,
            city,
            state
        }).returning("*");
    return response
}

const countClientsByStatus = async (status) => {
    const response = await knex('clients')
        .where({ status_id: status })
        .count('id')
        .first()
    return response
}

const countClients = async () => {
    const response = await knex('clients').select("status_client.id", "status_client.status", knex.raw("COUNT(clients.id)"))
        .join("status_client", "clients.status_id", "=", "status_client.id")
        .groupBy('status_client.id')
        .returning("*")
    return response
}

const searchClients = async (search) => {
    const list = await knex("clients")
        .select("clients.id as id", "name", "email", "cpf", "phone", "status")
        .whereILike("name", `%${search}%`)
        .orWhere("cpf", "Ilike", `%${search}%`)
        .orWhere("email", "Ilike", `%${search}%`)
        .orWhere("status", "LIKE", search)
        .join("status_client", "clients.status_id", "=", "status_client.id")
        .orderBy('id', 'desc')
        .returning("*");
    return list
}

const listDefaulterClient = async () => {
    const list = knex("clients")
        .where("status_id", "=", "1")
        .select("name", "id", "cpf")
        .orderBy("id", "desc")
        .limit(4);

    return list;
}

const listDebtFreeClient = async () => {
    const list = knex("clients")
        .where("status_id", "=", "2")
        .select("name", "id", "cpf")
        .orderBy("id", "desc")
        .limit(4);

    return list;
}

const updateDefaulterClient = async () => {
    const list = knex("clients")
        .where(knex.raw('clients.id IN (SELECT debts.id FROM debts WHERE "statusDebt_id"=3)'))
        .update({ "status_id": "2" })
        .returning("*");
    return list;
}


module.exports = {
    emailExists,
    cpfExists,
    insertClient,
    listClients,
    getClientById,
    updateClient,
    countClientsByStatus,
    countClients,
    searchClients,
    listDefaulterClient,
    listDebtFreeClient,
    updateDefaulterClient
}