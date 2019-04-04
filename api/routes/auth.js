var express = require('express');
var router = express.Router();

var authService = require("../services/authService");
var authController = require('../controllers/authController');

router.post('/login',authController.userLogin);

router.post('/signup',authService.validate('createUser'),authController.createUser);

router.get('/email/:email',authController.checkNewEmail);

router.get('/phoneNumber/:phoneNumber',authController.checkNewPhoneNumber);

//router.get('/phoneNumber/:phoneNumber',authController.checkUserName);

module.exports = router;
