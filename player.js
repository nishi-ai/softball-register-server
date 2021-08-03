const { response } = require('express');
const express = require('express');

const router = express.Router();

// router.use === routes (all http methods) handler
router.use((req, res, next) => {
    next(); // Allows the request to continue to the next middleware (app.use) in line
});
  
// /player/registration => GET
router.get('/registration', function (req, res) {
    console.log("GET: sending Hello")
});

// /player/registration => POST
router.post('/registration', (req, res, next) => {
    console.log("POST:")
    console.log(req.body);
    const { name, email } = req.body;
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
})

module.exports = router;