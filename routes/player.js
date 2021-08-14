const express = require('express');

// import controller
const registrationsController = require('../controllers/registerController')

const router = express.Router();

// router.use === routes (all http methods) handler
router.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader(
    //     'Access-Control-Allow-Methods',
    //     'GET,POST,PUT,PATCH,DELETE,OPTIONS'
    // );
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next(); // Allows the request to continue to the next middleware (app.use) in line
});
  
// /player/registration => GET
// this express routes that it should take this function (getRegistraionPage) and store it.
// Whenever a request reaches this route, it should go ahead and execute it.
router.get('/registration', registrationsController.getRegistraionPage);

// /player/registration => POST
router.post('/registration', registrationsController.postRegistraionInfo);

module.exports = router;