const yup = require('./config');

const registerClient = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().trim().required(),
  cpf: yup.string().trim().required(),
  phone: yup.string().trim().required(),
});

const editClient = yup.object().shape({
  name: yup.string().trim().max(180, "O campo nome não pode ter mais que 180 caracteres."),
  email: yup.string().trim().max(180, "O campo nome não pode ter mais que 180 caracteres."),
  cpf: yup.string().trim().max(14, "O campo cpf não pode ter mais que 14 caracteres."),
  phone: yup.string().trim().max(15, "O campo telefone não pode ter mais que 15 caracteres.")
});


module.exports = {
  registerClient,
  editClient
};
