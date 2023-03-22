const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
	// document.getElementById('container2').classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
	// document.getElementById('container2').classList.remove("right-panel-active");
});


function changeGradient(value) {
	// console.log(1);
	// console.log(window.getComputedStyle(document.body).getPropertyValue('--a'));
	// console.log((window.getComputedStyle(document.body).getPropertyValue('--a')));
	// parseInt(window.getComputedStyle(document.body).getPropertyValue('--a'))
	document.body.style.setProperty('--a', value+180 + 'deg');
  }
  

  function checkemptyvalue() {
	var username = document.forms["register"]["username"].value;
	if (username == null || username == "") {
	   alert("Please enter> the username. Can’t be blank or empty !!!");
	   return false;
	}
 }


 function resetform(){
	document.getElementById("f1").reset();
	document.getElementsByClassName("f2").reset();
	document.getElementsByClassName("f3").reset();
 }




//  function ValidateUsername() {
// 	console.log("VU")
// 	var username = document.getElementsByName("username");
// 	console.log(username)
// 	var error = document.getElementById("error");
// 	var expr = /^[a-zA-Z0-9_]{3,10}$/;
// 	if (!expr.test(username)) {
// 		error.innerHTML = "Only Alphabets, Numbers and Underscore and between 3 to 10 characters.";
// 	}
// 	Validatepassword();
// 	Validatedob();
// }


// function Validatepassword() {
// 	var password = document.getElementsByName("password").value;
// 	var error1 = document.getElementById("error1");
// 	var expr = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
// 	if (!expr.test(password)) {
// 		error1.innerHTML = "Minimum eight characters, at least one letter, one number and one special character";
// 	}
// }


// function Validatedob()
// {
// 	var birthday = document.getElementsByName("dob").value;
// 	var optimizedBirthday = birthday.replace(/-/g, "/");
// var myBirthday = new Date(optimizedBirthday);	
// var currentDate = new Date().toJSON().slice(0,10)+' 01:00:00';
// var myAge = ~~((Date.now(currentDate) - myBirthday) / (31557600000));

// if(myAge < 18) {
// 	error2.innerHTML = "Age is less than 18"; 	    
// 	}
// }




function ValidateUsername() {
    let username = document.getElementsByName('UserName')[0].value;
    let error = document.getElementById('error');
    let regex = /^[a-zA-Z0-9_]{5,15}$/;
  
    if (!regex.test(username)) {
      error.innerHTML = 'Username should contain only alphabets, numbers, and underscore. It should be 5 to 15 characters long';
      return false;
    } else {
      error.innerHTML = '';
      return true;
    }
  }
  
  // Validating Password
  function ValidatePassword() {
    let password = document.getElementsByName('password')[0].value;
    let error1 = document.getElementById('error1');
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  
    if (!regex.test(password)) {
      error1.innerHTML = 'Password should be at least 8 characters,contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character';
      return false;
    } else {
      error1.innerHTML = '';
      return true;
    }
  }
  
  // Validating Date of Birth
  function ValidateDOB() {
    let dob = document.getElementsByName('dateofbirth')[0].value;
    let error2 = document.getElementById('error2');
  
    if (!dob) {
      error2.innerHTML = 'Please enter your date of birth';
      return false;
    } else {
      error2.innerHTML = '';
      return true;
    }
  }
  
  // Attaching Event Listeners
  let usernameInput = document.getElementsByName('username')[0];
  let passwordInput = document.getElementsByName('password')[0];
  let dobInput = document.getElementsByName('dateofbirth')[0];
  
  usernameInput.addEventListener('blur', ValidateUsername);
  passwordInput.addEventListener('blur', ValidatePassword);
  dobInput.addEventListener('blur', ValidateDOB);