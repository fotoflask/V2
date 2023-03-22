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