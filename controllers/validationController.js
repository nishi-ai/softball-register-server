const { body, validationResult } = require('express-validator');

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