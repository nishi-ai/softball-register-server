const express = require('express');

const validationController = require('../controllers/validationController')
const indexController = require('../controllers/playersIndexController');
const eventsIndexController = require('../controllers/eventsIndexController');

const router = express.Router();

// Get all players info
// /admin/players => GET
// validate a password to get players infos
router.get('/players/', validationController.validateAdminPassword, indexController.getIndex);
// Get all events info
// /admin/events => GET
router.get('/events/', eventsIndexController.getEventsIndex);

module.exports = router;