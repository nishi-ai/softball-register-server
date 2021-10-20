const express = require('express');

const validationController = require('../controllers/validationController')
const adminController = require('../controllers/adminController');

const router = express.Router();

// Get all players info
// /admin/players => GET
// validate a password to get players infos
router.get('/players/', validationController.validateAdminPassword, adminController.getIndex);
router.get('/delete-players/', adminController.postDeletePlayer);

module.exports = router;