import express from "express";
import { login, consultarSaldo } from "../controllers/atmController.js";
import { verificarToken } from "../middlewares/autenticacao.js";

const router = express.Router();

router.post("/login", login);
router.get("/saldo", verificarToken, consultarSaldo);

export default router;