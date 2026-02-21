require('dotenv').config();
const MetaTokenService = require('../services/MetaTokenService');
const UserMetaService = require('../services/UserMetaService');

(async () => {
  try {
    console.log('🔄 Gerando token de longo prazo da Meta...');

    const longLivedToken = await MetaTokenService.exchangeToken();

    // ⚠️ temporário: UID fixo para você
    const DEV_UID = 'SEU_FIREBASE_UID_AQUI';

    await UserMetaService.saveMetaToken(DEV_UID, {
      access_token: longLivedToken,
      token_expires_at: Date.now() + 1000 * 60 * 60 * 24 * 60 // ~60 dias
    });

    console.log('✅ Token salvo no Firestore com sucesso');

  } catch (err) {
    console.error('❌ Erro ao gerar/salvar token da Meta');
    console.error(err.message);
  }

  process.exit();
})();