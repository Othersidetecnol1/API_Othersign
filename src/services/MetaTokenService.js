const axios = require('axios');

class MetaTokenService {
  static async exchangeToken() {
    const {
      META_APP_ID,
      META_APP_SECRET,
      META_SHORT_LIVED_TOKEN
    } = process.env;

    if (!META_APP_ID || !META_APP_SECRET || !META_SHORT_LIVED_TOKEN) {
      throw new Error('Variáveis de ambiente da Meta não configuradas');
    }

    const url = 'https://graph.facebook.com/v19.0/oauth/access_token';

    const response = await axios.get(url, {
      params: {
        grant_type: 'fb_exchange_token',
        client_id: META_APP_ID,
        client_secret: META_APP_SECRET,
        fb_exchange_token: META_SHORT_LIVED_TOKEN
      }
    });

    return response.data.access_token;
  }
}

module.exports = MetaTokenService;