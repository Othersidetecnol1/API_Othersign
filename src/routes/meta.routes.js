const express = require('express');
const MetaAdsController = require('../controllers/MetaAdsController');

const router = express.Router();

router.get('/insights', MetaAdsController.getInsights);

module.exports = router;
