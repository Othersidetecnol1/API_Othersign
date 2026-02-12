require('dotenv').config();
const axios = require('axios');

const META_BASE_URL = 'https://graph.facebook.com/v19.0';

// 🔥 ID da campanha
const CAMPAIGN_ID = '120236746330380689';

async function getCampaignInsights() {
  try {
    console.log('📊 Buscando insights da campanha...');
    console.log('➡️ Campanha:', CAMPAIGN_ID);

    const response = await axios.get(
      `${META_BASE_URL}/${CAMPAIGN_ID}/insights`,
      {
        params: {
          access_token: process.env.META_ACCESS_TOKEN,
          fields: `
            impressions,
            reach,
            clicks,
            spend,
            cpc,
            ctr,
            cpm
          `,
          date_preset: 'last_30d'
        }
      }
    );

    console.log('✅ Insights recebidos');
    console.log(JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.error('❌ Erro ao buscar insights');

    if (error.response) {
      console.error(JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
  }
}

getCampaignInsights();
