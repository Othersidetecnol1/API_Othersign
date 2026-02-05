const axios = require('axios');
const META_BASE_URL = 'https://graph.facebook.com/v19.0';

exports.getInsights = async (adAccountId, datePreset) => {
  try {
    console.log('📊 Buscando insights da Meta');
    console.log('➡️ Conta:', adAccountId);
    console.log('➡️ Período:', datePreset);

    const response = await axios.get(
      `${META_BASE_URL}/act_${adAccountId}/insights`,
      {
        params: {
          access_token: process.env.META_ACCESS_TOKEN,
          fields: 'impressions,clicks,spend',
          date_preset: datePreset
        }
      }
    );

    console.log('✅ Insights recebidos da Meta');
    return response.data;

  } catch (error) {
    console.error('❌ Erro ao buscar insights');

    if (error.response) {
      console.error(JSON.stringify(error.response.data, null, 2));
    }

    throw error;
  }
};
