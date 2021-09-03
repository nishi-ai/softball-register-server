const express = require('express');

// import controllers
const validationController = require('../controllers/validationController')
const registrationsController = require('../controllers/registerController')

const router = express.Router();

// router.use === routes (all http methods) handler
router.use((req, res, next) => {
    next(); // Allows the request to continue to the next middleware (app.use) in line
});
  
// /player/registration => GET
// this express routes that it should take this function (getRegistraionPage) and store it.
// Whenever a request reaches this route, it should go ahead and execute it.
router.get('/registration', registrationsController.getRegistraionPage);

// /player/registration => POST
router.post('/registration', validationController.validateNameAndEmail, registrationsController.postRegistraionInfo);


module.exports = router;