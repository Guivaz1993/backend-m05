const {users} = require("../../database/in-memory/db")

const emailExists = async (email) => {
  const list = await users.some(user=>user.email===email)
  return list;
};

const userEmail = async (email) => {
  const list = await users.filter(user=>user.email===email);
  return list[0];
};

const userExists = async (id) => {
  const list = await users.filter(user=>user.id===id);
  return list[0];
};

const insertUser = async (name, email, encryptedPassword) => {
  name = name.trim();
  email = email.trim();
  const id = users[users.length-1].id
  await users.push({ id:(id+1),name, email, password: encryptedPassword })
  const user = users[users.length-1]
  return user;
};

const getNameUser = async (email) => {
  const nameUser = await users.filter(user=>user.email===email)[0].name;
  return nameUser;
};

const updateUser = async (id, name, email, password, cpf, phone) => {
  name = name && name.trim();
  email = email && email.trim();
  cpf = cpf && cpf.trim();
  phone = phone && phone.trim();

  const userUpdated = await users.find(user=>user.id===id)
  userUpdated.name=name?name:userUpdated.name
  userUpdated.email=email?email:userUpdated.email
  userUpdated.cpf=cpf?cpf:userUpdated.cpf
  userUpdated.phone=phone?phone:userUpdated.phone
  userUpdated.password=password?password:userUpdated.password
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