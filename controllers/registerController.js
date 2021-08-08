// import database
const db = require('../db');

// import Player model
var Player = require('../models/Player')

// GET
exports.getRegistraionPage = (req, res) => {
    console.log("GET: sending Hello")
};

// POST
exports.postRegistraionInfo = (req, res, next) => {
    console.log("POST:")
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    // create a new player with a local constant with new player
    const player = new Player(name, email)
    // save it
    player.save();
    console.log("new player:", player)
    // connect to the database and save the new incoming player
    db.getDb()
        .db()
        .collection('Player')
        .insertOne(player)
        .then(result => {
            console.log(result);
            res
                .status(200)
                .json( { message: 'Player added', playerID: result.insertedId })
                .send({})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'An error occured.' });
        })
    if (
        !name || 
        name.trim() === '' ||
        !email ||
        !email.includes('@') ||
        email.trim() === ''
    ) {
        res.status(422).json({ message: 'Invalid input.'})
        // stop request here when the input is invalid
        return;
    }
    res.status(200);
    // need to return something json because frontend expects to receive `json.
    res.send({});
};
