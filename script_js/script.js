function toggleNav() {
  const sidenav = document.getElementById("mySidenav");
  const overlay = document.getElementById("sidenavOverlay");
  const hamburger = document.querySelector(".hamburger");
  if (sidenav.style.width === "250px") {
    sidenav.style.width = "0";
    overlay.style.display = "none";
    hamburger.classList.remove("open");
  } else {
    sidenav.style.width = "250px";
    overlay.style.display = "block";
    hamburger.classList.add("open");
  }
  playSound('clickSound');
}

/* ===== SOUND EFFECTS SYSTEM ===== */
let soundEnabled = localStorage.getItem('soundEnabled') !== 'false';

/**
 * Toggle sound effects on/off
 * Stores preference in localStorage
 */
function toggleSound(event) {
  event.preventDefault();
  soundEnabled = !soundEnabled;
  localStorage.setItem('soundEnabled', soundEnabled);
  const btn = document.getElementById('soundToggleBtn');
  btn.classList.toggle('muted');
  btn.textContent = soundEnabled ? '🔊' : '🔇';
}

/**
 * Play sound effect if enabled
 * @param {string} soundId - ID of the audio element to play
 */
function playSound(soundId) {
  if (!soundEnabled) return;
  const audio = document.getElementById(soundId);
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Silently fail if audio can't play
    });
  }
}

// Initialize sound button state
window.addEventListener('load', function() {
  const btn = document.getElementById('soundToggleBtn');
  if (!soundEnabled && btn) {
    btn.classList.add('muted');
    btn.textContent = '🔇';
  }
});

// Add click sounds to interactive elements
document.addEventListener('DOMContentLoaded', function() {
  const clickableElements = document.querySelectorAll('a, button, .programme-card, .pricing-card');
  clickableElements.forEach(el => {
    el.addEventListener('click', function(e) {
      if (!e.target.classList.contains('hamburger') && !e.target.classList.contains('sound-toggle')) {
        playSound('clickSound');
      }
    });
  });
  
  // Add success sound when form submits
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      playSound('successSound');
    });
  }
});

window.onload = function () {
  const toTopBtn = document.getElementById('toTopBtn');

  window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      toTopBtn.classList.add('visible');
    } else {
      toTopBtn.classList.remove('visible');
    }
  };

  toTopBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
};

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you for contacting us! We will get back to you soon.');
      contactForm.reset();
    });
  }

const reservationForms = document.querySelectorAll('.reservation-form');
  // set minimum allowable date on each form's date input
  const todayStr = new Date().toISOString().split('T')[0];
  reservationForms.forEach(reservationForm => {
    const dateInput = reservationForm.querySelector('input[type="date"]');
    if (dateInput) {
      dateInput.setAttribute('min', todayStr);
    }

    reservationForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // validate that selected date is not in the past
      if (dateInput && dateInput.value) {
        const selected = new Date(dateInput.value);
        const now = new Date();
        now.setHours(0,0,0,0);
        if (selected < now) {
          alert('Please select a valid date (today or later) for your reservation.');
          return;
        }
      }

      alert('Thank you for your reservation! We will confirm your booking soon.');
      reservationForm.reset();
    });
  });

  // Close sidenav when clicking on sidenav links
  const sidenavLinks = document.querySelectorAll('#mySidenav a');
  sidenavLinks.forEach(link => {
    link.addEventListener('click', toggleNav);
  });

  // Close sidenav when clicking on overlay
  const overlay = document.getElementById("sidenavOverlay");
  if (overlay) {
    overlay.addEventListener('click', toggleNav);
  }

  // rotating banner slogan
