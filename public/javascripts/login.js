function Validation(config){
  if(!config){
    config = {
      email : $("#loginEmail"),
      password : $("loginPassword")
    };
  }

  let dom = {
    loginFail : $("#loginFail"),
    loginFormInput : $("#loginForm input")
  };

	let validator = {
		checkEmail: function(){
      let emailRegEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
			if ( (config.email.length === 0) || (!emailRegEX.test(config.email.val().trim())) ){
			     return false;
			}
			return true;
		},
		checkPassword: function (){
      let passwordRegEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
      if ( (config.password.length === 0) || (!passwordRegEX.test(config.password.val().trim())) ){
			     return false;
			}
			return true;
		},
    onElementFocus : function(element){
      element.removeClass("input-error")
      dom.loginFail.html("");
    },
    login : function(){
      if (this.checkEmail() && this.checkPassword()){
			     $.ajax({
      				type:"post",
      				url:"http://localhost:3000/auth/login",
      				data:{
      					email : config.email.val().trim(),
      					password : config.password.val().trim()
      				},
      				datatype :"json",
      				success : function (res){
                //console.log(res);
                localStorage.setItem('token','Bearer '+res.token);
                window.location.replace("http://localhost:3000/home.html");
              },
              error : function(err){
                dom.loginFormInput.val("");
                dom.loginFail.html("Authentication Failed");
              }
      			});
          }
		  }
	}
  return validator;
}
$(document).ready(function() {

	var loginEmail = $("#loginEmail");
	var loginPassword = $("#loginPassword");
	var login = $("#loginBtn");
  var formInput = $("#loginForm input");

  let user = {
    email : loginEmail,
    password : loginPassword
  };

	var validator = new Validation(user);

	loginEmail.focusout(function(){
		if(!validator.checkEmail())
        loginEmail.addClass("input-error");
	});

	loginPassword.focusout(function(){
		if(!validator.checkPassword())
      loginPassword.addClass("input-error");
	});

  loginPassword.focus(function(){
    validator.onElementFocus(loginPassword);
  })

  formInput.focus(function(element){
      validator.onElementFocus($(this))
  });


	login.click(function(event){
		event.preventDefault();
    //https://cors-anywhere.herokuapp.com/
    validator.login();
	});
});
