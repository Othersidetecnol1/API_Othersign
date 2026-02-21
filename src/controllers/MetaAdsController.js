const MetaAdsService = require('../services/MetaAdsService');
const CacheService = require('../services/CacheService');
const UserMetaService = require('../services/UserMetaService');

class MetaAdsController {
  static async summary(req, res) {
    try {
      const uid = req.user.uid;
      const { period } = req.query;

      const datePreset = period || 'last_7d';

      // 🔐 Buscar dados Meta do usuário no Firestore
      const metaData = await UserMetaService.getMetaData(uid);

      if (!metaData) {
        return res.status(400).json({
          status: 'error',
          message: 'Conta Meta não configurada para este usuário'
        });
      }

      const { ad_account_id, access_token } = metaData;

      if (!ad_account_id || !access_token) {
        return res.status(400).json({
          status: 'error',
          message: 'Dados da Meta incompletos'
        });
      }

      // 🔍 Cache por usuário + período
      const cacheKey = `${uid}_${datePreset}`;
      const cache = CacheService.readCache(cacheKey);

      if (CacheService.isCacheValid(cache)) {
        return res.json({
          status: 'cache',
          period: datePreset,
          ...cache.data
        });
      }

      // 📊 Buscar dados da Meta
      const response = await MetaAdsService.getInsights(
        ad_account_id,
        datePreset,
        access_token
      );

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

      CacheService.writeCache(cacheKey, summary);

      return res.json({
        status: 'ok',
        source: 'meta',
        period: datePreset,
        ...summary
      });

    } catch (error) {
      console.error(error.response?.data || error.message);

      return res.status(500).json({
        status: 'error',
        message: 'Erro ao gerar resumo',
        detalhe: error.response?.data || error.message
      });
    }
  }
}

module.exports = MetaAdsController;