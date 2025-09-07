// Shared Mobile Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');
  
  // Scroll-triggered navbar visibility
  let lastScrollY = 0;
  let ticking = false;
  
  function updateNavbar() {
      const scrollY = window.scrollY;
      
      if (scrollY > 100) {
          navbar.classList.add('show');
      } else {
          navbar.classList.remove('show');
      }
      
      lastScrollY = scrollY;
      ticking = false;
  }
  
  window.addEventListener('scroll', () => {
      if (!ticking) {
          requestAnimationFrame(updateNavbar);
          ticking = true;
      }
  });
  
  // Mobile menu functionality
  if (mobileMenu && navMenu) {
      mobileMenu.addEventListener('click', () => {
          mobileMenu.classList.toggle('active');
          navMenu.classList.toggle('active');
      });
      
      // Close mobile menu when clicking on a link
      document.querySelectorAll('.nav-link').forEach(link => {
          link.addEventListener('click', () => {
              mobileMenu.classList.remove('active');
              navMenu.classList.remove('active');
          });
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
          if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
              mobileMenu.classList.remove('active');
              navMenu.classList.remove('active');
          }
      });
  }
});
