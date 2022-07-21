const yup = require('./config');

const addDebt = yup.object().shape({
  client_id: yup.string().trim().required(),
  description: yup.string().trim().required(),
  statusDebt: yup.string().trim(),
  value: yup.string().trim().required(),
  due_date: yup.date().required(),
});

const updateDebt = yup.object().shape({
  description: yup.string().trim(),
  status: yup.string().trim(),
  value: yup.string().trim(),
  due_date: yup.string().trim()
});


module.exports = {
  addDebt, updateDebt
};
