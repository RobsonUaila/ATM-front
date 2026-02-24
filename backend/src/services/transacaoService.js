import {
    buscarContaPorNumero,
    atualizarSaldoConta,
    registrarTransacao,
    listarTransacoes
} from '../repositories/transacaoRepository.js';

// Transferência Interna
export async function transferirInterno(contaDestino, montante, descricao = '') {
    // Aqui consideramos que existe uma conta origem fixa para simplificar
    const contaOrigem = '0001'; // exemplo de conta fixa para demo

    if (montante <= 0) throw new Error('Montante deve ser maior que zero');

    const origem = await buscarContaPorNumero(contaOrigem);
    const destino = await buscarContaPorNumero(contaDestino);

    if (!origem) throw new Error('Conta de origem não encontrada');
    if (!destino) throw new Error('Conta destino não encontrada');

    if (origem.saldoDisponivel < montante) throw new Error('Saldo insuficiente');

    // Atualizar saldos
    origem.saldoDisponivel -= montante;
    origem.saldoContabilistico -= montante;
    destino.saldoDisponivel += montante;
    destino.saldoContabilistico += montante;

    await atualizarSaldoConta(origem);
    await atualizarSaldoConta(destino);

    // Registrar transação
    const transacao = await registrarTransacao({
        tipo: 'transferencia',
        contaOrigem,
        contaDestino,
        montante,
        descricao,
        data: new Date()
    });

    return transacao;
}

// Depósito
export async function depositar(contaDestino, montante) {
    if (montante <= 0) throw new Error('Montante deve ser maior que zero');

    const destino = await buscarContaPorNumero(contaDestino);
    if (!destino) throw new Error('Conta destino não encontrada');

    destino.saldoDisponivel += montante;
    destino.saldoContabilistico += montante;

    await atualizarSaldoConta(destino);

    const transacao = await registrarTransacao({
        tipo: 'deposito',
        contaOrigem: null,
        contaDestino,
        montante,
        descricao: 'Depósito',
        data: new Date()
    });

    return transacao;
}

// Consulta de Saldo
export async function obterSaldo() {
    // Para simplificar, consideramos conta única
    const conta = await buscarContaPorNumero('0001');
    if (!conta) throw new Error('Conta não encontrada');

    return {
        disponivel: conta.saldoDisponivel,
        contabilistico: conta.saldoContabilistico
    };
}

// Extrato
export async function gerarExtrato(dataInicio, dataFim) {
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    if (isNaN(inicio) || isNaN(fim)) throw new Error('Datas inválidas');

    const transacoes = await listarTransacoes(inicio, fim);
    return transacoes;
}