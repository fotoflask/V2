// window.addEventListener('scroll', function () {
//   const navbar = document.querySelector('.navbar');
//   if (window.scrollY > 100) {
//     navbar.classList.add('scrolled');
//   } else {
//     navbar.classList.remove('scrolled');
//   }
// });
// window.addEventListener('scroll', function () {
//   const imageContainer = document.querySelector('.image-container');
//   const distance = window.pageYOffset || document.documentElement.scrollTop;
//   imageContainer.style.transform = `translateX(-${distance}px)`;
// });

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
var observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      const counters = document.querySelectorAll('.counter')

      counters.forEach(counter => {
        counter.innerText = '0'

        const updateCounter = () => {
          const target = +counter.getAttribute('data-target')
          const c = +counter.innerText

          const increment = target / 2000

          if (c < target) {
            counter.innerText = `${Math.ceil(c + increment)}`
            setTimeout(updateCounter, 1)
          } else {
            counter.innerText = target
          }
        }

        updateCounter()
      })
    }
  });
}, { threshold: 0.1 });

var animateDiv = document.querySelector('.counter-container');

observer.observe(animateDiv);
window.addEventListener('scroll', function () {
  const trendingPosts = document.querySelector('.trending-posts');
  const trendingPostsPosition = trendingPosts.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.5;

  if (trendingPostsPosition < screenPosition) {
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
      post.classList.add('hidden');
    });
  }
});


let scaleAmount = 0.5;

function scrollZoom() {
  const images = document.querySelectorAll("[data-scroll-zoom]");
  let scrollPosY = 0;
  scaleAmount = scaleAmount / 100;

  const observerConfig = {
    rootMargin: "0% 0% 0% 0%",
    threshold: 0
  };

  images.forEach(image => {
    let isVisible = false;
    const observer = new IntersectionObserver((elements, self) => {
      elements.forEach(element => {
        isVisible = element.isIntersecting;
      });
    }, observerConfig);

    observer.observe(image);

    image.style.transform = `scale(${1 + scaleAmount * percentageSeen(image)})`;

    window.addEventListener("scroll", () => {
      if (isVisible) {
        scrollPosY = window.pageYOffset;
        image.style.transform = `scale(${1 +
          scaleAmount * percentageSeen(image)})`;
      }
    });
  });
  const left = document.querySelector('.left')
  const right = document.querySelector('.right')
  const container = document.querySelector('.container')

  left.addEventListener('mouseenter', () => container.classList.add('hover-left'))
  left.addEventListener('mouseleave', () => container.classList.remove('hover-left'))

  right.addEventListener('mouseenter', () => container.classList.add('hover-right'))
  right.addEventListener('mouseleave', () => container.classList.remove('hover-right'))
function percentageSeen(element) {
    const parent = element.parentNode;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const elPosY = parent.getBoundingClientRect().top + scrollY;
    const borderHeight = parseFloat(getComputedStyle(parent).getPropertyValue('border-bottom-width')) + parseFloat(getComputedStyle(element).getPropertyValue('border-top-width'));
    const elHeight = parent.offsetHeight + borderHeight;

    if (elPosY > scrollY + viewportHeight) {
      return 0;
    } else if (elPosY + elHeight < scrollY) {
      return 100;
    } else {
      const distance = scrollY + viewportHeight - elPosY;
      let percentage = distance / ((viewportHeight + elHeight) / 100);
      percentage = Math.round(percentage);

      return percentage;
    }
  }
}

scrollZoom();

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

const link1 = document.getElementById('list-item-3-1');
const link2 = document.getElementById('list-item-3-2');
const link3 = document.getElementById('list-item-3-3');
const link4 = document.getElementById('list-item-3-4');
const image = document.getElementById('main-image2');

// Event listeners for link hover
link1.addEventListener('mouseover', () => {
  image.src = '/images/otherassets/Camera.png'; // Replace with image URL for link1
});
link1.addEventListener('mouseout', () => {
  image.src = '/images/otherassets/user.jpeg'; // Replace with image URL for link1
});

link2.addEventListener('mouseover', () => {
  image.src = '/images/otherassets/team.png'; // Replace with image URL for link2
});
link2.addEventListener('mouseout', () => {
  image.src = '/images/otherassets/user.jpeg'; // Replace with image URL for link1
});

link3.addEventListener('mouseover', () => {
  image.src = '/images/otherassets/user.jpeg'; // Replace with image URL for link3
});
link3.addEventListener('mouseout', () => {
  image.src = '/images/otherassets/user.jpeg'; // Replace with image URL for link1
});

link4.addEventListener('mouseover', () => {
  image.src = '/images/otherassets/future.png'; // Replace with image URL for link3
});
link4.addEventListener('mouseout', () => {
  image.src = '/images/otherassets/user.jpeg'; // Replace with image URL for link1
});
$('.footer-nav a').on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, '300');
});


