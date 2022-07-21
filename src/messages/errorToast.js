const errorToast = {
    userExists: 'Já existe um usuário cadastrado com o e-mail informado.',
    userSignupFailed: 'Não foi possível cadastrar o usuário.',
    mandatoryInfo: 'Este campo é obrigatório.',
    mandatoryDebtInfo: 'Todos os campos devem estar preehchidos.',
    clientsEmailExists: 'Já existe um cliente cadastrado com o e-mail informado.',
    clientRegistrationFailed: 'Não foi possível cadastrar o cliente.',
    addingDebtFailed: 'Não foi possível inserir a cobrança',
    clientsCpfExists: 'Já existe um cliente cadastrado com o cpf informado.',
    loginError: 'Email ou senha não está correto.',
    userNotFound: 'Usuário não encontrado.',
    clientNotFound: 'Cliente não encontrado.',
    notAuthorization: 'Usuário não autenticado.',
    noClientsToShow: 'Não há clientes cadastrados.',
    noDebtsToShow: 'Não há cobranças cadastradas.',
    noDebtDetails: 'Não foi encontrada uma cobrança com este id.',
    noData: 'É obrigatório informar ao menos um campo para atualização',
    userUpdate: 'O usuário não foi atualizado.',
    clientUpdate: 'O cliente não foi atualizado.',
    debtUpdate: 'A cobrança não foi atualizada.',
    nameNotFound: 'Não foi possível encontrar o nome do usuário',
    debtDeletedOrInexistent: 'Cobrança já foi deletada ou inexiste',
    onlyPendingDebts: 'Apenas cobranças com status Pendente podem ser excluídas',
    dueDateBeforeToday: 'Apenas cobranças cuja data de vencimento seja hoje ou em data posterior a hoje podem ser excluídas.',
    cantDeleteTryAgain: 'Não foi possível excluir a cobrança. Tente novamente mais tarde.'

}

module.exports = errorToast 