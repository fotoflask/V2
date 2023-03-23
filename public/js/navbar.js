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
