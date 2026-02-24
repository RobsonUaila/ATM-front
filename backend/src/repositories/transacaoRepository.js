import { conexaoMySQL } from "../database/conexao.js";

// Buscar conta pelo número da conta
export async function buscarContaPorNumero(numeroConta) {
    const conexao= await conexaoMySQL;
    const [rows] = await conexao.execute(
        'SELECT * FROM contas_AppBank WHERE numero_conta = ?',
        [numeroConta]
    );
    return rows[0] || null;
}

// Atualizar saldo da conta
export async function atualizarSaldoConta(conta) {
        const conexao= await conexaoMySQL;

    await conexao.execute(
        `UPDATE contas_AppBank 
         SET saldo = ? 
         WHERE id = ?`,
        [conta.saldo, conta.id]
    );
    return conta;
}

// Registrar transação
export async function registrarTransacao({ tipo, contaOrigemId, contaDestinoId, valor, descricao }) {
        const conexao= await conexaoMySQL;

    const [result] = await conexao.execute(
        `INSERT INTO transacoes_AppBank
        (conta_origem_id, conta_destino_id, tipo, valor, descricao)
        VALUES (?, ?, ?, ?, ?)`,
        [contaOrigemId, contaDestinoId, tipo, valor, descricao]
    );

    const [rows] = await conexao.execute(
        'SELECT * FROM transacoes_AppBank WHERE id = ?',
        [result.insertId]
    );

    return rows[0];
}

// Listar transações entre datas
export async function listarTransacoes(dataInicio, dataFim) {
        const conexao= await conexaoMySQL;

    const [rows] = await conexao.execute(
        `SELECT t.*, co.numero_conta AS conta_origem, cd.numero_conta AS conta_destino
         FROM transacoes_AppBank t
         LEFT JOIN contas_AppBank co ON t.conta_origem_id = co.id
         LEFT JOIN contas_AppBank cd ON t.conta_destino_id = cd.id
         WHERE t.criada_em BETWEEN ? AND ?
         ORDER BY t.criada_em DESC`,
        [dataInicio, dataFim]
    );

    return rows;
}