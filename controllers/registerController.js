// import database
const db = require('../db');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport')

const config = require('config');
const sgapiKey = config.get('api_key.SENDGRID');
// create reusable transporter object using sendgridTransport, which
// returns a configuration that nodemailer can use, to use sendgrid
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: sgapiKey
    }
}));

let message = {
    to: 'aiaimforworld@gmail.com, benevbright@gmail.com',
    from: 'admin@catsdogssoftball.com',
    subject: 'We got a registraion to our team!',
    html: '<h2> We got a registraion to our team!</h2>'
}
// GET
exports.getRegistraionPage = (req, res, next) => {
    console.log("GET: sending Hello")
    res.json({
        hasError: false,
        errorMessage: null,
        validationErrors: []
    });
};

// POST
// middleware that modify the response body
exports.postRegistraionInfo = (req, res, next) => {
    console.log("POST:")
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const createdDate = new Date();
    // connect to the database and save the new incoming player
    db.getDb()
        .db('softball')
        // the collction will be created dynamically if it does not exist yet
        .collection('players')
        .insertOne({
            name: name,
            email: email,
            created_at: createdDate
        })
        .then(result => {
            console.log('result', result);
            res
            .status(200)
            .json({ player: { name: name, email: email, created_at: createdDate },
                    message: 'Player added',
                    playerID: result.insertedId
            })
            try {
                transporter.sendMail(message)
            } catch(err) {
                console.log(err);
                if (error.response) {
                    console.error(error.response.body)
                }
            };
            transporter.close();
        // don't call next()
        // need to return something json because frontend expects to receive `json.
        // no need send(), res.json does this.
        })
        // catching errors related to inserting the document into the database
        .catch(err => {
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
        })
};