// Typewriter effect for hero section
(() => {
  const typewriterElement = document.getElementById('typewriter');
  if (!typewriterElement) return;

  const phrases = ['My Love', 'Dr. Sahiba', 'My Jaan','My Sweetheart','My Bhalu'];
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;
  let deletingSpeed = 100;
  let pauseTime = 2000;

  function typeWriter() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
      // Deleting characters
      typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = deletingSpeed;
    } else {
      // Typing characters
      typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 150;
    }

    if (!isDeleting && currentCharIndex === currentPhrase.length) {
      // Finished typing, pause then start deleting
      typingSpeed = pauseTime;
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      // Finished deleting, move to next phrase
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before starting next phrase
    }

    setTimeout(typeWriter, typingSpeed);
  }

  // Start the typewriter effect
  setTimeout(typeWriter, 1000);
})();

// Mobile menu toggle
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

// Smooth scrolling for anchor links
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target instanceof Element && target.matches('a[href^="#"]')) {
    const id = target.getAttribute('href');
    if (id && id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navLinks && navLinks.classList.remove('open');
        menuButton && menuButton.setAttribute('aria-expanded', 'false');
      }
    }
  }
});

// Subtle confetti speed variance
const confetti = document.querySelectorAll('.confetti span');
confetti.forEach((piece, idx) => {
  const duration = 7 + Math.random() * 4; // 7-11s
  const delay = parseFloat(getComputedStyle(piece).animationDelay) || 0;
  piece.style.animationDuration = `${duration}s`;
  piece.style.animationDelay = `${delay}`;
  piece.style.transform = `rotate(${Math.random() * 180}deg)`;
});





