const express = require('express');
const router = express.Router();

// 🔎 Teste
router.get('/test', (req, res) => {
  res.json({ ok: true });
});

// 📊 Summary (SEM middleware)
router.get('/summary', async (req, res) => {
  const { ad_account_id } = req.query;

  if (!ad_account_id) {
    return res.status(400).json({ error: 'ad_account_id não informado' });
  }

  res.json({
    impressions: 12450,
    clicks: 312,
    spend: 187.45,
    status: 'ok'
  });
});

module.exports = router;
