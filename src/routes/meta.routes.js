const express = require('express');
const router = express.Router();
const MetaAdsController = require('../controllers/MetaAdsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/test', (req, res) => {
  res.json({ ok: true });
});

router.get('/summary', authMiddleware, MetaAdsController.summary);

module.exports = router;