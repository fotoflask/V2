console.log("working")


const navbar = document.querySelector('.navb');
    const checkbox = document.querySelector('#check');

    window.addEventListener('click', function(e) {
    if (!navbar.contains(e.target)) {
        checkbox.checked = false;
    }
    });

    const checkbuttonbars = document.getElementById('checkbutton-bars')

    checkbuttonbars.addEventListener('mouseover', ()=>{
      checkbuttonbars.classList.add('fa-sm');
    })

    checkbuttonbars.addEventListener('mouseout', ()=>{
      checkbuttonbars.classList.remove('fa-sm');
    })



    // Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}