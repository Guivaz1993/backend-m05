const express = require('express');
const user = require('../controllers/users');
const client = require('../controllers/clients');
const debts = require('../controllers/debts');
const utils = require('../controllers/utils')

const userTokenVerify = require('../middlewares/userTokenVerify');

const route = express();

route.get("/wakeup", utils.wakeUp)
route.get("/verify/email/:email", user.verifyEmail);
route.post("/signup", user.signUpUser);
route.get("/user/name/:email", user.keepNameOfUser);
route.post("/login", user.login);

route.use(userTokenVerify);

route.get("/user", user.userData);
route.patch("/user/edit", user.updateUser);

route.post("/client/create", client.registerClient);
route.get("/client/list", client.getClientsList);
route.get("/client/:id", client.getClient);
route.patch("/client/update/:id", client.updateClient);

route.get("/count/client", client.countClients);
route.get("/count/client/:status", client.countClientsByStatus);

route.get("/list/clients/defaulter", client.listDefaulterClient);
route.get("/list/clients/debt-free", client.listDebtFreeClient);


route.get("/debts", debts.getDebtsList);
route.get("/debts/clients/:id", debts.getDebtsListByClient);
route.post("/debts/create", debts.addDebt);
route.get("/debts/:id", debts.getDebtDetails);
route.patch("/debts/update/:id", debts.updateDebt);
route.delete("/debts/delete/:id", debts.deleteDebtById);

route.get("/sum/debts/:status", debts.sumDebtsByStatus);
route.get("/sum/debts", debts.sumDebts);

route.get("/count/debts/:status", debts.countDebtsByStatus);
route.get("/count/debts", debts.countDebts);

route.get("/list/debts/paid", debts.listPaidDebts);
route.get("/list/debts/pending", debts.listPendingDebts);
route.get("/list/debts/expired", debts.listExpiredDebts);

route.get("/updatedata", utils.updateData)

module.exports = route;
