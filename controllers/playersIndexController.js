const db = require('../db');

// GET
exports.getIndex = (req, res, next) => {
    console.log("GET: Hello getPlayersPage")
    res.json({
        message: 'Hello all players'
    })
};