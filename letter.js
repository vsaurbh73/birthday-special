// Letters to Her - Interactive JavaScript

// Letter content data
const letters = {
  1: {
   
    title: "Thankyou so muchhh",
    content: `My dearest love,

You are one of the most beautiful moments of my life — and I never want to lose this moment. Whenever I look at you, I see my future. You are not just my love, you are my life partner, the answer to my prayers.

I always wished for a partner who could lovingly correct my mistakes, stand by me through every up and down, someone with whom I could share everything — my secrets, my happiness, and even my pain. A partner who would support me in every way, whether in my growth or in my emotions. And now, I’ve found that partner in you.

From the bottom of my heart, thank you for coming into my life and filling my world with love and peace. You are my strength, my inspiration, and my greatest blessing. You are mine — and you always will be.`
  },
  2: {
  
    title: "I'm Sorry",
    content: `My bchaaa,

I know I’ve made many mistakes… I’ve hurt you, ignored you, made you cry, teased you, and even raised my voice in anger. There were times I didn’t pick up your late-night calls, and even times when I did things I should have never done without telling you.

For every single moment I hurt you, I am deeply sorry. Please know, my love, I never meant to cause you pain. You are too precious to me, and the thought of losing you breaks me. I promise to learn from my mistakes and love you the way you truly deserve — with all my heart, forever.`
  },
  3: {

    title: "Her Complaint",
    content: `My betaa,

You always say that I never appreciate you, never compliment you, never love you from the heart… But today, I want to tell you the truth.

I love you endlessly. Every little thing about you makes me fall for you even more. I do appreciate you, I do admire you, and I do love you with all my heart — maybe I just don’t express it the way you expect. But believe me, you are my world, my everything.

Yes, I love teasing you, annoying you, making you a little mad sometimes — but behind all of it, there’s only love.

So from now on, never think that I don’t admire you, don’t appreciate you, or don’t love you… because my love for you is boundless and eternal`
  },
  4: {
 
    title: "My Promise",
    content: `My bhalu,

I promise to love you the way I do today, for the rest of my life. I promise to wipe away your tears and turn them into smiles, to always make you laugh. I promise to stand by your side in every way — your dreams will be my dreams, your happiness my mission. I promise never to raise my hand in anger, but to hold you with care and protect you with my prayers. I promise to respect your family as my own. Every wish of yours, big or small, will be my responsibility to fulfill. I promise to love you like my child, to treasure you like my soul, and to never let go of your hand — no matter where life takes us.`
  },
  5: {

    title: "My Feeling",
    content: `My queen,

When I think about the moments I’ve spent with you, I feel the same peace I feel when you’re right beside me. The way you kiss me, the way you hold me in your arms, the way you care for me, and even the way you talk with that childlike innocence — every little thing carries a beautiful feeling within it. Each memory ties my heart closer to you, making me want to relive them again and again. All I wish for is to have you as my life partner, filling my life forever with these precious and magical moments.`
  },
  6: {
   
    title: "My future partner",
    content: `My wifey,

I don’t know what will happen in the future, but I see my future only with you. I am waiting for the day when you will stand in front of me with the varmala. I am waiting for the day when your maang will have sindoor with my name. I am waiting for the day when you will take the saat phere with me. I am waiting for the day when you will step into my house. I am waiting for the day when you will get me ready in the morning for office. I am waiting for the day when you will ask me, ‘khane me kya banau ji ?’ I am waiting for the day when you will insist on going to your parents’ house. I am waiting for the day when you will sit in front of the mirror getting ready. I am waiting for the day when you will walk with me at family functions. I am waiting for the day when you’ll say to me, "suniye na, saree thik kar dijiye". I am waiting for the day when our little one will come into this world. And maybe… you are waiting for this too.`
  }
};

// DOM Elements
const letterModal = document.getElementById('letterModal');
const modalClose = document.getElementById('modalClose');
const letterDate = document.getElementById('letterDate');
const letterTitle = document.getElementById('letterTitle');
const letterBody = document.getElementById('letterBody');
const letterEnvelopes = document.querySelectorAll('.letter-envelope');

// Helper: completely disable decorative animations
function disableDecorAnimations() {
  const animatedEls = document.querySelectorAll('.doodle, .floating-elements > div, .envelope-decoration, .wax-seal, .ribbon');
  animatedEls.forEach(el => {
    el.style.animation = 'none';
    el.style.transition = 'none';
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
  initializeLetters();
  addEventListeners();
  addFloatingAnimations();
  // Force disable any animations that might have been set
  disableDecorAnimations();
});

// Initialize letter envelopes
function initializeLetters() {
  letterEnvelopes.forEach((envelope, index) => {
    // Add staggered animation delay
    envelope.style.animationDelay = `${index * 0.2}s`;

    // Add hover effects
    envelope.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-10px) scale(1.05)';
      this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });

    envelope.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
    });
  });
}

