const express = require('express');

const eventsIndexController = require('../controllers/eventsIndexController');

const router = express.Router();

// Get all events info
// /events => GET
router.get('/', eventsIndexController.getEventsIndex);

module.exports = router;