const express = require('express');
const metaRoutes = require('./routes/meta.routes');

const app = express();

app.use(express.json());
app.use('/meta', metaRoutes);

app.get('/teste', (req, res) => {
  res.send('API FUNCIONANDO');
});

module.exports = app;
