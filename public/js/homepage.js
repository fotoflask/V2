// const elem = document.getElementById('notification-button');
// const element = document.getElementById('notification-icon');
// const elemnav = document.getElementById('navigation-button');

// elem.addEventListener('click', ()=>{
// // elemnav.toggleClass("active");
// console.log('Y');
// console.log(elemnav.getAttribute("active"));

// if (elem.getAttribute("aria-expanded") == 'true') {
//     element.classList.add('fa-solid');
//     element.classList.remove('fa-regular');
//   } 
// else {
//     element.classList.add('fa-regular');
//     element.classList.remove('fa-solid');
//   }
// });


// function myFunction() {
//     console.log('Q');
//     // document.getElementById("navigation-button").setAttribute("active", "true");
//   }

// console.log(elem.style.display);




// // $(document).ready(function () {
// //   $("#profile-link").click(function () {
// //     console.log('clicked');
// //      $.post("/profilepage?post_username="+encodeURIComponent(this.data-value));
// //   });
// // });

function showtag(tagbtn){
  if(tagbtn.value == 0){
    tagbtn.style.display = "none";
    tagbtn.nextElementSibling.style.display = 'flex';
  }
  else
  tagbtn.innerHTML = "Show Tags";
}