const admin = require('../config/firebase');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token não enviado' });
  }

  try {
    await admin.auth().verifyIdToken(token);
    next(); // deixa seguir para a rota
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
