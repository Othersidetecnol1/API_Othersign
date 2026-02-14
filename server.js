require('dotenv').config();

const express = require('express');
const cors = require('cors');

// 🔥 Caminho correto usando sua estrutura com src
const metaRoutes = require('./src/routes/meta.routes');

const app = express();

// =============================
// 🔧 MIDDLEWARES
// =============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =============================
// 📌 ROTA BASE
// =============================
app.get('/', (req, res) => {
  res.status(200).json({
    message: '🚀 API Meta Ads rodando com sucesso!'
  });
});

// =============================
// 📌 ROTAS DA META
// =============================
app.use('/meta', metaRoutes);

// =============================
// ❌ ROTA NÃO ENCONTRADA
// =============================
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada'
  });
});

// =============================
// 🚨 TRATAMENTO GLOBAL DE ERRO
// =============================
app.use((err, req, res, next) => {
  console.error('🔥 Erro inesperado:', err.stack);

  res.status(500).json({
    error: 'Erro interno do servidor'
  });
});

// =============================
// 🚀 INICIAR SERVIDOR
// =============================
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
