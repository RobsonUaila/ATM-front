import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import atmRouter from "./routers/atmRouter.js";

dotenv.config();

const app = express();

// Resolver __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "../../docs/assets")));
app.use("/pages", express.static(path.join(__dirname, "../../docs/pages")));

// Permitir requisições de outros domínios (opcional)
app.use(cors());

// Aceitar JSON
app.use(express.json());

// Servir arquivos estáticos da pasta docs
app.use(express.static(path.join(__dirname, "../../docs")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/index.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../docs/Atm.html"));
});

// Rotas do backend
app.use("/atm", atmRouter);

// Iniciar servidor
const porta = process.env.PORT || 3000;
app.listen(porta, () => {
  console.log(`🚀 ACESSO AO SERVIDOR: http://localhost:${porta}`);
});