// Add event listeners
function addEventListeners() {
  // Letter envelope clicks
  letterEnvelopes.forEach(envelope => {
    envelope.addEventListener('click', function () {
      const letterId = this.getAttribute('data-letter');
      openLetter(letterId);
    });
  });

  // Modal close
  modalClose.addEventListener('click', closeModal);

  // Close modal on backdrop click
  letterModal.addEventListener('click', function (e) {
    if (e.target === letterModal) {
      closeModal();
    }
  });

  // Close modal on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && letterModal.classList.contains('active')) {
      closeModal();
    }
  });
}

// Open letter modal
function openLetter(letterId) {
  const letter = letters[letterId];
  if (!letter) return;

  // Populate modal content
  letterDate.textContent = letter.date;
  letterTitle.textContent = letter.title;
  letterBody.innerHTML = letter.content.replace(/\n/g, '<br>');

  // Show modal with animation
  letterModal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Add opening animation
  const modalContent = letterModal.querySelector('.modal-content');
  modalContent.style.animation = 'modalSlideIn 0.4s ease-out forwards';
}

// Close modal
function closeModal() {
  letterModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Add floating animations to decorative elements
function addFloatingAnimations() {
  const doodles = document.querySelectorAll('.doodle');
  const floatingElements = document.querySelectorAll('.floating-elements > div');

  // Add random floating animations (no-op when disabled via CSS)
  [...doodles, ...floatingElements].forEach((element, index) => {
    const delay = Math.random() * 4;
    const duration = 6 + Math.random() * 4;

    element.style.animationDelay = `${delay}s`;
    element.style.animationDuration = `${duration}s`;
  });
}

// Add scroll-triggered animations
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe letter envelopes
  letterEnvelopes.forEach(envelope => {
    envelope.style.opacity = '0';
    envelope.style.transform = 'translateY(30px)';
    envelope.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(envelope);
  });
}

// Add paper texture effect
function addPaperTexture() {
  const lettersSection = document.querySelector('.letters-section');
  if (lettersSection) {
    lettersSection.style.backgroundImage = `
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      linear-gradient(135deg, var(--paper-texture) 0%, var(--light-beige) 100%)
    `;
  }
}

// Add wax seal animation
function addWaxSealAnimations() {
  const waxSeals = document.querySelectorAll('.wax-seal');

  waxSeals.forEach((seal, index) => {
    seal.style.animationDelay = `${index * 0.5}s`;
    seal.addEventListener('click', function (e) {
      e.stopPropagation();
      // Keep click effect subtle without animation loops
      this.style.transform = 'scale(1.05)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
}

// Add ribbon animations
function addRibbonAnimations() {
  const ribbons = document.querySelectorAll('.ribbon');

  ribbons.forEach((ribbon, index) => {
    // Do not set any animation to keep ribbons static
    ribbon.style.animation = 'none';
  });
}

// Add CSS animation for ribbon sway (kept but unused when disabled)
const style = document.createElement('style');
style.textContent = `
  @keyframes ribbonSway {
    0%, 100% { transform: rotate(var(--initial-rotation)) translateY(0px); }
    50% { transform: rotate(calc(var(--initial-rotation) + 5deg)) translateY(-5px); }
  }
  
  .ribbon-1 { --initial-rotation: 15deg; }
  .ribbon-2 { --initial-rotation: -20deg; }
  .ribbon-3 { --initial-rotation: 25deg; }
  .ribbon-4 { --initial-rotation: -15deg; }
  .ribbon-5 { --initial-rotation: 20deg; }
  .ribbon-6 { --initial-rotation: -25deg; }
`;
document.head.appendChild(style);

// Initialize all animations
document.addEventListener('DOMContentLoaded', function () {
  addScrollAnimations();
  addPaperTexture();
  addWaxSealAnimations();
  addRibbonAnimations();
  // Ensure decorative animations are disabled after any setup
  disableDecorAnimations();
});

// Add confetti effect when opening letters
function addConfettiEffect() {
  const colors = ['#e8b4b8', '#d4a5a5', '#b8c5a6', '#d4c5f9'];

  function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';

    document.body.appendChild(confetti);

    const animation = confetti.animate([
      { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
      { transform: `translateY(${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
    ], {
      duration: 3000 + Math.random() * 2000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });

    animation.onfinish = () => {
      document.body.removeChild(confetti);
    };
  }

  // Create confetti when opening letters
  letterEnvelopes.forEach(envelope => {
    envelope.addEventListener('click', function () {
      for (let i = 0; i < 20; i++) {
        setTimeout(createConfetti, i * 100);
      }
    });
  });
}

// Initialize confetti effect
document.addEventListener('DOMContentLoaded', addConfettiEffect);
