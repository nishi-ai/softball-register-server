// import database
const db = require('../db');

// GET
exports.getRegistraionPage = (req, res, next) => {
    console.log("GET: sending Hello")
    res.json({
        hasError: false,
        errorMessage: null,
        validationErrors: []
    });
    next();
};

// POST
// middleware that modify the response body
exports.postRegistraionInfo = (req, res, next) => {
    console.log("POST:")
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
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
            .end()
            // doesn't call next()
            // need to return something json because frontend expects to receive `json.
            // no need send(), res.json does this. 
        })
        // catching errors related to inserting the document into the database
        .catch(err => {
            console.log('Error is occured:', err);
            res.status(500).json({ message: 'Registration for the player failed.' });
        })
};
