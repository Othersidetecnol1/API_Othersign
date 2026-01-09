const axios = require('axios');

const META_BASE_URL = 'https://graph.facebook.com/v19.0';

exports.getInsights = async (adAccountId) => {
  try {
    const response = await axios.get(
      `${META_BASE_URL}/act_${adAccountId}/insights`,
      {
        params: {
          access_token: process.env.META_ACCESS_TOKEN,
          fields: 'campaign_name,impressions,clicks,spend',
          level: 'campaign'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      'Erro Meta API:',
      error.response?.data || error.message
    );
    throw error;
  }
};
