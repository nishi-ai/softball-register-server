const express = require('express');

const indexController = require('../controllers/playersIndexController');

const router = express.Router();

// Get all players info
// /admin/players => GET
router.get('/players', indexController.getIndex);

module.exports = router;