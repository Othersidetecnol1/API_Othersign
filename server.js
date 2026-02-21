require('dotenv').config();

console.log('🔥 server.js foi executado');
console.log(
  'META_ACCESS_TOKEN:',
  process.env.META_ACCESS_TOKEN ? 'CARREGADO ✅' : 'NÃO CARREGADO ❌'
);

// 🔹 Importa o app Express (onde o express() é criado)
const app = require('./src/app');

// 🔹 Rotas
const authCheckRoutes = require('./src/routes/authCheckRoutes');
const healthRoutes = require('./src/routes/health.routes');
const registerRoutes = require('./src/routes');

// 🔹 Registra rotas DIRETAMENTE no app
app.use(authCheckRoutes);
// app.use(healthRoutes); // opcional
registerRoutes(app);

// 🔹 Porta
const PORT = process.env.PORT || 3333;

// 🔹 Sobe o servidor
app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});