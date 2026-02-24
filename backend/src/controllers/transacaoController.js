import {
    transferirInterno,
    depositar,
    obterSaldo,
    gerarExtrato
} from '../services/transacaoService.js';

// Transferência Interna
export async function criarTransferenciaInterna(req, res) {
    try {
        const { conta, montante, descricao } = req.body;
        if (!conta || !montante) {
            return res.status(400).json({ sucesso: false, mensagem: 'Conta e montante são obrigatórios' });
        }

        const resultado = await transferirInterno(conta, montante, descricao);
        res.json({ sucesso: true, mensagem: 'Transferência realizada com sucesso', dados: resultado });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ sucesso: false, mensagem: erro.message });
    }
}

// Depósito
export async function criarDeposito(req, res) {
    try {
        const { conta, montante } = req.body;
        if (!montante) {
            return res.status(400).json({ sucesso: false, mensagem: 'Montante é obrigatório' });
        }

        const resultado = await depositar(conta, montante);
        res.json({ sucesso: true, mensagem: 'Depósito realizado com sucesso', dados: resultado });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ sucesso: false, mensagem: erro.message });
    }
}

// Consulta de Saldo
export async function consultarSaldo(req, res) {
    try {
        const saldo = await obterSaldo();
        res.json({ saldoDisponivel: saldo.disponivel, saldoContabilistico: saldo.contabilistico });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ sucesso: false, mensagem: erro.message });
    }
}

// Extrato
export async function consultarExtrato(req, res) {
    try {
        const { dataInicio, dataFim } = req.query;
        if (!dataInicio || !dataFim) {
            return res.status(400).json({ sucesso: false, mensagem: 'Datas de início e fim são obrigatórias' });
        }

        const extrato = await gerarExtrato(dataInicio, dataFim);
        res.json(extrato);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ sucesso: false, mensagem: erro.message });
    }
}