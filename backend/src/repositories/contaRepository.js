import { conexaoMySQL } from "../database/conexao.js";

export async function buscarContaPorNumero(numeroConta) {
  const conexao = await conexaoMySQL;
  const [dados] = await conexao.execute(
    "SELECT * FROM contas_AppBank WHERE numero_conta = ? AND status = 'ativa'",
    [numeroConta]
  );
  return dados[0];
}

export async function buscarSaldoPorId(idConta) {
  const conexao = await conexaoMySQL;
  const [dados] = await conexao.execute(
    "SELECT saldo, moeda FROM contas_AppBank WHERE id = ?",
    [idConta]
  );
  return dados[0];
}