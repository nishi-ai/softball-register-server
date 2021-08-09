// token
const jwt = require('jsonwebtoken');

// import database
const db = require('../db');

// import Player model
var Player = require('../models/Player')

// create token to return a JSON Web Signature for a header and a payload.
const createToken = () => {
    return jwt.sign({}, 'secret', { expiresIn: '1h' });
}

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
    } else {
        // connect to the database and save the new incoming player
        db.getDb()
          .db()
          // the collction will be created dynamically if it does not exist yet
          .collection('players2')
          .insertOne({
              name: name,
              email: email
          })
          .then(result => {
              console.log(result);
              // use a token based authentication approach. return it in frontend app, which could theoretically handle that token to authenticate itself to the backend for future requests
              const token = createToken();
              res
                .status(200)
                .json({ token: token,
                        player: { name: name, email: email },
                        message: 'Player added',
                        playerID: result.insertedId
                })
                // need to return something json because frontend expects to receive `json.
                .send({})
           })
           // catching errors related to inserting the document into the database
           .catch(err => {
               console.log(err);
               res.status(500).json({ message: 'Registration for the player failed.' });
           })
     } 
};
