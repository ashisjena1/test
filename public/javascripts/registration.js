function Validation(config){
  if(!config){
    config = {
      name : $("#name"),
      email : $("#email"),
      phoneNumber : $("#phoneNumber"),
    	password : $("#password")
    };
  }

  let dom = {
    registrationFail : $("#registrationFail"),
    nameError : $("#nameError"),
    emailError : $("#emailError"),
    phoneNumberError : $("#phoneNumberError"),
    passwordError : $("#passwordError"),
    signupFormInput : $("#signupForm input")
  }

	let validator = {
    emptyError : function(element){
      element.html("This field should not be empty");
    },
    messageError : function(element,message){
      element.html(message);
    },
    checkName : function(){
        if(config.name.val().trim().length===0){
  			     this.emptyError(dom.nameError);
  		  }else if(!/[A-Za-z ]+/.test(config.name.val().trim())){
  			     this.messageError(dom.nameError,"Name should contain only alphabets");
  		  } else {
  			     return true;
  		  }
  		  return false;
    },
		checkEmail : function(){
        let emailRegEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        if(config.email.val().length === 0){
             this.emptyError(dom.emailError);
        } else if(!emailRegEX.test(config.email.val().trim())){
  			     this.messageError(dom.emailError,"please enter a valid email address eg:- a@gmail.com");
  			} else {
          $.ajax({
            method:"get",
            url:"http://localhost:3000/auth/email/"+config.email.val(),
            datatype:"json",
            success:(res)=>{
              if(res.status == 200){
                this.messageError(dom.emailError,res.message);
                return false;
              }
            },
            error:(err) => {
              alert("some error occoured");
            }
          });
             return true;
        }
  			return false;
		},
    checkPhoneNumber : function(){
		    if (config.phoneNumber.val().length === 0) {
				     this.emptyError(dom.phoneNumberError);
		    }  else if (config.phoneNumber.val().trim().match(/[1-9][0-9]{9}/)!=config.phoneNumber.val().trim()){
			       this.messageError(dom.phoneNumberError,'phone number must contain 10 digits');
		    } else {
          $.ajax({
            method:"get",
            url:"http://localhost:3000/auth/phoneNumber/"+config.phoneNumber.val(),
            datatype:"json",
            success:(res)=>{
              if(res.status == 200){
                this.messageError(dom.phoneNumberError,res.message);
                return false;
              }
            },
            error:(err) => {
               alert("some error occoured");
              //alert(err.message);
            }
          });
				     return true;
		    }
		    return false;
	  },
		checkPassword: function (){
       let passwordRegEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
       if ( (config.password.length === 0) || (!passwordRegEX.test(config.password.val().trim())) ){
            this.messageError(dom.passwordError,"Password must contain at least 8 characters, including UPPER,lowercase and number");
            return false;
			 }
			 return true;
		},
    onElementFocus : function(element){
      element.removeClass("input-error");
      dom.registrationFail.html("");
    },
    signUp : function (){
      if (this.checkEmail() && this.checkPassword() && this.checkPhoneNumber() && this.checkName()){
        $.ajax({
          type:"post",
          url:"http://localhost:3000/auth/signup",
          data:{
            name : config.name.val(),
            email : config.email.val(),
            phoneNumber : config.phoneNumber.val(),
            password : config.password.val()
          },
          datatype :"json",
          success : function (res){
            dom.signupFormInput.val("");
            dom.registrationFail.addClass("text-success");
            dom.registrationFail.html(res.message);
          },
          error : function(err){
            dom.signupFormInput.val("");
            dom.registrationFail.addClass("text-danger");
            dom.registrationFail.html("Registration Failed");
          }
        });
      }
    }
	}
  return validator;
}
$(document).ready(function() {

  var name = $("#name");
	var email = $("#email");
  var phoneNumber = $("#phoneNumber");
	var password = $("#password");
	var signUp = $("#signupBtn");

  var formInput = $("#signupForm input");

  let user = {
    name : name,
    email : email,
    phoneNumber : phoneNumber,
    password : password
  };

	var validator = new Validation(user);

  name.focusout(function(){
    validator.onElementFocus(name);
		if(!validator.checkName())
        name.addClass("input-error");
	});


  email.focusout(function(){
    validator.onElementFocus(email);
		if(!validator.checkEmail())
        email.addClass("input-error");
	});

  phoneNumber.focusout(function(){
    validator.onElementFocus(phoneNumber);
		if(!validator.checkPhoneNumber())
        phoneNumber.addClass("input-error");
	});

  password.focusout(function(){
    validator.onElementFocus(password);
		if(!validator.checkPassword())
        password.addClass("input-error");
	});

  formInput.focus(function(element){
      validator.onElementFocus($(this))
  });

  formInput.on('input',function(element){
      $(this).siblings('span').html("");
  });

	signUp.click(function(event){
		event.preventDefault();
    //https://cors-anywhere.herokuapp.com/
    validator.signUp();

	});
});
