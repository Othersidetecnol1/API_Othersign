// routes/testRoutes.js
router.get('/auth-check', authMiddleware, (req, res) => {
  res.json({
    uid: req.user.uid,
    email: req.user.email
  });
});