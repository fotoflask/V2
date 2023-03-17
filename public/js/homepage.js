const elem = document.getElementById('notification-button');
const element = document.getElementById('notification-icon');
const elemnav = document.getElementById('navigation-button');

elem.addEventListener('click', ()=>{
// elemnav.toggleClass("active");
console.log('Y');
console.log(elemnav.getAttribute("active"));

if (elem.getAttribute("aria-expanded") == 'true') {
    element.classList.add('fa-solid');
    element.classList.remove('fa-regular');
  } 
else {
    element.classList.add('fa-regular');
    element.classList.remove('fa-solid');
  }
});


function myFunction() {
    console.log('Q');
    // document.getElementById("navigation-button").setAttribute("active", "true");
  }

console.log(elem.style.display);



