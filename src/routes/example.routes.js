const express = require('express');
const { example } = require('../controllers/example.controller');

const router = express.Router();

router.get('/example', example);

module.exports = router;
    