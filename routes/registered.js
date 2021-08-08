// import Player model
const Player = require('../models/Player')

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('In another middlware');
    const players = Player.fetchAll();
    console.log('All players', players);

});

module.exports = router;