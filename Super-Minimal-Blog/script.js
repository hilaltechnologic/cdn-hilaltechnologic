/* ===================================
   Super Minimal Blog - JavaScript Functions
   Author: Hilal Technologic
   Version: 1.0
   Description: Interactive features for BaseTemplate Builder
=================================== */

(function() {
  'use strict';

  // Global variables
  let isMenuOpen = false;
  let currentTheme = 'light';
  let scrollProgress = 0;

  // DOM Elements
  const elements = {
    body: document.body,
    header: null,
    mobileMenuToggle: null,
    navMenu: null,
    themeToggle: null,
    themeIcon: null,
    backToTop: null,
    progressBar: null,
    searchForm: null,
    searchInput: null
  };

  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeTheme();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeAnimations();
    initializeSearch();
    initializeLazyLoading();
    initializeReadingProgress();
    initializeBackToTop();
    
    // Set current year in footer
    updateCurrentYear();
    
    console.log('BaseTemplate Builder initialized successfully!');
  });

  // Initialize DOM elements
  function initializeElements() {
    elements.header = document.querySelector('.header');
    elements.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    elements.navMenu = document.querySelector('.nav-menu');
    elements.themeToggle = document.querySelector('.theme-toggle');
    elements.themeIcon = document.querySelector('#themeIcon');
    elements.backToTop = document.querySelector('.back-to-top');
    elements.progressBar = document.querySelector('.reading-progress');
    elements.searchForm = document.querySelector('.search-form');
    elements.searchInput = document.querySelector('.search-input');
  }

  // Theme Management
  function initializeTheme() {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    currentTheme = savedTheme;
    
    if (savedTheme === 'dark') {
      elements.body.setAttribute('data-theme', 'dark');
      if (elements.themeIcon) {
        elements.themeIcon.textContent = '☀️';
      }
    }

    // Add theme toggle event listener
    if (elements.themeToggle) {
      elements.themeToggle.addEventListener('click', toggleTheme);
    }
  }

  function toggleTheme() {
    if (currentTheme === 'dark') {
      // Switch to light mode
      elements.body.removeAttribute('data-theme');
      if (elements.themeIcon) {
        elements.themeIcon.textContent = '🌙';
      }
      currentTheme = 'light';
      localStorage.setItem('theme', 'light');
    } else {
      // Switch to dark mode
      elements.body.setAttribute('data-theme', 'dark');
      if (elements.themeIcon) {
        elements.themeIcon.textContent = '☀️';
      }
      currentTheme = 'dark';
      localStorage.setItem('theme', 'dark');
    }

    // Trigger theme change event
    document.dispatchEvent(new CustomEvent('themeChanged', {
      detail: { theme: currentTheme }
    }));
  }

  // Mobile Menu Management
  function initializeMobileMenu() {
    if (elements.mobileMenuToggle && elements.navMenu) {
      elements.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
      
      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (isMenuOpen && !elements.navMenu.contains(e.target) && !elements.mobileMenuToggle.contains(e.target)) {
          closeMobileMenu();
        }
      });

      // Close menu on escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
          closeMobileMenu();
        }
      });
    }
  }

  function toggleMobileMenu() {
    if (isMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    if (elements.navMenu) {
      elements.navMenu.classList.add('active');
      elements.navMenu.style.animation = 'slideIn 0.3s ease-out';
      isMenuOpen = true;
      
      // Update toggle button
      if (elements.mobileMenuToggle) {
        elements.mobileMenuToggle.innerHTML = '✕';
        elements.mobileMenuToggle.setAttribute('aria-expanded', 'true');
      }
    }
  }

  function closeMobileMenu() {
    if (elements.navMenu) {
      elements.navMenu.classList.remove('active');
      isMenuOpen = false;
      
      // Update toggle button
      if (elements.mobileMenuToggle) {
        elements.mobileMenuToggle.innerHTML = '☰';
        elements.mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  }

  // Scroll Effects
  function initializeScrollEffects() {
    let ticking = false;

    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Header background opacity on scroll
    if (elements.header) {
      if (scrollTop > 50) {
        elements.header.classList.add('scrolled');
      } else {
        elements.header.classList.remove('scrolled');
      }
    }

    // Update reading progress
    updateReadingProgress();
    
    // Show/hide back to top button
    updateBackToTop(scrollTop);
  }

  // Reading Progress Bar
  function initializeReadingProgress() {
    // Create progress bar if it doesn't exist
    if (!elements.progressBar) {
      const progressBar = document.createElement('div');
      progressBar.className = 'reading-progress';
      progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
      document.body.appendChild(progressBar);
      elements.progressBar = progressBar;
    }
  }

  function updateReadingProgress() {
    if (!elements.progressBar) return;

    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const progressFill = elements.progressBar.querySelector('.reading-progress-fill');
    if (progressFill) {
      progressFill.style.width = scrolled + '%';
    }
    
    scrollProgress = scrolled;
  }

  // Back to Top Button
  function initializeBackToTop() {
    // Create back to top button if it doesn't exist
    if (!elements.backToTop) {
      const backToTop = document.createElement('button');
      backToTop.className = 'back-to-top';
      backToTop.innerHTML = '↑';
      backToTop.setAttribute('aria-label', 'Kembali ke atas');
      backToTop.addEventListener('click', scrollToTop);
      document.body.appendChild(backToTop);
      elements.backToTop = backToTop;
    }
  }

  function updateBackToTop(scrollTop) {
    if (!elements.backToTop) return;

    if (scrollTop > 300) {
      elements.backToTop.classList.add('visible');
    } else {
      elements.backToTop.classList.remove('visible');
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Animations
  function initializeAnimations() {
    // Intersection Observer for fade-in animations
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // Observe elements that should animate
      const animateElements = document.querySelectorAll('.post-card, .widget, .post');
      animateElements.forEach(function(el) {
        observer.observe(el);
      });
    }
  }

  // Search Functionality
  function initializeSearch() {
    if (elements.searchForm && elements.searchInput) {
      elements.searchForm.addEventListener('submit', handleSearch);
      
      // Real-time search suggestions (if needed)
      elements.searchInput.addEventListener('input', debounce(handleSearchInput, 300));
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    const query = elements.searchInput.value.trim();
    
    if (query.length < 2) {
      showSearchMessage('Masukkan minimal 2 karakter untuk pencarian.');
      return;
    }

    // Redirect to Blogger search
    const searchUrl = `/search?q=${encodeURIComponent(query)}`;
    window.location.href = searchUrl;
  }

  function handleSearchInput(e) {
    const query = e.target.value.trim();
    
    if (query.length >= 2) {
      // Here you could implement search suggestions
      console.log('Searching for:', query);
    }
  }

  function showSearchMessage(message) {
    // Create or update search message
    let messageEl = document.querySelector('.search-message');
    if (!messageEl) {
      messageEl = document.createElement('div');
      messageEl.className = 'search-message';
      elements.searchForm.appendChild(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.style.display = 'block';
    
    setTimeout(function() {
      messageEl.style.display = 'none';
    }, 3000);
  }

  // Lazy Loading for Images
  function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              img.classList.remove('lazy');
              img.classList.add('loaded');
            }
            
            imageObserver.unobserve(img);
          }
        });
      });

      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(function(img) {
        img.classList.add('lazy');
        imageObserver.observe(img);
      });
    }
  }

  // Utility Functions
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = function() {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function updateCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year, #currentYear');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(function(el) {
      el.textContent = currentYear;
    });
  }

  // Print Styles Handler
  function initializePrintStyles() {
    window.addEventListener('beforeprint', function() {
      // Hide unnecessary elements when printing
      const hideOnPrint = document.querySelectorAll('.nav, .sidebar, .back-to-top, .reading-progress');
      hideOnPrint.forEach(function(el) {
        el.style.display = 'none';
      });
    });

    window.addEventListener('afterprint', function() {
      // Restore elements after printing
      const hideOnPrint = document.querySelectorAll('.nav, .sidebar, .back-to-top, .reading-progress');
      hideOnPrint.forEach(function(el) {
        el.style.display = '';
      });
    });
  }

  // Social Media Share Functions
  function shareOnFacebook(url, title) {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    openShareWindow(shareUrl);
  }

  function shareOnTwitter(url, title) {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    openShareWindow(shareUrl);
  }

  function shareOnWhatsApp(url, title) {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
    openShareWindow(shareUrl);
  }

  function openShareWindow(url) {
    window.open(url, 'share', 'width=600,height=400,scrollbars=yes,resizable=yes');
  }

  // Performance Monitoring
  function initializePerformanceMonitoring() {
    // Log page load time
    window.addEventListener('load', function() {
      const loadTime = performance.now();
      console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    });
  }

  // Error Handling
  window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
  });

  // Expose public functions to global scope
  window.BaseTemplate = {
    toggleTheme: toggleTheme,
    toggleMobileMenu: toggleMobileMenu,
    scrollToTop: scrollToTop,
    shareOnFacebook: shareOnFacebook,
    shareOnTwitter: shareOnTwitter,
    shareOnWhatsApp: shareOnWhatsApp
  };

  // Initialize performance monitoring
  initializePerformanceMonitoring();
  initializePrintStyles();

})();