// Live anniversary breakdown (years, months, weeks, days, hours, minutes, seconds)
(() => {
  const section = document.querySelector('#celebration');
  const grid = document.getElementById('anniv-live');
  if (!section || !grid) return;

  const dateEl = document.getElementById('anniv-date');
  const totalYearsEl = document.getElementById('total-years');
  const totalMonthsEl = document.getElementById('total-months');
  const totalWeeksEl = document.getElementById('total-weeks');
  const totalDaysEl = document.getElementById('total-days');
  const totalHoursEl = document.getElementById('total-hours');
  const totalMinutesEl = document.getElementById('total-minutes');
  const totalSecondsEl = document.getElementById('total-seconds');

  const iso = section.getAttribute('data-anniversary') || '';
  const start = new Date(iso);
  if (!isFinite(start.getTime())) return;
  if (dateEl) {
    try { dateEl.textContent = start.toLocaleString(undefined, { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' }); }
    catch (_) { dateEl.textContent = start.toDateString(); }
  }

  function totalsFromMs(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const totalMinutes = Math.floor(ms / (1000 * 60));
    const totalHours = Math.floor(ms / (1000 * 60 * 60));
    const totalDays = Math.floor(ms / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    // For total months/years use calendar diff to be accurate
    const now = new Date();
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    if (now.getDate() < start.getDate()) {
      months -= 1; // not completed this month yet
    }
    if (months < 0) { months += 12; years -= 1; }
    const totalMonths = years * 12 + months;
    return { totalSeconds, totalMinutes, totalHours, totalDays, totalWeeks, totalMonths, totalYears: years };
  }

  function update() {
    const now = new Date();
    const msDiff = Math.max(0, now.getTime() - start.getTime());
    const t = totalsFromMs(msDiff);
    if (totalYearsEl) totalYearsEl.textContent = String(t.totalYears);
    if (totalMonthsEl) totalMonthsEl.textContent = String(t.totalMonths);
    if (totalWeeksEl) totalWeeksEl.textContent = String(t.totalWeeks);
    if (totalDaysEl) totalDaysEl.textContent = String(t.totalDays);
    if (totalHoursEl) totalHoursEl.textContent = String(t.totalHours);
    if (totalMinutesEl) totalMinutesEl.textContent = String(t.totalMinutes);
    if (totalSecondsEl) totalSecondsEl.textContent = String(t.totalSeconds);
  }

  update();
  setInterval(update, 1000);
})();

// Simple audio player: play/pause + seek + progress
(() => {
  const audio = document.getElementById('love-audio');
  const playBtn = document.querySelector('.player .play-btn');
  const range = document.querySelector('.player .progress');
  const cur = document.querySelector('.player .current');
  const dur = document.querySelector('.player .duration');
  if (!audio || !playBtn || !range || !cur || !dur) return;

  function formatTime(sec) {
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    const m = Math.floor(sec / 60).toString();
    return `${m}:${s}`;
  }

  audio.addEventListener('loadedmetadata', () => {
    dur.textContent = isFinite(audio.duration) ? formatTime(audio.duration) : '0:00';
  });

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playBtn.classList.add('playing');
      playBtn.setAttribute('aria-label', 'Pause');
    } else {
      audio.pause();
      playBtn.classList.remove('playing');
      playBtn.setAttribute('aria-label', 'Play');
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (!isFinite(audio.duration)) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    range.value = String(pct);
    // Update CSS variable for WebKit/Blink (gradient fill)
    range.style.setProperty('--played', pct + '%');
    cur.textContent = formatTime(audio.currentTime);
  });

  range.addEventListener('input', () => {
    if (!isFinite(audio.duration)) return;
    const pct = parseFloat(range.value) / 100;
    audio.currentTime = pct * audio.duration;
    // Live update while dragging
    range.style.setProperty('--played', (pct * 100) + '%');
  });

  audio.addEventListener('ended', () => {
    playBtn.classList.remove('playing');
    playBtn.setAttribute('aria-label', 'Play');
    range.value = '0';
    range.style.setProperty('--played', '0%');
    cur.textContent = '0:00';
  });
})();


// Music cover auto-rotator with smooth crossfade
(() => {
  const cover = document.querySelector('.music-cover img');
  if (!cover) return;

  // Provide a small curated set of covers (first one should match the default)
  const covers = [
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1454922915609-78549ad709bb?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=900&auto=format&fit=crop'
  ];

  // Preload images for smooth swapping
  covers.forEach((src) => { const img = new Image(); img.src = src; });

  let index = 0;

  function crossfadeTo(nextSrc) {
    cover.style.opacity = '0';
    // Wait for fade-out, then swap, then fade-in
    setTimeout(() => {
      cover.src = nextSrc;
      cover.onload = () => { cover.style.opacity = '1'; };
    }, 350);
  }

  setInterval(() => {
    index = (index + 1) % covers.length;
    crossfadeTo(covers[index]);
  }, 5000);
})();

// Video section: ensure autoplay starts when in view (fallback for some browsers)
(() => {
  const video = document.querySelector('#love-video .video');
  if (!video) return;
  const tryPlay = () => { video.play().catch(() => {}); };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) tryPlay(); });
  }, { threshold: 0.2 });
  io.observe(video);
})();

// Ensure all moment videos are muted and have no audio
(() => {
  const momentVideos = document.querySelectorAll('.moment-video');
  momentVideos.forEach(video => {
    video.muted = true;
    video.volume = 0;
    
    // Force mute on play
    video.addEventListener('play', () => {
      video.muted = true;
      video.volume = 0;
    });
    
    // Force mute on volume change
    video.addEventListener('volumechange', () => {
      if (video.volume > 0) {
        video.volume = 0;
        video.muted = true;
      }
    });
  });
})();

// Navbar: hide at top, slide down on scroll
(() => {
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
})();


