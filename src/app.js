const express = require('express');
const app = express();
const path = require('path');

const metaRoutes = require('./routes/meta.routes');

app.use(express.json());

// 🟢 HTML público
app.use(express.static(path.join(__dirname, 'public')));

// 🟢 Rotas API
app.use('/meta', metaRoutes);

module.exports = app;
