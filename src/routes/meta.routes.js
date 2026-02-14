const express = require('express');
const router = express.Router();

const metaController = require('../controllers/metaController');

router.get(
  '/campaign/:campaignId/insights',
  metaController.getCampaignInsights
);

module.exports = router;
