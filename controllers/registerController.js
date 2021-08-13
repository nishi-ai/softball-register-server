// import database
const db = require('../db');

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
        name.trim() === ''
    ) {
        res.status(422).json({ message: 'Please enter your name.'})
        // stop request here when the input is invalid
        return;
    } else if (
        !email ||
        !email.includes('@') ||
        email.trim() === ''
    ) {
        res.status(422).json({ message: 'Email should be entered and include @.'})
        // stop request here when the input is invalid
        return;
    }
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
                .send() // no deed empty {}, 
           })
           // catching errors related to inserting the document into the database
           .catch(err => {
               console.log(err);
               res.status(500).json({ message: 'Registration for the player failed.' });
           })
     } 
};
