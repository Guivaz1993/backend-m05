module.exports = {
  users: [{
    id:1,
    name:"Primeiro usuário",
    email:"primeiro@email.com",
    password:"senhasenha",
    cpf:"123.456.789-12",
    phone:"12 1212-1212"
  }],
  clients: [],
  debts: [],
  status_client: [
    { id: 1, status_client: "Inadimplente" },
    { id: 2, status_client: "Em dia" },
  ],
  status_debt:[
    { id: 1, status_client: "Pendente" },
    { id: 2, status_client: "Pago" },
    { id: 3, status_client: "Vencido" },
  ]
};
