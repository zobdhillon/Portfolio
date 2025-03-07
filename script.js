// Menu Toggle button

const navToggle = document.querySelector(".navbar-toggle");

navToggle.addEventListener("click", () => {
    document.querySelector('.navbar').classList.toggle("active");
});

// tab Interface for different section of resume
const resumeHeading = document.querySelector(".resume-heading");
const resumeItems = document.querySelectorAll(".resume-item");
const resumeTabs = document.querySelectorAll(".resume-tab");

resumeHeading.addEventListener("click", (e) => {
    e.preventDefault();
    const clickedItemId = e.target.dataset.id;

    if(clickedItemId) {
        resumeItems.forEach((item) => {
            item.classList.remove("active");
        });
    e.target.parentElement.classList.add("active");

    resumeTabs.forEach((tab) => {
        tab.classList.remove("active");
    });
    const correspondingTab = document.getElementById(clickedItemId);
    correspondingTab.classList.add("active")
    }
})

// Navbar Sticky while scrolling
function stickyNav() {
    var headerHeight = document.querySelector("#about").offsetHeight/ 2;
    var navbar = document.querySelector("header");
    var scrollValue = window.scrollY;
    const logo = document.querySelector(".logo");

    if(scrollValue > headerHeight) {
        navbar.classList.add("header-sticky");
    }else if (scrollValue < headerHeight) {
        navbar.classList.remove("header-sticky");
    }
}

window.addEventListener("scroll", stickyNav);

// Initialize Swiper in JS for Project Slider
const swiper = new Swiper('.project-slider', {
    // Default parameters
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: ".nextArrowBtn",
        prevEl: ".prevArrowBtn",
    },
    pagination: {
        el: ".swiper-pagination",
        renderBullet: function(index, className) {
            return `<li class="${className}"></li>`;
        },
        clickable: true,
    },
    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 576px
        576: {
            slidesPerView: 2,
        },
        // when window width is >= 768px
        768: {
            slidesPerView: 3,
            spaceBetween: 30
        },
    }
});


const swiper1 = new Swiper('.testimonial-swiper .swiper', {
slidesPerView: 1,
spaceBetween: 30,
loop: true,
grabCursor: true,

breakpoints: {
576: {
        slidesPerView: 1,
 },
768: {
 slidesPerView: 1,
 effect: "fade",
 },
 }
});

// Send Email
const msg = document.querySelector('.form-msg');

(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
      publicKey: "cAvA_dUoUWsBG5iWf",
    });
})();

window.onload = function() {
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    document.querySelector(".loader").classList.add('show');

    // these IDs from the previous steps
    emailjs.sendForm('service_f6s02ts', 'template_iiajbxm', this)
    .then(() => {
        document.getElementById('contact-form').reset();
        document.querySelector(".loader").classList.remove('show');
        msg.innerHTML = '';
        msg.innerHTML += "<span class='success-msg'>Email Sent</span>";
        msg.classList.add('show');
        setTimeout(() => {
            msg.classList.remove('show')
        }, 2000);
    }, (error) => {
        document.querySelector(".loader").classList.toggle('show');
        msg.classList.add('show');
        msg.innerHTML += "<span class='error-msg'>Email Not Sent</span>";
    });
    });
}

// Active Link on Page Scroll
const sections = document.querySelectorAll("section[id]");

function scrollTracker() {
    const currentYScroll = window.scrollY;

    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50;
        const id = section.getAttribute('id');
        const currentNavLink = document.querySelector(`header .navbar a[href*='#${id}']`);

        if(
            currentYScroll > sectionTop &&
            currentYScroll <= sectionTop + sectionHeight
        ) {
            currentNavLink.classList.add('active-link');
        }else {
            currentNavLink.classList.remove('active-link');
        }
    })
}
window.addEventListener("scroll", scrollTracker);

// Dark and Light Theme Toggle

function isLight() {
    return localStorage.getItem("dark-mode");
  }
  
  function toggleRootClass() {
    document.querySelector("body").classList.toggle("dark");
  }
  
  function toggleLocalStorageItem() {
    if (isLight()) {
      localStorage.removeItem("dark-mode");
    } else {
      localStorage.setItem("dark-mode", "set");
    }
  }
  
  if (isLight()) {
    toggleRootClass();
  }
  
  document.querySelector(".theme-toggle").addEventListener("click", () => {
    toggleLocalStorageItem();
    toggleRootClass();
  });
  
  // Scroll to top

const limit = 200;
const scrollTopBtn = document.querySelector("#scroll-top-btn");
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.addEventListener("scroll", function () {
  console.log(window.scrollY);
  scrollTopBtn.classList.toggle("visible", window.scrollY >= limit);
});

// Scroll reveal

const sr = ScrollReveal({
    // reset: true,
    distance: "60px",
    duration: 2000,
    delay: 200,
  });
  
  sr.reveal(".about-intro, .project-slider", {
    origin: "left",
  });
  sr.reveal(
    ".resume-heading,.contact-info,.footer-contact,.testimonial-heading",
    {
      origin: "bottom",
    }
  );
  sr.reveal(".service-row", {
    origin: "bottom",
    interval: 800,
  });
  sr.reveal(".resume-body", {
    origin: "top",
  });