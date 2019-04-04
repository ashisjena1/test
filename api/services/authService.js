const {check} = require('express-validator/check');
exports.validate = (method) => {
  switch (method){
    case 'createUser':{
      return [
        check('username').exists().trim()
              .not().isEmpty().withMessage('user name field should not be empty')
              .matches(/^\w+$/).withMessage('User Name should contain only alphabets/numbers'),
        check('firstName').exists().trim()
              .not().isEmpty().withMessage('First name field should not be empty')
              .matches(/^[A-Za-z]+$/).withMessage('First Name should contain only alphabets'),
        check('lastName').exists().trim()
              .not().isEmpty().withMessage('Last name field should not be empty')
              .matches(/^[A-Za-z]+$/).withMessage('Last Name should contain only alphabets'),
        check('email').exists().trim()
            .not().isEmpty().withMessage('Email field should not be empty')
            .matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
                    .withMessage('please enter a valid email address eg:- a@gmail.com'),
        check('countryCode').exists().isIn(['+91','+92']),
        check('phoneNumber').exists().trim()
            .not().isEmpty().withMessage('Last name field should not be empty')
            .isLength(10).withMessage('phone number must contain 10 digits')
            .matches(/^[1-9][0-9]+$/).withMessage('Phone number field should contain only number'),
        check('password').exists()
            .not().isEmpty().withMessage('Password field should not be empty')
            .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
                    .withMessage('Password must contain at least 8 characters, including UPPER,lowercase and number'),
        check('repassword','Password Confirmation field must have the same value as the passwor field')
            .exists()
            .custom((value,{req}) => value  === req.body.password)
      ]
    }
  }
}
