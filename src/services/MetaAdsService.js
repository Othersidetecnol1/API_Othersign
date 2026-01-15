const axios = require('axios');

const META_BASE_URL = 'https://graph.facebook.com/v19.0';

exports.getInsights = async (adAccountId) => {
  try {
    console.log('📊 Buscando insights da Meta...');
    console.log('➡️ Conta de anúncio:', adAccountId);

    const response = await axios.get(
      `${META_BASE_URL}/act_${adAccountId}/insights`,
      {
        params: {
  access_token: process.env.META_ACCESS_TOKEN,
  fields: 'account_id,impressions,clicks,spend',
  date_preset: 'maximum'
}
      }
    );

    console.log('✅ Resposta da Meta recebida');

    return response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar insights da Meta');

    if (error.response) {
      console.error('📛 Meta API:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('📛 Erro:', error.message);
    }

    throw error;
  }
};
