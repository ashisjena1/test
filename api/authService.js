var User = require("../models/authModel");
const {check} = require('express-validator/check');
exports.validate = (method) => {
  switch (method){
    case 'createUser':{
      return [
        check('username').exists().trim()
              .not().isEmpty().withMessage('user name field should not be empty')
              .matches(/^\w+$/).withMessage('User Name should contain only alphabets/numbers')
              .custom((value,{req}) =>{
                return new Promise((resolve,reject) => {
                  User.userName(req.body.username,(err,user)=>{
                    if(err){
                      reject(new Error(err))
                    } else if(user.length){
                      reject(new Error('user name is already exist'))
                    } else{
                      resolve(true)
                    }
                  })
                })
              }),
        check('firstName').exists().trim()
              .not().isEmpty().withMessage('First name field should not be empty')
              .matches(/^[A-Za-z]+$/).withMessage('First Name should contain only alphabets'),
        check('lastName').exists().trim()
              .not().isEmpty().withMessage('Last name field should not be empty')
              .matches(/^[A-Za-z]+$/).withMessage('Last Name should contain only alphabets'),
        check('email').exists().trim()
            .not().isEmpty().withMessage('Email field should not be empty')
            .matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
                    .withMessage('please enter a valid email address eg:- a@gmail.com')
            .custom((value,{req}) =>{
              return new Promise((resolve,reject) => {
                User.email(req.body.email,(err,user)=>{
                  if(err){
                    reject(new Error(err))
                  } else if(user.length){
                    reject(new Error('Email is already exist'))
                  } else{
                    resolve(true)
                  }
                })
              })
            }),
        check('countryCode').exists().isIn(['+91','+92']),
        check('phoneNumber').exists().trim()
            .not().isEmpty().withMessage('Last name field should not be empty')
            .isLength(10).withMessage('phone number must contain 10 digits')
            .matches(/^[1-9][0-9]+$/).withMessage('Phone number field should contain only number')
            .custom((value,{req}) =>{
              return new Promise((resolve,reject) => {
                User.phoneNumber(req.body.phoneNumber,(err,user)=>{
                  if(err){
                    reject(new Error(err))
                  } else if(user.length){
                    reject(new Error('phone number is already exist'))
                  } else{
                    resolve(true)
                  }
                })
              })
            }),
        check('password').exists()
            .not().isEmpty().withMessage('Password field should not be empty')
            .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
                    .withMessage('Password must contain at least 8 characters, including UPPER,lowercase and number'),
        check('repassword','Repeat Password field must have the same value as the password field')
            .exists()
            .custom((value,{req}) => value  === req.body.password)
      ]
    }
  }
}