const slogans = [
  'The only place to lift off.',
  'Push. Pull. Progress.',
  'Welcome to the Lift Zone.',
  'Enter the Lift Zone.',
  'Built in the Lift Zone.',
  'Where Strength Lives.',
  'Power Starts Here.',
  'Train Hard. Live Strong.',
  'Stronger Every Rep.',
  'No Limits. Just Lifts.',
  'Lift Heavy. Live Better.',
  'This Is Your Lift Zone.',
  'Raise the Bar.',
  'Born to Lift.',
  'Earn Your Strength.',
  'Make Every Rep Count.',
  'Strength Has No Shortcut.',
  'Fuel the Grind.',
  'Sweat. Lift. Repeat.',
  'Your Power Playground.',
  'Train Like a Beast.',
  'Unlock Your Strength.',
  'Dominate the Weights.',
  'Build. Break. Become.',
  'Iron Never Lies.',
  'Where Champions Train.',
  'Elevate Your Game.',
  'No Excuses. Just Results.',
  'Lift Beyond Limits.',
  'Strength Starts Now.',
  'Own the Barbell.',
  'Push Past Possible.',
  'Train Harder Than Yesterday.',
  'Built Not Born.',
  'Strong Mind. Strong Body.',
  'The House of Iron.',
  'Feel the Power.',
  'One More Rep.',
  'Rise and Grind.',
  'Make Muscles, Not Excuses.',
  'Lift. Focus. Conquer.',
  'Stronger Starts Here.',
  'Powered by Discipline.',
  'Respect the Iron.',
  'Transform Your Strength.',
  'The Strength Within.',
  'Become Unstoppable.',
  'Lift with Purpose.',
  'Power Your Potential.',
  'Train Relentless.',
  'Find Your Strength.'
  ];
  let sloganIndex = 0;
  const sloganElement = document.getElementById('bannerSlogan');
  if (sloganElement) {
    setInterval(() => {
      sloganIndex = (sloganIndex + 1) % slogans.length;
      sloganElement.textContent = slogans[sloganIndex];
    }, 4000);
  }
});

/* ===== ADDITIONAL INTERACTIVE FUNCTIONS ===== */

/**
 * Smooth scroll to specific section with offset for fixed navbar
 * Interactive function #4: Enhanced navigation experience
 */
function smoothScrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  
  const offset = document.querySelector('.navbar').offsetHeight + 20;
  const sectionTop = section.offsetTop - offset;
  
  window.scrollTo({
    top: sectionTop,
    behavior: 'smooth'
  });
}

// Initialize smooth scroll for all internal navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      // Skip non-section links
      if (href === '#') return;
      
      e.preventDefault();
      const sectionId = href.substring(1);
      smoothScrollToSection(sectionId);
    });
  });
});

/**
 * Detect when elements come into view and trigger animations
 * Interactive function #5: Visibility detection for progressive loading
 */
function observeElementsOnScroll() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Optional: unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all section elements
  document.querySelectorAll('section, .video-container').forEach(el => {
    observer.observe(el);
  });
}

// Initialize intersection observer
document.addEventListener('DOMContentLoaded', observeElementsOnScroll);

/**
 * Enhance form interactions with visual feedback
 * Interactive function #6: Form validation and feedback
 */
function initializeFormEnhancements() {
  const allForms = document.querySelectorAll('form');
  
  allForms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      // Add focus effects
      input.addEventListener('focus', function() {
        this.classList.add('focused');
        playSound('hoverSound');
      });
      
      input.addEventListener('blur', function() {
        this.classList.remove('focused');
      });
      
      // Pre-validation on change
      input.addEventListener('change', function() {
        if (this.value.trim() !== '') {
          this.classList.add('filled');
        } else {
          this.classList.remove('filled');
        }
      });
    });
    
    // Form submit with animation
    form.addEventListener('submit', function(e) {
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('submitting');
        setTimeout(() => {
          submitBtn.classList.remove('submitting');
        }, 500);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initializeFormEnhancements);

/**
 * Keyboard navigation support
 * Interactive function #7: Accessibility enhancement
 */
document.addEventListener('keydown', function(e) {
  // Close sidenav with Escape key
  if (e.key === 'Escape') {
    const sidenav = document.getElementById('mySidenav');
    if (sidenav && sidenav.style.width === '250px') {
      toggleNav();
    }
  }
  
  // Quick navigation with Alt + number keys
  if (e.altKey) {
    switch(e.key) {
      case '1': smoothScrollToSection('home'); break;
      case '2': smoothScrollToSection('about-us'); break;
      case '3': smoothScrollToSection('pricing'); break;
      case '4': smoothScrollToSection('contact'); break;
      case '5': smoothScrollToSection('gallery'); break;
    }
  }
});

