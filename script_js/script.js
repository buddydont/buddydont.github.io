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

/* ===== THEME SYSTEM ===== */
let isDarkTheme = localStorage.getItem('theme') === 'dark';

/**
 * Toggle light/dark theme
 * Stores preference in localStorage
 */
function toggleTheme(event) {
  event.preventDefault();
  isDarkTheme = !isDarkTheme;
  localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  const btn = document.getElementById('themeToggleBtn');
  const icon = btn ? btn.querySelector('.icon') : null;
  if (isDarkTheme) {
    document.body.classList.add('dark-theme');
    if (icon) icon.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-theme');
    if (icon) icon.textContent = '🌙';
  }
}

// Initialize theme on page load
window.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('themeToggleBtn');
  const icon = btn ? btn.querySelector('.icon') : null;
  if (isDarkTheme) {
    document.body.classList.add('dark-theme');
    if (icon) icon.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-theme');
    if (icon) icon.textContent = '🌙';
  }
});

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
  const icon = btn ? btn.querySelector('.icon') : null;
  btn.classList.toggle('muted');
  if (icon) {
    icon.textContent = soundEnabled ? '🔊' : '🔇';
  }
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
  const icon = btn ? btn.querySelector('.icon') : null;
  if (!soundEnabled && btn) {
    btn.classList.add('muted');
    if (icon) icon.textContent = '🔇';
  }
});

// Add click sounds to interactive elements
document.addEventListener('DOMContentLoaded', function() {
  const clickableElements = document.querySelectorAll('a, button, .programme-card, .pricing-card');
  clickableElements.forEach(el => {
    el.addEventListener('click', function(e) {
      if (!e.target.classList.contains('hamburger') && !e.target.classList.contains('control-btn') && !e.target.closest('.control-btn')) {
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

/* ===== IMAGE MODAL SYSTEM ===== */

let currentImageIndex = 0;
let currentImageArray = [];

/**
 * Initialize image modal system - creates modal HTML if not present
 */
function initializeImageModal() {
  // Check if modal already exists
  if (document.getElementById('imageModal')) return;
  
  // Create modal HTML structure
  const modalHTML = `
    <div id="imageModal" class="image-modal">
      <div class="modal-content">
        <button class="modal-close" onclick="closeImageModal()">&times;</button>
        <img id="modalImage" class="modal-image" src="" alt="Image">
        <div class="modal-controls">
          <button class="modal-button" onclick="previousImage()" id="prevBtn" title="Previous image (← Arrow)">← Prev</button>
          <div class="modal-counter" id="imageCounter"></div>
          <button class="modal-button" onclick="nextImage()" id="nextBtn" title="Next image (→ Arrow)">Next →</button>
        </div>
        <div class="modal-hint">Use arrow keys to navigate or Esc to close</div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Add keyboard navigation for modal
  document.addEventListener('keydown', handleModalKeyboard);
  
  // Add touch support for mobile
  const modal = document.getElementById('imageModal');
  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
}

/**
 * Handle keyboard navigation in modal
 */
function handleModalKeyboard(e) {
  const modal = document.getElementById('imageModal');
  if (!modal || !modal.classList.contains('active')) return;
  
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    previousImage();
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    nextImage();
  } else if (e.key === 'Escape') {
    e.preventDefault();
    closeImageModal();
  }
}

/**
 * Open image modal with image array
 * @param {Array} imageArray - Array of image paths
 * @param {number} startIndex - Starting image index
 */
function openImageModal(imageArray, startIndex = 0) {
  if (!imageArray || imageArray.length === 0) return;
  
  currentImageArray = imageArray;
  currentImageIndex = startIndex;
  
  const modal = document.getElementById('imageModal') || 
                (initializeImageModal(), document.getElementById('imageModal'));
  
  modal.classList.add('active');
  displayImage();
  playSound('clickSound');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

/**
 * Close image modal
 */
function closeImageModal() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.classList.remove('active');
    playSound('clickSound');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  }
}

/**
 * Display current image and update controls
 */
function displayImage() {
  if (currentImageArray.length === 0) return;
  
  const modalImage = document.getElementById('modalImage');
  const imageCounter = document.getElementById('imageCounter');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  // Update image
  modalImage.src = currentImageArray[currentImageIndex];
  
  // Update counter
  imageCounter.textContent = `${currentImageIndex + 1} / ${currentImageArray.length}`;
  
  // Update button states
  prevBtn.disabled = currentImageIndex === 0;
  nextBtn.disabled = currentImageIndex === currentImageArray.length - 1;
}

/**
 * Navigate to next image
 */
function nextImage() {
  if (currentImageIndex < currentImageArray.length - 1) {
    currentImageIndex++;
    displayImage();
    playSound('clickSound');
  }
}

/**
 * Navigate to previous image
 */
function previousImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    displayImage();
    playSound('clickSound');
  }
}

/**
 * Handle swipe gestures for mobile gallery
 */
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swiped left - go to next image
      nextImage();
    } else {
      // Swiped right - go to previous image
      previousImage();
    }
  }
}

/**
 * Make images clickable to open modal
 * Usage: Call this function on programme pages with image arrays
 */
function setupImageClickListeners(imageArray) {
  const sectionImages = document.querySelectorAll('.programme-image, .gallery-item img');
  
  sectionImages.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
      openImageModal(imageArray, 0);
    });
  });
}

/**
 * Create image array from folder using naming pattern
 * @param {string} basePath - Base path to image folder (e.g., '../../images/sparring/')
 * @param {string} namePattern - Pattern of filenames (e.g., 'sparring')
 * @param {number} count - Number of images
 * @returns {Array} Array of image paths
 */
function createImageArray(basePath, namePattern, count) {
  const images = [];
  // Add main image first
  images.push(basePath + namePattern + '.jfif');
  
  // Add numbered variants
  for (let i = 1; i <= count; i++) {
    images.push(basePath + namePattern + ' (' + i + ').jfif');
  }
  
  return images;
}

// Initialize modal on page load
document.addEventListener('DOMContentLoaded', initializeImageModal);

// Close modal when clicking outside the content
document.addEventListener('click', function(e) {
  const modal = document.getElementById('imageModal');
  if (modal && e.target === modal) {
    closeImageModal();
  }
});

