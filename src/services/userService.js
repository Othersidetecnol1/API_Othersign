const admin = require('../config/firebase');
const db = admin.firestore();

class UserService {
  static async getUserMeta(uid) {
    const doc = await db.collection('users').doc(uid).get();

    if (!doc.exists) {
      throw new Error('Usuário não encontrado no Firestore');
    }

    const data = doc.data();

    if (!data.meta || !data.meta.ad_account_id || !data.meta.meta_access_token) {
      throw new Error('Conta Meta não configurada');
    }

    return {
      adAccountId: data.meta.ad_account_id,
      accessToken: data.meta.meta_access_token
    };
  }
}

module.exports = UserService;