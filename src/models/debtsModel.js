const knex = require('../server/connection');

const listDebts = async () => {
    const list = await knex("debts as d")
        .select("d.id", "c.name", "d.description", "d.value", "d.due_date", "s.status")
        .join("clients as c", "d.client_id", "=", "c.id")
        .join("status_debt as s", "d.statusDebt_id", "=", "s.id")
        .orderBy('id', 'desc')
        .returning("*");
    return list;
}

const listDebtDetails = async (id) => {
    const debt = await knex("debts as d")
        .where({ "d.id": id })
        .select("d.id", "c.name", "d.description", "d.value", "d.due_date", "s.status")
        .join("clients as c", "d.client_id", "=", "c.id")
        .join("status_debt as s", "d.statusDebt_id", "=", "s.id")
        .first();
    return debt;
}

const listDebtsByClient = async (id) => {
    const list = await knex("debts")
        .where({ client_id: id })
        .select("debts.id as id", "debts.due_date", "debts.value", "debts.description", "status_debt.status")
        .join("status_debt", "debts.statusDebt_id", "=", "status_debt.id")
        .orderBy('id', 'desc')
        .returning("*")
    return list
}

const insertDebt = async (client_id, description, statusDebt_id, value, due_date) => {
    description = description && description.trim();

    const debt = await knex("debts")
        .insert({ client_id, description, statusDebt_id, value, due_date })
        .returning("*");

    return debt;
}

const deleteDebt = async (id) => {

    const debt = await knex("debts")
        .where({ id })
        .del()
        .returning("*");

    return debt;
}

const getDebtById = async (id) => {

    const debt = await knex("debts")
        .where({ id })
        .first();

    return debt;
}


const updateDebt = async ({ id, description, statusDebt_id, value, due_date }) => {
    description = description && description.trim();
    due_date = due_date && new Date(due_date);
    value = value && parseInt(value);

    const response = await knex('debts')
        .where({ id })
        .update({
            description,
            statusDebt_id,
            value,
            due_date,
        }).returning("*");
    return response
}

const sumDebtsByStatus = async (status) => {
    const response = await knex('debts')
        .where({ statusDebt_id: status })
        .sum("value")
        .first()
    return response
}

const sumDebts = async () => {
    const response = await knex('debts').select("status_debt.id", "status_debt.status", knex.raw("SUM(debts.value)"))
        .join("status_debt", "debts.statusDebt_id", "=", "status_debt.id")
        .groupBy('status_debt.id')
        .returning("*")
    return response
}
const countDebtsByStatus = async (status) => {
    const response = await knex('debts')
        .where({ statusDebt_id: status })
        .count('id')
        .first()
    return response
}

const countDebts = async () => {
    const response = await knex('debts')
        .select("status_debt.id", "status_debt.status", knex.raw("COUNT(debts.id)"))
        .join("status_debt", "debts.statusDebt_id", "=", "status_debt.id")
        .groupBy('status_debt.id')
        .returning("*")
    return response
}

const searchDebts = async (search) => {
    const list = await knex("debts as d")
        .select("d.id", "c.name", "d.description", "d.value", "d.due_date", "s.status")
        .whereILike("name", `%${search}%`)
        .orWhere(knex.raw("CAST(d.id AS VARCHAR)"), "ILIKE", `%${search}%`)
        .orWhere("status", "LIKE", search)
        .join("clients as c", "d.client_id", "=", "c.id")
        .join("status_debt as s", "d.statusDebt_id", "=", "s.id")
        .orderBy('id', 'desc')
        .returning("*");
    return list;
}

const listPaidDebts = async () => {
    const list = knex("debts as d")
        .where("d.statusDebt_id", "=", "2")
        .select("c.name", "d.id", "d.value")
        .join("clients as c", "d.client_id", "=", "c.id")
        .orderBy("id", "desc")
        .limit(4);

    return list;
}

const listPendingDebts = async () => {
    const list = knex("debts as d")
        .where("d.statusDebt_id", "=", "1")
        .select("c.name", "d.id", "d.value")
        .join("clients as c", "d.client_id", "=", "c.id")
        .orderBy("id", "desc")
        .limit(4);

    return list;
}

const listExpiredDebts = async () => {
    const list = knex("debts as d")
        .where("d.statusDebt_id", "=", "3")
        .select("c.name", "d.id", "d.value")
        .join("clients as c", "d.client_id", "=", "c.id")
        .orderBy("id", "desc")
        .limit(4);

    return list;
}

const updateExpiredDebt = async () => {
    const list = knex("debts")
        .where(knex.raw('due_date < CURRENT_DATE'))
        .andWhere("statusDebt_id", 1)
        .update({ "statusDebt_id": "3" })
        .returning("*");
    return list;
}

module.exports = {
    listDebts,
    listDebtsByClient,
    insertDebt,
    deleteDebt,
    listDebtDetails,
    getDebtById,
    updateDebt,
    sumDebtsByStatus,
    sumDebts,
    countDebtsByStatus,
    countDebts,
    searchDebts,
    listPaidDebts,
    listPendingDebts,
    listExpiredDebts,
    updateExpiredDebt
}
