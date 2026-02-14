const axios = require("axios");

async function getCampaignInsights(campaignId) {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v18.0/${campaignId}/insights`,
      {
        params: {
          access_token: process.env.META_ACCESS_TOKEN,
          fields: "impressions,clicks,spend,cpc,ctr"
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("STATUS:", error.response?.status);
    console.error("DATA:", error.response?.data);
    throw new Error("Erro ao buscar insights da campanha");
  }
}

module.exports = { getCampaignInsights };
