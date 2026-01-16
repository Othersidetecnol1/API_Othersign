const admin = require('../config/firebase');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não enviado' });
  }

  // 🔥 remove o "Bearer "
  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // opcional, mas útil
    next(); // ✅ agora a rota continua
  } catch (error) {
    console.error('Firebase Auth erro:', error.message);
    return res.status(401).json({ error: 'Token inválido' });
  }
};
