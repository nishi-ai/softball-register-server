const { body, validationResult } = require('express-validator');
const url = require('url');
const querystring = require('querystring');

exports.validateNameAndEmail = [
    // name is required at least 2 chars long
    body('name')
        .isString()
        .isLength({ min: 2 })
        .trim(),
    // email should be email
    body('email')
        .isEmail()
        .trim(),
    (req, res, next) => {
    console.log('----error')
    // check all erros by passing the request to validation result
    const errors = validationResult(req);
    // if there is some errors
    if (!errors.isEmpty()) {
        return res.status(422).json({
            hasError: true,
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }
    next();
    },
];

exports.validateAdminPassword = (req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        console.log("It's in production_admin" );
        adminPassword = process.env.ADMIN_PASSWORD;
        console.log('adminPassword', adminPassword);
        rawUrl = `https://softball-register-web.herokuapp.com/admin/players/?password=${process.env.ADMIN_PASSWORD}`
    } else {
        console.log("It's in dev_admin");
        adminPassword = 'fakepassword'
        console.log('adminPassword', adminPassword);
        rawUrl = `http://localhost:7000/admin/players/?password=${adminPassword}`
    }

    const parsedUrl = url.parse(rawUrl);
    const parsedQs = querystring.parse(parsedUrl.query);
    console.log("parsedUrl", parsedUrl);
    console.log("parsedQs", parsedQs);

    const password = req.query.password
    console.log("password", password);
    if (password === adminPassword) {
        // then good to go to players  
        next();
    } else {
        res
        .status(403)
        .send(JSON.stringify({
        error: 'Enter a valid password'
        }));
    }
    
}