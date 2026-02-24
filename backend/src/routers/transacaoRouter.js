import express from 'express';
import { criarTransferenciaInterna, criarDeposito, consultarSaldo, consultarExtrato } from '../controllers/transacaoController.js';

const router = express.Router();

// Transferência Interna
router.post('/transferencias/interna', criarTransferenciaInterna);

// Depósito
router.post('/depositos', criarDeposito);

// Consulta de Saldo
router.get('/conta/saldo', consultarSaldo);

// Extrato
router.get('/extrato', consultarExtrato);

export default router;