const knex = require('../server/connection');

const emailExists = async (email) => {
    const list = await knex("users").select("email").where({ email }).first();
    return list;
};

const userEmail = async (email) => {
    const list = await knex("users").where({ email }).first();
    return list;
};

const userExists = async (id) => {
    const list = await knex("users").where({ id }).first();
    return list;
};

const insertUser = async (name, email, encryptedPassword) => {
    name = name.trim();
    email = email.trim();
    const addedUser = await knex("users").insert({ name, email, password: encryptedPassword }).returning("*");
    return addedUser;
};

const getNameUser = async (email) => {
    const nameUser = await knex('users').select('name').where({ email }).first();
    return nameUser;
};

const updateUser = async (id, name, email, password, cpf, phone) => {
    name = name.trim();
    email = email.trim();
    cpf = cpf && cpf.trim();
    phone = phone && phone.trim();

    const userUpdated = await knex('users').where({ id }).update({ name, email, password, cpf, phone });
    return userUpdated;
};

module.exports = {
    emailExists,
    userEmail,
    userExists,
    insertUser,
    getNameUser,
    updateUser
}