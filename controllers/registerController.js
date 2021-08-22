// import database
const db = require('../db');

// import validationResult
const { validationResult } = require('express-validator');

// GET
exports.getRegistraionPage = (req, res) => {
    console.log("GET: sending Hello")
    res.json({
        hasError: false,
        errorMessage: null,
        validationErrors: []
    });
};

// POST
exports.postRegistraionInfo = (req, res, next) => {
    console.log("POST:")
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    // check all erros by passing the request to validation result
    const errors = validationResult(req);

    // if there is some errors
    if (!errors.isEmpty()) {
        return res.status(422).json({
            hasError: true,
            OldInput: {
                name: name,
                email: email
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }
    // // create validation manually in server side, instead using required function in front end
    // if (
    //     !name || 
    //     name.trim() === ''
    // ) {
    //     res.status(422).json({ message: 'invalid-name', name: name})
    //     // stop request here when the input is invalid
    //     return;
    // } else if (
    //     !email ||
    //     !email.includes('@') ||
    //     email.trim() === ''
    // ) {
    //     res.status(422).json({ message: 'invalid-email', email: email})
    //     // stop request here when the input is invalid
    //     return;
    // } else if (
    //     !name || 
    //     name.trim() === '' &&
    //     !email ||
    //     !email.includes('@') ||
    //     email.trim() === ''
    // ) {
    //     res.status(422).json({ message: 'invalid-input'})
    //     // stop request here when the input is invalid
    //     return;
    // }
    else {
        // connect to the database and save the new incoming player
        db.getDb()
          .db('softball')
          // the collction will be created dynamically if it does not exist yet
          .collection('players')
          .insertOne({
              name: name,
              email: email
          })
          .then(result => {
              console.log('result', result);
              res
                .status(200)
                .json({ player: { name: name, email: email },
                        message: 'Player added',
                        playerID: result.insertedId
                })
                // need to return something json because frontend expects to receive `json.
                // no need send(), res.json does this. 
           })
           // catching errors related to inserting the document into the database
           .catch(err => {
               console.log(err);
               res.status(500).json({ message: 'Registration for the player failed.' });
           })
     } 
};
