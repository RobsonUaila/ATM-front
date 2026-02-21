import { autenticarConta, consultarSaldoService } from "../services/atmService.js";

export async function login(req, res) {
  try {
    const { numeroConta, pin } = req.body;

    const token = await autenticarConta(numeroConta, pin);

    res.json({
      mensagem: "Login realizado com sucesso",
      token
    });

  } catch (erro) {
    res.status(400).json({
      erro: erro.message
    });
  }
}

export async function consultarSaldo(req, res) {
  try {
    const idConta = req.usuario.idConta;
    const saldo = await consultarSaldoService(idConta);
    res.json(saldo);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
}