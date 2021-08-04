// import Player model
const Player = require('../models/player');

// GET
exports.getRegistraionPage = (req, res) => {
    console.log("GET: sending Hello")
};

// POST
exports.postRegistraionInfo = (req, res, next) => {
    console.log("POST:")
    console.log(req.body);
    const { name, email } = req.body;
    // create a new player with a local constant with new player
    const player = new Player(req.body.name, req.body.email);
    // save it
    player.save();
    console.log("new player:", player)
    // create validation manually in server side, instead using required function in front end
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
