
require('dotenv').config();

console.log('🔥 server.js foi executado');
console.log(
  'META_ACCESS_TOKEN:',
  process.env.META_ACCESS_TOKEN ? 'CARREGADO ✅' : 'NÃO CARREGADO ❌'
);

const app = require('./src/app');

const PORT = process.env.PORT || 3333;
const healthRoutes = require('./src/routes/health.routes');
//app.use(healthRoutes);

const registerRoutes = require('./src/routes');

registerRoutes(app);

app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});