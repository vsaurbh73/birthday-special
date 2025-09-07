// Story Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navbar functionality
    initNavbar();
    
    // Initialize animations
    initAnimations();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize back to top button
    initBackToTop();
});

// Initialize navbar functionality
function initNavbar() {
    const header = document.querySelector('header.navbar');
    if (!header) return;
    
    const revealThreshold = 8; // px scrolled before showing
    let lastKnownScrollY = 0;
    let ticking = false;

    function update() {
        const y = lastKnownScrollY;
        if (y > revealThreshold) {
            header.classList.add('is-visible');
        } else {
            header.classList.remove('is-visible');
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        lastKnownScrollY = window.scrollY || window.pageYOffset;
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });

    // Ensure hidden on initial load at top; reveal if loaded mid-page
    lastKnownScrollY = window.scrollY || window.pageYOffset;
    if (lastKnownScrollY > revealThreshold) header.classList.add('is-visible');

    // Mobile menu toggle
    const menuButton = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuButton && navLinks) {
        menuButton.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            menuButton.setAttribute('aria-expanded', String(isOpen));
        });
    }
}

// Initialize animations using Intersection Observer
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}



// Initialize smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add smooth scroll to journey button in hero section
    const journeyButton = document.querySelector('.hero button');
    if (journeyButton) {
        journeyButton.addEventListener('click', function() {
            const journeySection = document.querySelector('.journey-section');
            if (journeySection) {
                window.scrollTo({
                    top: journeySection.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Initialize back to top button
function initBackToTop() {
    // Create back to top button if it doesn't exist
    let backToTopButton = document.querySelector('.back-to-top');
    
    if (!backToTopButton) {
        backToTopButton = document.createElement('div');
        backToTopButton.className = 'back-to-top';
        backToTopButton.innerHTML = '↑';
        document.body.appendChild(backToTopButton);
    }
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const heroSection = document.querySelector('.hero::before');
    
    if (heroSection) {
        heroSection.style.transform = `translate3d(0, ${scrollPosition * 0.4}px, 0)`;
    }
});

// Add image hover effect for journey images
document.querySelectorAll('.journey-img img').forEach(img => {
    img.addEventListener('mouseover', function() {
        this.style.transform = 'rotate(2deg) scale(1.03)';
    });
    
    img.addEventListener('mouseout', function() {
        this.style.transform = 'rotate(0deg) scale(1)';
    });
});