const MetaAdsService = require('../services/MetaAdsService');
const CacheService = require('../services/CacheService');

class MetaAdsController {
  static async summary(req, res) {
    try {
      const { ad_account_id, period } = req.query;

      if (!ad_account_id) {
        return res.status(400).json({
          status: 'error',
          message: 'ad_account_id é obrigatório'
        });
      }

      const datePreset = period || 'last_7d';

      // 🔍 Cache por período
      const cache = CacheService.readCache(datePreset);

      if (CacheService.isCacheValid(cache)) {
        return res.json({
          status: 'cache',
          period: datePreset,
          ...cache.data
        });
      }

      const response = await MetaAdsService.getInsights(ad_account_id, datePreset);

      if (!response.data || response.data.length === 0) {
        return res.json({
          status: 'waiting',
          period: datePreset,
          impressions: 0,
          clicks: 0,
          spend: 0
        });
      }

      const summary = response.data.reduce(
        (acc, item) => {
          acc.impressions += Number(item.impressions || 0);
          acc.clicks += Number(item.clicks || 0);
          acc.spend += Number(item.spend || 0);
          return acc;
        },
        { impressions: 0, clicks: 0, spend: 0 }
      );

      CacheService.writeCache(datePreset, summary);

      return res.json({
        status: 'ok',
        source: 'meta',
        period: datePreset,
        ...summary
      });

    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Erro ao gerar resumo',
        detalhe: error.response?.data || error.message
      });
    }
  }
}

module.exports = MetaAdsController;
