var con = require('../connection');
var User = function(user){
    this.userName = user.userName;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.phoneCode = user.phoneCode;
    this.phoneNumber = user.phoneNumber;
    this.password = user.password;
};

User.login = function login(email,result){
    con.query("SELECT name,email,userId,password FROM tbl_users where email = ?", email ,function(err,res){
      if(err){
        result(err,null);
      }else{
        result(null,res);
      }
    });
};

User.signup = function signup(newUser,result){
  console.log(User);
    con.query("INSERT INTO user(userName,firstName,lastName,email,phoneCode,phoneNumber,password) values(?,?,?,?,?,?,?)",[newUser.userName,newUser.firstName,newUser.lastName,newUser.email,newUser.phoneCode,newUser.phoneNumber,newUser.password],function(err,res){
      if(err){
        result(err,null);
      }else{
        result(null,res);
      }
    });
};

User.email = function email(email,result){
  con.query("SELECT 1 FROM user  WHERE email = ?",email,function(err,res){
    if(err){
      result(err,null);
    }else{
      result(null,res);
    }
  });
}

User.phoneNumber = function phoneNumber(phoneNumber,result){
  con.query("SELECT 1 FROM user  WHERE phoneNumber = ?",phoneNumber,function(err,res){
    if(err){
      result(err,null);
    }else{
      console.log(res);
      result(null,res);
    }
  });
}

User.userName = function userName(userName,result){
  con.query("SELECT 1 FROM user  WHERE userName = ?",userName,function(err,res){
    if(err){
      result(err,null);
    }else{
      console.log(res.length);
      result(null,res);
    }
  });
}

module.exports = User;
