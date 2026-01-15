const MetaAdsService = require('../services/MetaAdsService');
const CacheService = require('../services/CacheService');

exports.getSummary = async (req, res) => {
  try {
    const { ad_account_id } = req.query;

    if (!ad_account_id) {
      return res.status(400).json({
        status: 'error',
        message: 'ad_account_id é obrigatório'
      });
    }

    // 🔍 Lê cache
    const cache = CacheService.readCache();

    if (CacheService.isCacheValid(cache)) {
      return res.json({
        status: 'cache',
        message: 'Dados retornados do cache',
        ...cache.data
      });
    }

    // 🌐 Busca na Meta
    const response = await MetaAdsService.getInsights(ad_account_id);

    if (!response.data || response.data.length === 0) {
      return res.json({
        status: 'waiting',
        message: 'A Meta ainda não consolidou os dados da campanha.',
        impressions: 0,
        clicks: 0,
        spend: 0
      });
    }

    // 📊 Consolida dados
    const summary = response.data.reduce(
      (acc, item) => {
        acc.impressions += Number(item.impressions || 0);
        acc.clicks += Number(item.clicks || 0);
        acc.spend += Number(item.spend || 0);
        return acc;
      },
      { impressions: 0, clicks: 0, spend: 0 }
    );

    // 💾 Salva cache
    CacheService.writeCache(summary);

    return res.json({
      status: 'ok',
      source: 'meta',
      ...summary
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Erro ao gerar resumo',
      detalhe: error.response?.data || error.message
    });
  }
};
