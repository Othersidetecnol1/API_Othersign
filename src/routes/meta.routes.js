const express = require('express');
const router = express.Router();
const MetaAdsController = require('../controllers/MetaAdsController');

// 🔎 Teste
router.get('/test', (req, res) => {
  res.json({ ok: true });
});

// 📊 Summary
router.get('/summary', MetaAdsController.summary);

module.exports = router;
