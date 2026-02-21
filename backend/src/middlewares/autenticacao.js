import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function verificarToken(req, res, next) {
  const cabecalho = req.headers.authorization;

  if (!cabecalho) {
    return res.status(401).json({ mensagem: "Token não fornecido" });
  }

  const token = cabecalho.split(" ")[1];

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = dados;
    next();
  } catch (erro) {
    return res.status(401).json({ mensagem: "Token inválido" });
  }
}