// Additional CSS for JavaScript-dependent features
const additionalStyles = `
<style>
/* Reading Progress Bar */
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--bg-tertiary);
  z-index: 9999;
}

.reading-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  width: 0%;
  transition: width 0.1s ease;
}

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.25rem;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: var(--shadow-lg);
}

.back-to-top:hover {
  background-color: var(--accent-color);
  transform: translateY(-2px);
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
}

/* Header Scrolled State */
.header.scrolled {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
}

[data-theme="dark"] .header.scrolled {
  background-color: rgba(15, 23, 42, 0.95);
}

/* Lazy Loading Images */
img.lazy {
  opacity: 0;
  transition: opacity 0.3s ease;
}

img.loaded {
  opacity: 1;
}

/* Search Message */
.search-message {
  display: none;
  padding: 0.5rem;
  margin-top: 0.5rem;
  background-color: var(--warning-color);
  color: white;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
}

/* Mobile Menu Animation */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Print Styles */
@media print {
  .nav,
  .sidebar,
  .back-to-top,
  .reading-progress,
  .mobile-menu-toggle,
  .theme-toggle {
    display: none !important;
  }
  
  .post,
  .post-card {
    box-shadow: none !important;
    border: 1px solid #ddd !important;
    break-inside: avoid;
  }
  
  .container {
    max-width: none !important;
    padding: 0 !important;
  }
}

/* Accessibility Improvements */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus Styles */
button:focus,
a:focus,
input:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  :root {
    --border-light: #000000;
    --border-medium: #000000;
    --text-muted: #000000;
  }
  
  [data-theme="dark"] {
    --border-light: #ffffff;
    --border-medium: #ffffff;
    --text-muted: #ffffff;
  }
}
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);
