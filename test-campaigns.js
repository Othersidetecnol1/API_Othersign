require('dotenv').config();
const axios = require('axios');

const META_BASE_URL = 'https://graph.facebook.com/v19.0';

// 🔥 COLOQUE AQUI A CONTA CONFIRMADA
const AD_ACCOUNT_ID = '1312996493962714'; // sem o "act_"

async function getCampaigns() {
  try {
    console.log('📂 Buscando campanhas da conta...');
    console.log('➡️ Conta:', AD_ACCOUNT_ID);

    const response = await axios.get(
      `${META_BASE_URL}/act_${AD_ACCOUNT_ID}/campaigns`,
      {
        params: {
          access_token: process.env.META_ACCESS_TOKEN,
          fields: 'id,name,status,objective'
        }
      }
    );

    console.log('✅ Campanhas recebidas');
    console.log(JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.error('❌ Erro ao buscar campanhas');

    if (error.response) {
      console.error(JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
  }
}

getCampaigns();