// Final section: open/close animated love modal
(() => {
  const openBtn = document.getElementById('love-btn');
  const modal = document.querySelector('.love-modal');
  const closeBtn = document.querySelector('.love-close');
  const backdrop = document.querySelector('.love-backdrop');
  const overlay = document.querySelector('.celebration-overlay');
  const balloonsLayer = document.querySelector('.balloons-layer');
  const fwCanvas = document.querySelector('.fireworks-canvas');
  const audioEl = document.getElementById('love-audio');
  const popupAudio = document.getElementById('popup-audio');
  const playerPlayBtn = document.querySelector('.player .play-btn');
  if (!openBtn || !modal) return;

  // ================= Continuous celebration utilities =================
  let celebrationRunning = false;
  let stopFireworksFn = null;
  let stopBalloonsFn = null;

  function startFireworksContinuous() {
    if (!overlay || !fwCanvas) return () => {};
    const ctx = fwCanvas.getContext('2d');
    function resize() {
      fwCanvas.width = window.innerWidth;
      fwCanvas.height = window.innerHeight;
    }
    resize();
    let running = true;
    const gravity = 0.06;
    const friction = 0.985;
    const rockets = [];
    const particles = [];
    let lastSpawn = 0;
    let last = performance.now();

    function spawnRocket() {
      const x = Math.random() * (fwCanvas.width * 0.7) + fwCanvas.width * 0.15;
      const y = fwCanvas.height + 10;
      const vx = (Math.random() - 0.5) * 0.6;
      const vy = -(Math.random() * 3 + 7);
      const color = `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`;
      rockets.push({ x, y, vx, vy, color, life: Math.random() * 400 + 300 });
    }

    function explode(x, y, color) {
      const count = 120 + Math.floor(Math.random() * 60);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
        const speed = Math.random() * 3 + 1.5;
        particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, alpha: 1, color, size: Math.random() * 2 + 1 });
      }
    }

    for (let i = 0; i < 3; i++) spawnRocket();

    function frame(now) {
      if (!running) return;
      if (!celebrationRunning) { running = false; return; }
      const dt = Math.min(32, now - last);
      last = now;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);
      ctx.globalCompositeOperation = 'lighter';

      if (now - lastSpawn > 220 + Math.random() * 200) {
        spawnRocket();
        lastSpawn = now;
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;
        r.vy += gravity * 0.25;
        r.life -= dt;
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fill();
        if (r.vy >= -0.5 || r.life <= 0 || r.y < fwCanvas.height * (0.25 + Math.random() * 0.2)) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += gravity;
        p.vx *= friction;
        p.vy *= friction;
        p.alpha *= 0.985;
        if (p.alpha < 0.03) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      requestAnimationFrame(frame);
    }

    const raf = requestAnimationFrame(frame);
    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    return () => {
      running = false;
      window.removeEventListener('resize', onResize);
      ctx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
    };
  }

  function startBalloonStream() {
    if (!overlay || !balloonsLayer) return () => {};
    const colors = ['#ff6b9e','#ffd43b','#74c0fc','#ff8787','#a5d8ff','#63e6be'];
    const active = new Set();
    const spawn = () => {
      if (!celebrationRunning) return;
      const batch = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < batch; i++) {
        const el = document.createElement('span');
        el.className = 'balloon';
        el.style.background = colors[Math.floor(Math.random()*colors.length)];
        el.style.left = (Math.random() * 90 + 5) + '%';
        const delay = 0; // show immediately
        const dur = 10 + Math.random() * 6;
        el.style.setProperty('--dur', dur + 's');
        el.style.animationDelay = delay + 's';
        balloonsLayer.appendChild(el);
        active.add(el);
        setTimeout(() => { if (active.has(el)) { el.remove(); active.delete(el); } }, (dur + delay) * 1000 + 400);
      }
    };
    const interval = setInterval(spawn, 900);
    spawn();
    return () => {
      clearInterval(interval);
      active.forEach((el) => { el.remove(); });
      active.clear();
    };
  }

  function startCelebrationContinuous() {
    if (celebrationRunning) return;
    celebrationRunning = true;
    overlay && overlay.classList.add('active');
    stopFireworksFn = startFireworksContinuous();
    stopBalloonsFn = startBalloonStream();
  }

  function stopCelebration() {
    if (!celebrationRunning) return;
    celebrationRunning = false;
    stopFireworksFn && stopFireworksFn();
    stopBalloonsFn && stopBalloonsFn();
    overlay && overlay.classList.remove('active');
  }

  function triggerCelebration() {
    // Start continuous celebration while modal is open
    startCelebrationContinuous();
  }

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    triggerCelebration();
    // Start popup-specific music on user gesture; fallback to main audio if missing
    const toPlay = popupAudio || audioEl;
    if (toPlay) {
      try {
        toPlay.volume = 0.6;
        toPlay.play().catch(() => { /* autoplay might be blocked, ignore */ });
        if (!popupAudio) {
          playerPlayBtn && playerPlayBtn.classList.add('playing');
          playerPlayBtn && playerPlayBtn.setAttribute('aria-label', 'Pause');
        }
      } catch (_) { /* ignore */ }
    }
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    stopCelebration();
    // Stop popup music when closing; if using main audio, also reset UI
    const toStop = popupAudio || audioEl;
    if (toStop) {
      try {
        toStop.pause();
        toStop.currentTime = 0;
        if (toStop === audioEl) {
          playerPlayBtn && playerPlayBtn.classList.remove('playing');
          playerPlayBtn && playerPlayBtn.setAttribute('aria-label', 'Play');
        }
      } catch (_) { /* ignore */ }
    }
  }

  // Fireworks (canvas-based) with simple particle physics
  function runFireworks(durationMs = 2200) {
    if (!overlay || !fwCanvas) return Promise.resolve();
    const ctx = fwCanvas.getContext('2d');
    function resize() {
      fwCanvas.width = window.innerWidth;
      fwCanvas.height = window.innerHeight;
    }
    resize();
    let running = true;
    overlay.classList.add('active');

    const gravity = 0.06;
    const friction = 0.985;
    const rockets = [];
    const particles = [];

    function spawnRocket() {
      const x = Math.random() * (fwCanvas.width * 0.7) + fwCanvas.width * 0.15;
      const y = fwCanvas.height + 10;
      const vx = (Math.random() - 0.5) * 0.6;
      const vy = -(Math.random() * 3 + 7);
      const color = `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`;
      rockets.push({ x, y, vx, vy, color, life: Math.random() * 400 + 300 });
    }

    function explode(x, y, color) {
      const count = 120 + Math.floor(Math.random() * 60);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
        const speed = Math.random() * 3 + 1.5;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: Math.random() * 2 + 1,
        });
      }
    }

    // Pre-seed some rockets
    for (let i = 0; i < 4; i++) spawnRocket();

    let lastSpawn = 0;
    let last = performance.now();

    function frame(now) {
      if (!running) return;
      const dt = Math.min(32, now - last);
      last = now;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);
      ctx.globalCompositeOperation = 'lighter';

      // Spawn rockets periodically
      if (now - lastSpawn > 260 + Math.random() * 180) {
        spawnRocket();
        lastSpawn = now;
      }

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;
        r.vy += gravity * 0.25;
        r.life -= dt;
        // Draw rocket trail
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fill();

        if (r.vy >= -0.5 || r.life <= 0 || r.y < fwCanvas.height * (0.25 + Math.random() * 0.2)) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += gravity;
        p.vx *= friction;
        p.vy *= friction;
        p.alpha *= 0.985;
        if (p.alpha < 0.03) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      requestAnimationFrame(frame);
    }

    const raf = requestAnimationFrame(frame);

    const endPromise = new Promise((resolve) => {
      setTimeout(() => {
        running = false;
        overlay.classList.remove('active');
        ctx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
        resolve();
      }, durationMs);
    });

    window.addEventListener('resize', resize, { once: true });
    return endPromise;
  }

  // Balloons: create multiple colored balloons falling with slight sway
  function releaseBalloons(count = 18, durationMs = 2200) {
    if (!overlay || !balloonsLayer) return Promise.resolve();
    overlay.classList.add('active');
    const colors = ['#ff6b9e','#ffd43b','#74c0fc','#ff8787','#a5d8ff','#63e6be'];
    const balloons = [];
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'balloon';
      const color = colors[i % colors.length];
      el.style.background = color;
      const left = Math.random() * 90 + 5; // 5%..95%
      el.style.left = left + '%';
      const delay = 0; // show immediately
      const dur = 8 + Math.random() * 4.5; // longer fall duration
      el.style.setProperty('--dur', dur + 's');
      el.style.animationDelay = delay + 's';
      // subtle horizontal sway via CSS animation stacking
      el.style.animationTimingFunction = 'cubic-bezier(.2,.7,.2,1)';
      balloonsLayer.appendChild(el);
      balloons.push(el);
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        balloons.forEach(b => b.remove());
        overlay.classList.remove('active');
        resolve();
      }, durationMs);
    });
  }

  openBtn.addEventListener('click', openModal);
  closeBtn && closeBtn.addEventListener('click', closeModal);
  backdrop && backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();

