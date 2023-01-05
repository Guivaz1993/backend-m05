const emailExists = async (usersModel, email) => {
  const emailExists = await usersModel.emailExists(email);
  return emailExists;
};

const userEmail = async (usersModel, email) => {
  const user = await usersModel.userEmail(email);
  return user;
};

const userExists = async (usersModel, id) => {
  const user = await usersModel.userExists(id);
  return user;
};
const insertUser = async (usersModel, data) => {
  const { name, email, encryptedPassword } = data;
  if (!name || !email || !encryptedPassword) {
    return new Error("Não foi possível criar o usuário");
  }
  const user = await usersModel.insertUser(name, email, encryptedPassword);
  return user;
};

const getNameUser = async (usersModel, email) => {
  const user = await usersModel.getNameUser(email);
  return user;
};

const updateUser = async (usersModel, data) => {
  const { id, name, email, password, cpf, phone } = data;
  if (!id) {
    return new Error(
      "Não foi possível atualizar o usuário pois é necessário informar o id do usuário"
    );
  }
  if (!name && !email && !password && !cpf && !phone) {
    return new Error(
      "Não foi possível atualizar o usuário e necessário informar algum campo para ser alterado"
    );
  }
  const user = await usersModel.updateUser(
    id,
    name,
    email,
    password,
    cpf,
    phone
  );
  return user;
};

module.exports = {
  emailExists,
  userEmail,
  userExists,
  insertUser,
  getNameUser,
  updateUser,
};
