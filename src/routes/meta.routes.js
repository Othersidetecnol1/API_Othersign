const express = require('express');
const router = express.Router();

const firebaseAuth = require('../middlewares/firebaseAuth');
const MetaAdsController = require('../controllers/MetaAdsController');

// Rota correta
router.get('/meta/summary', firebaseAuth, MetaAdsController.getSummary);

module.exports = router;
