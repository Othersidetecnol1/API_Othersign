const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

router.get('/auth-check', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token não enviado' });
    }

    const token = authHeader.replace('Bearer ', '');

    const decodedToken = await admin.auth().verifyIdToken(token);

    return res.json({
      status: 'ok',
      uid: decodedToken.uid,
      email: decodedToken.email
    });

  } catch (error) {
    return res.status(401).json({
      error: 'Token inválido ou expirado'
    });
  }
});

module.exports = router;