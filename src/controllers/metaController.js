const MetaAdsService = require('../services/MetaAdsService');

exports.getCampaignInsights = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { datePreset } = req.query;

    const data = await MetaAdsService.getCampaignInsights(
      campaignId,
      datePreset
    );

    res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Erro ao buscar insights da campanha'
    });
  }
};
