const express = require('express');

const indexController = require('../controllers/playersIndexController');

const router = express.Router();

// Get all players info
// /admin/players => GET
router.get('/players', indexController.getIndex);

router.get('/debug', (req, res, next) => {
    console.log('MONGODB_PASSWORD', process.env.MONGODB_PASSWORD);
    console.log('MONGODB_USERNAME', process.env.MONGODB_USERNAME);
    const mongoDB = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.ddfbs.mongodb.net`;
    res.status(200).json({data: mongoDB});
})

module.exports = router;