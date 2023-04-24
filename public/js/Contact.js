window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
window.addEventListener('scroll', function () {
  var rotateDiv = document.querySelector('.image-container');
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  var rotation = scrollTop / 10; // Adjust rotation speed here
  rotateDiv.style.transform = 'rotateY(' + rotation + 'deg)';
});

const navbarLinks = document.querySelectorAll('.navbar2 a');
navbarLinks.forEach(link => {
  link.addEventListener('mousemove', e => {
    const underline = link.querySelector('.underline');
    underline.style.width = `${e.offsetX}px`;
    underline.style.left = `${e.offsetX}px`;
  });

  link.addEventListener('mouseleave', () => {
    const underline = link.querySelector('.underline');
    underline.style.width = '0';
    underline.style.left = '0';
  });
});

const link1 = document.getElementById('list-item-3-1');
const link2 = document.getElementById('list-item-3-2');
const link3 = document.getElementById('list-item-3-3');
const link4 = document.getElementById('list-item-3-4');
const image = document.getElementById('main-image2');

// Event listeners for link hover
link1.addEventListener('mouseover', () => {
  image.src = 'images/otherassets/Camera.png'; // Replace with image URL for link1
});
link1.addEventListener('mouseout', () => {
  image.src = 'images/otherassets/Camera.png'; // Replace with image URL for link1
});

link2.addEventListener('mouseover', () => {
  image.src = 'images/otherassets/team.png'; // Replace with image URL for link2
});
link2.addEventListener('mouseout', () => {
  image.src = 'images/otherassets/Camera.png'; // Replace with image URL for link1
});

link3.addEventListener('mouseover', () => {
  image.src = 'images/otherassets/user.jpeg'; // Replace with image URL for link3
});
link3.addEventListener('mouseout', () => {
  image.src = 'images/otherassets/Camera.png'; // Replace with image URL for link1
});

link4.addEventListener('mouseover', () => {
  image.src = 'images/otherassets/future.png'; // Replace with image URL for link3
});
link4.addEventListener('mouseout', () => {
  image.src = 'images/otherassets/Camera.png'; // Replace with image URL for link1
});
const navbarLinks2 = document.querySelectorAll('.navbar3 a');
navbarLinks2.forEach(link => {
  link.addEventListener('mousemove', e => {
    const underline = link.querySelector('.underline');
    underline.style.width = `${e.offsetX}px`;
    underline.style.left = `${e.offsetX}px`;
  });

  link.addEventListener('mouseleave', () => {
    const underline = link.querySelector('.underline');
    underline.style.width = '0';
    underline.style.left = '0';
  });
});
$('.footer-nav a').on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, '300');
});