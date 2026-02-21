const admin = require('../config/firebase');

const db = admin.firestore();

class UserMetaService {
  static async saveMetaToken(uid, data) {
    const ref = db.collection('users').doc(uid);

    await ref.set(
      {
        meta: {
          ...data,
          updated_at: admin.firestore.FieldValue.serverTimestamp()
        }
      },
      { merge: true }
    );
  }

  static async getMetaData(uid) {
    const doc = await db.collection('users').doc(uid).get();

    if (!doc.exists) return null;

    return doc.data().meta || null;
  }
}

module.exports = UserMetaService;