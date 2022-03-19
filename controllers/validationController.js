const { body, validationResult } = require('express-validator');
// const url = require('url');
// const querystring = require('querystring');
const config = require('config');

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

 // comment in and install 'url' & 'querystring' when unit test 
    // const parsedUrl = url.parse(rawUrl);
    // const parsedQs = querystring.parse(parsedUrl.query);
    // console.log("parsedUrl", parsedUrl);
    // console.log("parsedQs", parsedQs);

exports.validateAdminPassword = (req, res, next) => {

    const adminPassword = config.get('settings.adminAccounts');
    console.log('adminPassword', adminPassword)    
    // get headers authorization
    const authheader = req.headers.authorization;
    console.log('req.headers.authorization', authheader);
    if (typeof authheader !== 'undefined') {
        // distract only token password
        const tokenPass = authheader.split(' ')[1]
        console.log("tokenPass", tokenPass);
        // get token password from frontend
        if (tokenPass === adminPassword) {
            // then good to go to players
            console.log('authenticated')  
            next();
            // return here to make this if & if done and anything else goes to error 403
            return;
        }
    }
    res
    .status(403)
    .send(JSON.stringify({
    error: 'You are not authenticated! Enter a valid password'
    }));
}