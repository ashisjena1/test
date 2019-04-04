var bcrypt = require('bcrypt');
const saltRounds = 10;
var con = require('../connection');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')

var User = require("../models/authModel");
const {validationResult} = require('express-validator/check');

exports.createUser = (req,res,next) =>{

    /*const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
      return `${location}[${param}]: ${msg}`;
    };
    const result = validationResult(req).formatWith(errorFormatter);
    */
    let result = validationResult(req);

    if (!result.isEmpty()) {
      res.status(500)
      return res.json({ errors: result.array() });
      //next(new Error(result.array()));
    } else {
      let user ={
        userName:req.body.username,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        phoneCode:req.body.countryCode,
        phoneNumber:req.body.phoneNumber,
        password:req.body.password
      };
      bcrypt.hash(user.password, saltRounds, function(error, hash) {
        if(error){
          //res.status(500).json({message:error.message});
          next(new Error(error))
        } else {
          user.password = hash;
          let newUser = new User(user);
          User.signup(newUser,function(err,results){
            if(err) {
              //res.status(500).json({message:error.message});
              next(new Error(err))
            } else {
              res.status(201).json({
                message:"registered sucessfully",
                user:results
              });
            }
          });
        }
      });
    }
}

exports.userLogin = (req,res,next) => {
  //var login_user = new User(req.body.email);
  User.login(req.body.email,function(error,user){
    if(error){
      res.status(500).json({
        ERROR:error.message
      });
    } else {
      if(!user.length){
        res.status(401).json({
          message:"Authentication Failed"
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, function(err, result) {
          if(err){
            res.status(500).json({
              ERROR:error.message
            });
          }

          if(result){
            var token = jwt.sign(
              {
                name:user[0].name,
                email:user[0].email,
                id:user[0].userId
              },
              process.env.JWT_PRIVATE_KEY,
              {
                expiresIn: 120
              }
            );
            res.status(202).json({
              token:token,
              message:"login successfull"
            });
            //return res.json({token:token});
          } else {
            res.status(401).json({
              message:"Authentication Failed"
            });
          }

        });
      }
    }
  });
}

exports.loginRequired = function(req,res,next){
  if(req.user){
    next();
  }else{
    return res.status(401).json({message:'Unauthorized user'});
  }
}

exports.checkNewEmail = (req,res,next) => {
  User.email(req.params.email,function(error,result){
    if(error){
      res.status(500).json({message:error.message})
    }else{
      if(result.length){
        res.status(200).json({
          status:200,
          message:"Email already exists"
        });
      } else {
        res.status(201).json({
          status:201,
          message:"Email"
        });
      }
    }
  });
}

exports.checkNewPhoneNumber = (req,res,next) => {
  User.phoneNumber(Number(req.params.phoneNumber),function(error,result){
    if(error){
      res.status(500).json({message:error.message})
    }else{
      if(result.length){
        res.status(200).json({
          status:200,
          message:"This Number is already registered please give another number"
        });
      } else {
        res.status(201).json({
          status:201,
          message:"Phone Number"
        });
      }
    }
  });
}
