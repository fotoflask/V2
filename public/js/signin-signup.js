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