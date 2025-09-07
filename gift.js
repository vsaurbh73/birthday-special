document.addEventListener('DOMContentLoaded', function() {
    const giftBox = document.getElementById('giftBox');
    const giftLid = document.getElementById('giftLid');
    const messageContainer = document.getElementById('messageContainer');
    const hiddenMessage = document.getElementById('hiddenMessage');
    const confettiContainer = document.getElementById('confettiContainer');
    const clickHint = document.querySelector('.click-hint');
    
    let isOpened = false;
    
    // Gift box click handler
    giftBox.addEventListener('click', function() {
        if (!isOpened) {
            openGift();
            isOpened = true;
        }
    });
    
    function openGift() {
        // Hide click hint
        clickHint.classList.add('hidden');
        
        // Add clicked class to trigger animations
        giftBox.classList.add('clicked');
        
        // Make hidden message rise from inside the box
        setTimeout(() => {
            hiddenMessage.classList.add('rise');
        }, 600);
        
        // Start confetti animation
        setTimeout(() => {
            createConfetti();
        }, 1200);
        
        // Add celebration sound effect
        playSound();
        
        // Auto-close gift box after 8 seconds
        setTimeout(() => {
            closeGift();
        }, 8000);
    }
    
    function closeGift() {
        // Hide message first
        hiddenMessage.classList.remove('rise');
        
        // Close gift box animation
        giftBox.classList.remove('clicked');
        
        // Clear any remaining confetti
        while (confettiContainer.firstChild) {
            confettiContainer.removeChild(confettiContainer.firstChild);
        }
        
        // Show click hint again
        clickHint.classList.remove('hidden');
        
        // Reset opened state
        isOpened = false;
    }
    
    function createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // Random properties
                const color = colors[Math.floor(Math.random() * colors.length)];
                const left = Math.random() * 100;
                const animationDuration = Math.random() * 2 + 2;
                const delay = Math.random() * 2;
                
                confetti.style.backgroundColor = color;
                confetti.style.left = left + '%';
                confetti.style.animationDuration = animationDuration + 's';
                confetti.style.animationDelay = delay + 's';
                
                // Random shapes
                if (Math.random() > 0.5) {
                    confetti.style.borderRadius = '50%';
                } else {
                    confetti.style.transform = 'rotate(45deg)';
                }
                
                confettiContainer.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, (animationDuration + delay) * 1000);
                
            }, i * 100);
        }
    }
    
    function playSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const notes = [523.25, 659.25, 783.99, 1046.50];
            
            notes.forEach((frequency, index) => {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
                    oscillator.type = 'sine';
                    
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.3);
                }, index * 150);
            });
        } catch (error) {
            console.log('Audio not supported or blocked');
        }
    }
    
    // Click on popup to close it
    messageContainer.addEventListener('click', function() {
        messageContainer.classList.remove('show');
    });
    
    // Reset function for testing
    window.resetGift = function() {
        isOpened = false;
        giftBox.classList.remove('clicked');
        hiddenMessage.classList.remove('rise');
        messageContainer.classList.remove('show');
        clickHint.classList.remove('hidden');
        
        while (confettiContainer.firstChild) {
            confettiContainer.removeChild(confettiContainer.firstChild);
        }
    };
    
    // Mobile menu functionality
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
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
    }
});