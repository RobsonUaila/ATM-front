import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { buscarContaPorNumero, buscarSaldoPorId } from "../repositories/contaRepository.js";

dotenv.config();

export async function autenticarConta(numeroConta, pin) {
  const conta = await buscarContaPorNumero(numeroConta);

  if (!conta) {
    throw new Error("Conta não encontrada ou bloqueada");
  }

  const pinValido = await bcrypt.compare(pin, conta.pin_hash);

  if (!pinValido) {
    throw new Error("PIN inválido");
  }

  const token = jwt.sign(
    {
      idConta: conta.id,
      numeroConta: conta.numero_conta
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
}

export async function consultarSaldoService(idConta) {
  return await buscarSaldoPorId(idConta);
}