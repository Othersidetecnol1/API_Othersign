exports.getCampaignInsights = async (campaignId, datePreset = 'last_30d') => {
  try {
    console.log('📊 Buscando insights da campanha');
    console.log('➡️ Campanha:', campaignId);

    const response = await axios.get(
      `${META_BASE_URL}/${campaignId}/insights`,
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
          date_preset: datePreset
        }
      }
    );

    console.log('✅ Insights recebidos');
    return response.data;

  } catch (error) {
    console.error('❌ Erro ao buscar insights da campanha');

    if (error.response) {
      console.error(JSON.stringify(error.response.data, null, 2));
    }

    throw error;
  }
};
