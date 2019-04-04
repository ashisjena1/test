var userService ={
  checkUserName : function(userName){
    if(userName.trim().length===0){
      return "This field is required"
    } else if(!/^\w+$/.test(userName.trim())){
      return "User Name should contain only alphabets/numbers/special number";
    }
    return "";
  },
  checkName : function(name){
    if(name.trim().length===0){
      return "This field is required"
    } else if(!/^[A-Za-z]+$/.test(name.trim())){
      return "Name should contain only alphabets";
    }
    return "";
  },
  checkEmail : function(email){
    let emailRegEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(email.trim().length===0){
      return "This field is required"
    } else if(!emailRegEX.test(email.trim())){
      return "please enter a valid email address eg:- a@gmail.com";
    }
    return "";
  },
  checkPhoneNumber : function(phoneNumber){
    if(phoneNumber.trim().length===0){
      return "This field is required"
    }
    if (!/[1-9][0-9]{9}/.test(phoneNumber)){
      return  "phone number must contain 10 digits";
    }
    return "";
  },
  checkPassword: function (password){
     let passwordRegEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
     if(password.trim().length===0){
       return "This field is required"
     }
     if ( !passwordRegEX.test(password.trim())){
       return "Password must contain at least 8 characters, including UPPER,lowercase and number";
     }
    return "";
  },
  checkUser : function(user,result){
    let userMessage = {
      userNameMessage : this.checkUserName(user.userName),
      firstNameMessage : this.checkName(user.firstName),
      lastNameMessage : this.checkName(user.lastName),
      emailMessage : this.checkEmail(user.email),
      phoneNumberMessage : this.checkPhoneNumber(user.phoneNumber),
      passwordMessage : this.checkPassword(user.password)
    };

    if(!userMessage.userNameMessage.length && !userMessage.firstNameMessage.length && !userMessage.lastNameMessage.length && !userMessage.emailMessage.length && !userMessage.phoneNumberMessage.length && !userMessage.passwordMessage.length){
      result(true,userMessage);
    } else {
      result(false,userMessage);
    }
  }
};

module.exports = userService;
