// import database
const db = require('../db');
const { sendAdminEmail, sendSignedUpEmail}  = require('../utils/email-helper')

// GET
exports.getRegistraionPage = (req, res, next) => {
    res.json({
        hasError: false,
        errorMessage: null,
        validationErrors: []
    });
};

// POST
// middleware that modify the response body
exports.postRegistraionInfo = async (req, res, next) => {
    console.log("POST:")
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const createdDate = new Date();
    // connect to the database and save the new incoming player
    // the collction will be created dynamically if it does not exist yet.
    try {
        const collection = db.getDb().db('softball').collection('players')
        let result = await collection.insertOne({
                name: name,
                email: email,
                created_at: createdDate
        })
        console.log('result', result);
        res
        .status(200)
        .json({ player: { name: name, email: email, created_at: createdDate },
                message: 'Player added',
                playerID: result.insertedId
        })

        sendAdminEmail(name, email, createdDate.toDateString());
        sendSignedUpEmail(email, name);

        // don't call next()
        // need to return something json because frontend expects to receive `json.
        // no need send(), res.json does this.
        // catching errors related to inserting the document into the database
    } catch(err) {
        if (err.code === 11000) {
            // Duplicate email , catched error before saving into db
            // send 409 'Conflict'
            return res.status(409).json( {
                success: false,
                code: 11000,
                message: 'duplicated-record'
            });
        }
        // some other errors
        return res.status(500).json({ message: JSON.stringify(err.message) });
    }
};

