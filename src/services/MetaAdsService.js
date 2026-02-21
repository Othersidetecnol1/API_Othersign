const axios = require('axios');

class MetaAdsService {
  /**
   * Busca insights da Meta Ads para uma conta específica
   * @param {string} adAccountId - ID numérico da conta (SEM act_)
   * @param {string} period - date_preset (ex: last_7d, last_30d, maximum)
   * @param {string} accessToken - Token de acesso da Meta (por usuário)
   */
  static async getInsights(adAccountId, period, accessToken) {
    if (!adAccountId) {
      throw new Error('adAccountId não informado');
    }

    if (!accessToken) {
      throw new Error('accessToken da Meta não informado');
    }

    const url = `https://graph.facebook.com/v19.0/act_${adAccountId}/insights`;

    console.log('📊 Buscando insights da Meta');
    console.log('➡️ Conta:', adAccountId);
    console.log('➡️ Período:', period);

    try {
      const response = await axios.get(url, {
        params: {
          access_token: accessToken,
          date_preset: period,
          fields: 'impressions,clicks,spend'
        }
      });

      return response.data;

    } catch (error) {
      console.error('❌ Erro ao buscar insights');

      // Log detalhado da Meta (se existir)
      if (error.response?.data) {
        console.error(JSON.stringify(error.response.data, null, 2));
      }

      throw error;
    }
  }
}

module.exports = MetaAdsService;