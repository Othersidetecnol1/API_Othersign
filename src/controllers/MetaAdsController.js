const MetaAdsService = require('../services/MetaAdsService');

exports.getInsights = async (req, res) => {
  try {
    const { ad_account_id } = req.query;

    if (!ad_account_id) {
      return res.status(400).json({
        error: 'Informe o ad_account_id'
      });
    }

    const insights = await MetaAdsService.getInsights(ad_account_id);

    return res.json(insights);
  } catch (error) {
    return res.status(500).json({
      error: 'Erro ao buscar insights da Meta',
      details: error.response?.data || error.message
    });
  }
};
